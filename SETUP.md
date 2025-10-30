# Education Playground Setup Guide

Complete installation instructions for getting started with Education Playground.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [Method 1: Using Virtual Environment (Recommended)](#method-1-using-virtual-environment-recommended)
  - [Method 2: Using Conda](#method-2-using-conda)
  - [Method 3: Using Docker](#method-3-using-docker)
- [Verification](#verification)
- [IDE Setup](#ide-setup)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required
- **Python 3.10 or higher** ([Download](https://www.python.org/downloads/))
- **Git** ([Download](https://git-scm.com/downloads))
- **4GB+ RAM** (8GB+ recommended for deep learning)
- **5GB+ free disk space**

### Optional but Recommended
- **VS Code** with Jupyter extension ([Download](https://code.visualstudio.com/))
- **GPU** for deep learning lessons (NVIDIA with CUDA support)

---

## Installation Methods

### Method 1: Using Virtual Environment (Recommended)

Best for most users. Keeps dependencies isolated from system Python.

#### Step 1: Clone the Repository

```bash
git clone https://github.com/mykolas-perevicius/Education_Playground.git
cd Education_Playground
```

#### Step 2: Create Virtual Environment

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```cmd
python -m venv venv
venv\Scripts\activate
```

You should see `(venv)` in your terminal prompt.

#### Step 3: Install Dependencies

```bash
# Upgrade pip first
pip install --upgrade pip

# Install all requirements
pip install -r requirements.txt
```

**For minimal installation** (just basics, ~500MB):
```bash
pip install jupyter numpy pandas matplotlib scikit-learn
```

**For full installation** (includes deep learning, ~3GB):
```bash
pip install -r requirements.txt
```

#### Step 4: Download NLTK Data (for NLP lessons)

```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"
```

#### Step 5: Start Jupyter

```bash
jupyter notebook
# Or use JupyterLab for a modern interface
jupyter lab
```

Your browser will open to `http://localhost:8888`

---

### Method 2: Using Conda

Great if you already use Anaconda/Miniconda.

#### Step 1: Clone Repository

```bash
git clone https://github.com/mykolas-perevicius/Education_Playground.git
cd Education_Playground
```

#### Step 2: Create Conda Environment

```bash
conda create -n education-playground python=3.11
conda activate education-playground
```

#### Step 3: Install Dependencies

```bash
# Install most packages via conda (faster, pre-compiled)
conda install jupyter numpy pandas matplotlib scikit-learn

# Install remaining via pip
pip install -r requirements.txt
```

#### Step 4: Start Jupyter

```bash
jupyter notebook
```

---

### Method 3: Using Docker

For advanced users who want a containerized environment.

#### Step 1: Create Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Download NLTK data
RUN python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"

# Copy project files
COPY . .

EXPOSE 8888

CMD ["jupyter", "notebook", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root"]
```

#### Step 2: Build and Run

```bash
docker build -t education-playground .
docker run -p 8888:8888 -v $(pwd):/app education-playground
```

---

## Verification

Test your installation by running this in Python or a Jupyter cell:

```python
# Test imports
import sys
print(f"Python version: {sys.version}")

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sklearn
import tensorflow as tf

print(f"NumPy: {np.__version__}")
print(f"Pandas: {pd.__version__}")
print(f"Scikit-learn: {sklearn.__version__}")
print(f"TensorFlow: {tf.__version__}")

print("\n✓ All core packages installed successfully!")
```

### Run the Calibration Test

```bash
jupyter notebook 00_calibration_test.ipynb
```

This will help you determine which level to start with.

---

## IDE Setup

### VS Code (Recommended)

1. Install the **Jupyter extension** from Microsoft
2. Open the Education_Playground folder: `File > Open Folder`
3. Select Python interpreter:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Python: Select Interpreter"
   - Choose your `venv` or `conda` environment
4. Open any `.ipynb` file and start coding!

**Recommended VS Code Extensions:**
- Python (Microsoft)
- Jupyter (Microsoft)
- Pylance (Microsoft)
- Black Formatter
- Ruff

### JupyterLab

For a browser-based IDE with advanced features:

```bash
pip install jupyterlab
jupyter lab
```

Benefits:
- Multi-tab interface
- Built-in terminal
- File browser
- Extension ecosystem

### PyCharm

1. Open Education_Playground as a project
2. Configure Python interpreter: `File > Settings > Project > Python Interpreter`
3. Install Jupyter support: `Settings > Plugins > Jupyter`
4. Open `.ipynb` files directly in PyCharm

---

## Troubleshooting

### Issue: `jupyter: command not found`

**Solution:** Your virtual environment isn't activated or Jupyter isn't installed.

```bash
# Reactivate virtual environment
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Reinstall Jupyter
pip install jupyter
```

### Issue: TensorFlow installation fails

**Solution:** TensorFlow has specific requirements.

**On Apple Silicon (M1/M2/M3 Macs):**
```bash
pip install tensorflow-macos
pip install tensorflow-metal  # For GPU acceleration
```

**On Windows with GPU:**
```bash
pip install tensorflow[and-cuda]
```

**CPU-only (any platform):**
```bash
pip install tensorflow-cpu
```

### Issue: NLTK data not found

**Solution:** Download required NLTK datasets:

```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
```

### Issue: Kernel keeps dying

**Possible causes:**
- Insufficient RAM (need 4GB+, 8GB+ for deep learning)
- Memory leak in code
- Outdated packages

**Solutions:**
```bash
# Update packages
pip install --upgrade jupyter ipykernel

# Restart kernel: Kernel > Restart in Jupyter

# Clear outputs before running: Cell > All Output > Clear
```

### Issue: Import errors after installation

**Solution:** Wrong Python interpreter selected.

```bash
# Check which Python you're using
which python   # macOS/Linux
where python   # Windows

# Should point to your venv/conda environment
# If not, reactivate your environment
```

### Issue: Slow pip installation

**Solution:** Use pip's cache and parallel downloads:

```bash
pip install -r requirements.txt --cache-dir ~/.cache/pip
```

Or switch to conda for faster binary installs:
```bash
conda install --file requirements.txt
```

---

## Platform-Specific Notes

### macOS
- Use `python3` instead of `python` if you have system Python 2.x
- May need Xcode Command Line Tools: `xcode-select --install`
- For M1/M2/M3 chips, some packages have ARM-specific versions

### Windows
- Enable long path support (for deep learning models): Run as Administrator
  ```cmd
  reg add HKLM\SYSTEM\CurrentControlSet\Control\FileSystem /v LongPathsEnabled /t REG_DWORD /d 1
  ```
- Use PowerShell or Windows Terminal (better than CMD)
- If permission errors, run terminal as Administrator

### Linux
- May need build tools: `sudo apt-get install python3-dev build-essential`
- For GPU support: Install CUDA toolkit and cuDNN
- Check Python version: Many distros ship with older versions

---

## Next Steps

1. **Take the calibration test**: `00_calibration_test.ipynb`
2. **Navigate to your level**: `easy/`, `medium/`, or `hard/`
3. **Read the README**: Comprehensive course overview
4. **Check out resources**: `RESOURCES.md` for external learning materials
5. **Review cheatsheets**: Quick references as you learn

---

## Getting Help

- **Issues with setup**: Open an issue on GitHub
- **Package-specific problems**: Check official documentation
  - [Jupyter](https://jupyter.org/documentation)
  - [NumPy](https://numpy.org/doc/)
  - [TensorFlow](https://www.tensorflow.org/)
  - [PyTorch](https://pytorch.org/docs/)

---

## Optional: GPU Setup for Deep Learning

### NVIDIA GPU (CUDA)

**Check GPU availability:**
```python
import tensorflow as tf
print(f"GPUs available: {tf.config.list_physical_devices('GPU')}")

import torch
print(f"CUDA available: {torch.cuda.is_available()}")
```

**Install CUDA support:**

1. Install [NVIDIA CUDA Toolkit](https://developer.nvidia.com/cuda-downloads)
2. Install [cuDNN](https://developer.nvidia.com/cudnn)
3. Install GPU-enabled versions:

```bash
# TensorFlow with GPU
pip install tensorflow[and-cuda]

# PyTorch with GPU (check https://pytorch.org for your CUDA version)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

### Apple Silicon (M1/M2/M3)

```bash
pip install tensorflow-macos tensorflow-metal
# PyTorch automatically supports MPS (Metal Performance Shaders)
```

---

**Happy Learning!** You're all set to start your programming journey. 🚀
