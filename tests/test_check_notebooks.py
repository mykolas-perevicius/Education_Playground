import json
import logging
import os
import subprocess
import sys
from pathlib import Path

import nbformat
import pytest

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from tools import check_notebooks as cn


def make_notebook(path: Path, code_cells: list[str]) -> None:
    nb = nbformat.v4.new_notebook()
    nb.cells = [nbformat.v4.new_code_cell(source=src) for src in code_cells]
    path.write_text(nbformat.writes(nb))


def test_collect_imports_and_check_modules(tmp_path, caplog):
    nb_path = tmp_path / "imports.ipynb"
    nb = nbformat.v4.new_notebook()
    nb.cells = [
        nbformat.v4.new_markdown_cell("This is a markdown cell"),
        nbformat.v4.new_code_cell(
            "import json\nfrom collections import defaultdict\nimport no_such_module"
        ),
        nbformat.v4.new_code_cell("invalid python here >>>"),
    ]
    nb_path.write_text(nbformat.writes(nb))

    modules = cn.collect_imports(nb_path)
    assert {"json", "collections", "no_such_module"} <= modules

    caplog.set_level(logging.INFO)
    results = cn.check_modules(modules)

    assert any(name == "json" and ok for name, ok, _ in results)
    assert any(name == "no_such_module" and not ok for name, ok, _ in results)


def test_execute_notebook_success(tmp_path, monkeypatch):
    workdir = tmp_path / "work"
    workdir.mkdir()
    nb_path = workdir / "run.ipynb"
    make_notebook(
        nb_path,
        [
            "total = sum(range(5))\nassert total == 10",
        ],
    )

    executed_payload = json.dumps(
        {"cells": [], "metadata": {}, "nbformat": 4, "nbformat_minor": 5}
    )

    def fake_run(cmd, timeout, check, capture_output, text):
        assert "--execute" in cmd
        output_name = cmd[cmd.index("--output") + 1]
        output_dir = Path(cmd[cmd.index("--output-dir") + 1])
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)
        (output_dir / output_name).write_text(executed_payload)

        class Result:
            returncode = 0
            stdout = "ok"
            stderr = ""

        return Result()

    monkeypatch.setattr(subprocess, "run", fake_run)

    original_cwd = os.getcwd()
    try:
        os.chdir(workdir)
        rc = cn.execute_notebook(nb_path, timeout=180)
    finally:
        os.chdir(original_cwd)

    assert rc == 0
    executed = workdir / ".nbexec-cache" / "run__executed.ipynb"
    assert executed.exists()


def test_execute_notebook_timeout(monkeypatch, tmp_path):
    nb_path = tmp_path / "dummy.ipynb"
    nb_path.write_text(json.dumps({"cells": []}))

    def fake_run(*_, **__):
        raise subprocess.TimeoutExpired(cmd=["nbconvert"], timeout=1)

    monkeypatch.setattr(subprocess, "run", fake_run)

    with pytest.raises(subprocess.TimeoutExpired):
        cn.execute_notebook(nb_path, timeout=1)


def test_execute_notebook_logs_stdout_stderr(monkeypatch, tmp_path, caplog):
    nb_path = tmp_path / "dummy.ipynb"
    nb_path.write_text(json.dumps({"cells": []}))

    class FakeResult:
        returncode = 5
        stdout = "fake-stdout"
        stderr = "fake-stderr"

    def fake_run(*_, **__):
        return FakeResult()

    caplog.set_level(logging.DEBUG)
    monkeypatch.setattr(subprocess, "run", fake_run)

    rc = cn.execute_notebook(nb_path, timeout=10)
    assert rc == 5
    assert "fake-stdout" in caplog.text
    assert "fake-stderr" in caplog.text


def test_main_missing_notebook(monkeypatch, caplog):
    caplog.set_level(logging.INFO)
    monkeypatch.setattr(
        sys, "argv", ["check_notebooks", "nonexistent.ipynb", "--log-level", "DEBUG"]
    )
    exit_code = cn.main()
    assert exit_code == 1
    assert "not found" in caplog.text


def test_main_skips_missing_dependency(monkeypatch, tmp_path, caplog):
    nb_path = tmp_path / "missing.ipynb"
    make_notebook(nb_path, ["import no_such_module"])

    caplog.set_level(logging.INFO)
    monkeypatch.setattr(
        sys,
        "argv",
        [
            "check_notebooks",
            str(nb_path),
            "--log-level",
            "INFO",
        ],
    )

    exit_code = cn.main()
    assert exit_code == 1
    assert "Skipping execution" in caplog.text


def test_main_runs_with_optional(monkeypatch, tmp_path, caplog):
    nb_path = tmp_path / "optional.ipynb"
    make_notebook(
        nb_path,
        [
            "import json\n"
            "try:\n"
            "    import optional_mod\n"
            "except ImportError:\n"
            "    optional_mod = None\n"
            "assert json.loads('{\"a\": 1}')['a'] == 1\n",
        ],
    )

    executed_payload = json.dumps(
        {"cells": [], "metadata": {}, "nbformat": 4, "nbformat_minor": 5}
    )

    def fake_run(cmd, timeout, check, capture_output, text):
        output_name = cmd[cmd.index("--output") + 1]
        output_dir = Path(cmd[cmd.index("--output-dir") + 1])
        output_dir.mkdir(parents=True, exist_ok=True)
        (output_dir / output_name).write_text(executed_payload)

        class Result:
            returncode = 0
            stdout = "done"
            stderr = ""

        return Result()

    monkeypatch.setattr(subprocess, "run", fake_run)

    caplog.set_level(logging.INFO)
    monkeypatch.setattr(
        sys,
        "argv",
        [
            "check_notebooks",
            str(nb_path),
            "--optional",
            "optional_mod",
            "--execute",
            "--timeout",
            "180",
            "--log-level",
            "INFO",
        ],
    )

    exit_code = cn.main()
    assert exit_code == 0
    assert "Execution succeeded" in caplog.text


def test_main_no_imports(monkeypatch, tmp_path, caplog):
    nb_path = tmp_path / "empty.ipynb"
    nb_path.write_text(nbformat.writes(nbformat.v4.new_notebook()))

    caplog.set_level(logging.INFO)
    monkeypatch.setattr(
        sys,
        "argv",
        [
            "check_notebooks",
            str(nb_path),
            "--log-level",
            "INFO",
        ],
    )

    exit_code = cn.main()
    assert exit_code == 0
    assert "No imports detected" in caplog.text


def test_main_timeout_path(monkeypatch, tmp_path, caplog):
    nb_path = tmp_path / "timeout.ipynb"
    make_notebook(nb_path, ["print('hi')"])

    def fake_execute(*_, **__):
        raise subprocess.TimeoutExpired(cmd=["nbconvert"], timeout=1)

    monkeypatch.setattr(cn, "execute_notebook", fake_execute)

    caplog.set_level(logging.INFO)
    monkeypatch.setattr(
        sys,
        "argv",
        [
            "check_notebooks",
            str(nb_path),
            "--execute",
            "--log-level",
            "INFO",
        ],
    )

    exit_code = cn.main()
    assert exit_code == 1
    assert "Execution timed out" in caplog.text


def test_main_execution_failure(monkeypatch, tmp_path, caplog):
    nb_path = tmp_path / "failure.ipynb"
    make_notebook(nb_path, ["print('hi')"])

    def fake_execute(*_, **__):
        return 2

    monkeypatch.setattr(cn, "execute_notebook", fake_execute)

    caplog.set_level(logging.INFO)
    monkeypatch.setattr(
        sys,
        "argv",
        [
            "check_notebooks",
            str(nb_path),
            "--execute",
            "--log-level",
            "INFO",
        ],
    )

    exit_code = cn.main()
    assert exit_code == 1
    assert "Execution failed with exit code 2" in caplog.text
