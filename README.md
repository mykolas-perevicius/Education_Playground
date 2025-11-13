# Education Playground

![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Jupyter Book](https://img.shields.io/badge/Jupyter-Book-orange.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Last Updated](https://img.shields.io/github/last-commit/mykolas-perevicius/Education_Playground)
![Version](https://img.shields.io/badge/version-3.0-blue.svg)

> Learn Python, AI, and Computing — From Zero to Hero

A comprehensive, self-paced learning platform covering **Python**, **AI/ML**, **GPU Computing**, and **Computer Science** for all skill levels. **100% free** and runs in your browser!

**🌐 Live Site:** https://mykolas-perevicius.github.io/Education_Playground/

---

## 📋 Project Documentation

**New to this project? Start here:**

- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete overview, architecture, and current status
- **[VERSION_HISTORY.md](VERSION_HISTORY.md)** - Full version history from v1.0 to v3.0
- **[CHANGELOG.md](CHANGELOG.md)** - Detailed changelog with technical implementation details
- **[DESIGN_ITERATIONS.md](DESIGN_ITERATIONS.md)** - Visual design evolution and design system
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and technical decisions
- **[QUICK_START.md](QUICK_START.md)** - Daily operations and deployment guide

---

## 🚀 START LEARNING (30 seconds)

**New here? An interactive guide will help you find your path when you visit the site!**

Or jump straight in:

<div align="center">

### 🌟 **Complete Beginner?**
**[→ Start Lesson 1 (Colab)](https://colab.research.google.com/github/mykolas-perevicius/Education_Playground/blob/main/easy/01_introduction_to_python.ipynb)**
*Opens in your browser • No installation needed • Works on any device*

---

### 💪 **Have Some Experience?**
**[→ Take the 5-Minute Level Finder](00_calibration_test.ipynb)**
*Find your perfect starting point*

---

### 🚀 **Advanced User?**
**[→ Browse All Topics](#course-structure)** | **[→ GPU Computing](hard/11_cuda_and_parallel_computing.ipynb)** | **[→ AI/ML](hard/04_deep_learning_and_neural_networks.ipynb)**

</div>

---

## ✨ Why Education Playground?

- ✅ **No Setup Required** — Start learning in your browser with Google Colab
- ✅ **Complete Curriculum** — 40+ interactive notebooks covering beginner to expert
- ✅ **Self-Paced** — Learn at your own speed with clear progress tracking
- ✅ **Real Projects** — Build actual applications, not just exercises
- ✅ **Free Forever** — Open source and accessible to everyone
- ✅ **Mobile Friendly** — Learn on phone, tablet, or desktop

---

## 🆕 Recent Major Enhancements (2025)

**All notebooks have been significantly expanded with**:
- ✅ **3-6x content expansion** across all difficulty levels
- ✅ **Production-quality code** with detailed explanations
- ✅ **Real-world applications** and use cases
- ✅ **Comprehensive exercises** with difficulty ratings
- ✅ **Self-check quizzes** with detailed explanations
- ✅ **Pro tips, common mistakes**, and debugging guides
- ✅ **NEW: Performance Computing** - Profiling, optimization, Numba, multiprocessing
- ✅ **NEW: CUDA & GPU Computing** - Parallel computing, CuPy, PyTorch GPU, multi-GPU

## Overview

This repository contains a complete curriculum organized into three difficulty levels. Each level includes modules on:
- **Python Programming**: Core language skills
- **AI & Machine Learning**: From basics to deep learning
- **Computing Fundamentals**: How computers work and CS theory

**All lessons within each level can be completed in parallel** - choose your own path based on your interests!

## Getting Started

### Path A: Complete Beginner (Never Coded Before)

**Start here if you've NEVER programmed before!**

1. **Beginner Scripts Track** (`beginner_scripts/`)
   - Simple Python scripts with extensive comments
   - 10 lessons covering absolute basics
   - Each lesson: 15-30 minutes
   - Run with: `python beginner_scripts/1_hello_world.py`
   - **Complete this first!** Then proceed to Path B.

### Path B: Some Programming Experience

1. **Take the Calibration Test**

Start by running the calibration test to determine your skill level:

```bash
jupyter notebook 00_calibration_test.ipynb
```

The test covers:
- Basic syntax and variables
- Control flow and functions
- Data structures
- Object-oriented programming
- Advanced concepts (decorators, generators, algorithms)

Based on your score, you'll be recommended one of three levels:
- **0-30 points**: Easy Level
- **31-60 points**: Medium Level
- **61+ points**: Hard Level

### 2. Choose Your Path

## Course Structure

The curriculum is organized into **difficulty levels** (Beginner Scripts, Easy, Medium, Hard) plus an essential **Developer Tools** track that complements all levels.

---

### 🌱 Beginner Scripts Track (Pre-Easy)

**For absolute beginners who have never programmed before!**

📂 Location: `beginner_scripts/`

**10 Python script lessons** covering the fundamentals:
1. Hello World - Your first program
2. Variables and Types - Storing information
3. String Manipulation - Working with text
4. Basic Math - Numbers and operations
5. Lists and Dictionaries - Organizing data
6. List/Dict Methods - Advanced operations
7. Imports - Using modules
8. Error Handling - Dealing with mistakes
9. Indexing and For Loops - Iteration
10. Conditionals and While Loops - Control flow

**Features:**
- Simple `.py` scripts (no notebooks required)
- Extensive comments explaining every line
- TODO exercises for practice
- Time estimates for each section
- Instructor-friendly format

**Total Time:** 3-5 hours for complete beginners

**After completing:** Progress to Easy Level notebooks or take the Calibration Test!

---

### Core Tracks by Difficulty

Each level contains **three parallel tracks** that can be completed in any order:

---

### Easy Level (Beginner)

**Perfect for those new to programming**. Lessons can be done in any order, though starting with Python basics is recommended.

#### Python Fundamentals Track

1. **Introduction to Python** (`easy/01_introduction_to_python.ipynb`)
   - Hello World and basic output
   - Running Python code
   - Your first programs

2. **Variables and Data Types** (`easy/02_variables_and_data_types.ipynb`)
   - Creating and using variables
   - Strings, integers, floats, and booleans
   - Type checking

3. **Basic Operations and Conditionals** (`easy/03_basic_operations_and_conditionals.ipynb`)
   - Mathematical operations
   - Comparison operators
   - If/else statements

#### AI & ML Introduction Track

4. **Introduction to AI and Machine Learning** (`easy/04_intro_to_ai_and_ml.ipynb`)
   - What is AI and ML?
   - Simple pattern recognition
   - Rule-based AI systems
   - Basic recommendation systems

#### Computing Fundamentals Track

5. **Computing Fundamentals** (`easy/05_computing_fundamentals.ipynb`)
   - How computers store information
   - Binary numbers and data representation
   - ASCII and text encoding
   - Bits, bytes, and storage units

---

### Medium Level (Intermediate)

**For those with basic programming knowledge**. All lessons are standalone and can be completed in any order.

#### Python Advanced Track

1. **Functions and Modules** (`medium/01_functions_and_modules.ipynb`)
   - Defining functions
   - Parameters and return values
   - Importing and using modules
   - Scope and namespaces

2. **Data Structures** (`medium/02_data_structures.ipynb`)
   - Lists and list operations
   - Dictionaries for key-value storage
   - Sets and tuples
   - List comprehensions

3. **Classes and Object-Oriented Programming** (`medium/03_classes_and_oop.ipynb`)
   - Creating classes and objects
   - Instance variables and methods
   - Constructors (`__init__`)
   - Basic inheritance

#### Machine Learning Track

4. **Machine Learning Basics** (`medium/04_machine_learning_basics.ipynb`)
   - Introduction to scikit-learn
   - Supervised vs unsupervised learning
   - Classification and regression
   - Model evaluation and accuracy

5. **Data Analysis with Pandas** (`medium/05_data_analysis_with_pandas.ipynb`)
   - Working with DataFrames
   - Data cleaning and manipulation
   - Grouping and aggregation
   - Basic data visualization

#### Algorithms & Problem Solving Track

6. **Algorithms and Problem Solving** (`medium/06_algorithms_and_problem_solving.ipynb`)
   - Searching algorithms (linear, binary)
   - Sorting algorithms (bubble, selection)
   - Time complexity basics
   - Problem-solving strategies

---

### Hard Level (Advanced)

**Advanced topics for experienced programmers**. Lessons are independent and more demanding - dive deeper into areas that interest you!

#### Advanced Python Track

1. **Advanced Functions and Decorators** (`hard/01_advanced_functions_and_decorators.ipynb`)
   - Higher-order functions and closures
   - Lambda functions and functional programming
   - Creating and using decorators
   - Advanced decorator patterns

2. **Generators and Iterators** (`hard/02_generators_and_iterators.ipynb`)
   - Iterator protocol
   - Generator functions and `yield`
   - Generator expressions
   - Coroutines and data pipelines

3. **Algorithms and Complexity Analysis** (`hard/03_algorithms_and_complexity.ipynb`)
   - Big O notation
   - Sorting algorithms (quicksort, merge sort)
   - Searching algorithms
   - Dynamic programming
   - Data structures (heaps, graphs, trees)

#### Deep Learning & AI Track

4. **Deep Learning and Neural Networks** (`hard/04_deep_learning_and_neural_networks.ipynb`)
   - Neural network architecture
   - Building networks with TensorFlow/Keras
   - Convolutional Neural Networks (CNNs)
   - Transfer learning
   - Advanced optimization techniques

5. **Advanced ML and Natural Language Processing** (`hard/05_advanced_ml_and_nlp.ipynb`)
   - Ensemble learning (Random Forest, XGBoost)
   - Natural Language Processing
   - Text classification and sentiment analysis
   - Word embeddings
   - Hyperparameter tuning

#### Computer Systems Track

6. **Computer Systems and Theory** (`hard/06_computer_systems_and_theory.ipynb`)
   - Computer architecture (Von Neumann, CPU simulators)
   - Memory hierarchy and cache replacement (LRU, LFU, FIFO)
   - Concurrency, parallelism, and synchronization
   - Computational complexity theory (P vs NP, TSP)
   - Automata theory and finite state machines
   - Virtual memory, paging, and TLB

7. **Project Ideas & Implementation Guide** (`hard/07_project_ideas.ipynb`) 📐
   - **10+ Production-Ready Project Blueprints**:
     - Build Your Own Web Framework (WSGI, routing, middleware)
     - Distributed Task Queue (Celery-like system)
     - Image Recognition ML Pipeline (end-to-end)
     - Programming Language Interpreter (lexer, parser, AST)
   - Complete starter code (300-400 lines per project)
   - Architecture diagrams and system design
   - Project planning framework (MVP, testing, deployment)
   - Production best practices checklist

#### High-Performance Computing Track 🚀

8. **Performance Computing** (`hard/10_performance_computing.ipynb`) ⚡ **NEW!**
   - **Profiling & Optimization**: cProfile, line_profiler, finding bottlenecks
   - **Memory Optimization**: Generators, __slots__, memory profiling
   - **NumPy Vectorization**: 10-100x speedups with proper vectorization
   - **Numba JIT Compilation**: C-speed Python with @jit decorator
   - **Multiprocessing & Threading**: Bypass GIL, parallel processing
   - **Async I/O**: asyncio for high-concurrency applications
   - **Cython**: C extensions for maximum performance
   - Real-world optimization case studies

9. **CUDA & GPU Parallel Computing** (`hard/11_cuda_and_parallel_computing.ipynb`) 🎮 **NEW!**
   - **GPU Architecture**: Understanding CUDA programming model
   - **CuPy**: NumPy for GPUs (10-100x faster array operations)
   - **PyTorch GPU**: Deep learning acceleration
   - **Parallel Algorithms**: Map, reduce, scan, stencil patterns
   - **GPU Memory Management**: Optimization techniques
   - **Multi-GPU Programming**: Data parallelism, model parallelism
   - **Real Applications**: Image processing, Monte Carlo, deep learning
   - Performance optimization and profiling

#### Classic Problems & Interview Prep Track 🔥

10. **Classic Problems Collection** (`hard/08_classic_problems.ipynb`) ⭐
   - **LeetCode Classics**: Two Sum, Three Sum, Longest Substring, Merge K Lists, Trapping Rain Water
   - **Dynamic Programming**: Knapsack, Longest Common Subsequence, Edit Distance
   - **Graph Algorithms**: Dijkstra's Shortest Path, Cycle Detection
   - **Cryptography**: Caesar Cipher, Vigenère Cipher, RSA Implementation
   - **ML from Scratch**: K-Nearest Neighbors, Linear Regression, Neural Networks
   - **Interview patterns**: Hash maps, two pointers, sliding window, heap, DP

11. **CTF Challenges - Hacker Training** (`hard/09_ctf_challenges.ipynb`) 🚩
   - **Web Exploitation**: SQL Injection, XSS, security vulnerabilities
   - **Binary Exploitation (Pwn)**: Buffer overflows, format string attacks
   - **Reverse Engineering**: Decompiling, crackmes, understanding binaries
   - **Cryptography**: Breaking encryption, classical and modern ciphers
   - **Forensics**: Steganography, file carving, metadata extraction
   - **OSINT**: Open Source Intelligence, finding hidden information
   - **Misc**: Encoding puzzles, CTF techniques and tools
   - Prepares for: Bug bounties, penetration testing, security careers

**💡 These problems are legendary** - solved by generations of programmers. Master them for:
- FAANG interviews (Google, Facebook, Amazon, Apple, Netflix)
- Competitive programming (Codeforces, TopCoder)
- Cybersecurity careers and CTF competitions
- High-performance computing and GPU acceleration
- Real-world problem-solving skills

**📊 Hard Track Statistics**:
- **11 comprehensive notebooks** (was 9, added 2 NEW!)
- **539KB total content** (was 370KB, +169KB of new material)
- **Average 49KB per notebook** (vs 14KB originally)
- **All notebooks enhanced** to production quality
- **50+ hours of learning material**

---

### Developer Tools Track (The Missing Semester)

**Essential skills for every developer** - Inspired by MIT's "The Missing Semester of Your CS Education". These lessons can be taken at any level!

📂 Location: `tools/`

#### Core Tools

1. **Shell and Command Line** (`tools/01_shell_basics.ipynb`)
   - Terminal fundamentals and navigation
   - File operations and text processing
   - Pipes, redirection, and command chaining
   - Essential for all developers

2. **Shell Scripting** (`tools/02_shell_scripting.ipynb`)
   - Writing bash scripts
   - Automating repetitive tasks
   - Text processing with sed, awk, grep

3. **Version Control with Git** (`tools/03_git_essentials.ipynb`)
   - Git fundamentals and workflows
   - Branching, merging, and collaboration
   - Industry-standard version control

4. **Text Editors** (`tools/04_text_editors.ipynb`)
   - Vim basics and power features
   - VS Code productivity tips
   - Editor customization

5. **Data Wrangling** (`tools/05_data_wrangling.ipynb`)
   - Processing data with Unix tools
   - Regular expressions
   - JSON/CSV manipulation

6. **Debugging and Profiling** (`tools/06_debugging_profiling.ipynb`)
   - Python debugger (pdb)
   - Performance profiling and optimization
   - Static analysis tools

7. **Security Essentials** (`tools/07_security_essentials.ipynb`)
   - SSH and authentication
   - Secrets management
   - Common vulnerabilities

8. **Build Systems and CI/CD** (`tools/08_build_and_automation.ipynb`)
   - Makefiles and automation
   - GitHub Actions and CI/CD
   - Docker basics

9. **Package Management** (`tools/09_package_management.ipynb`)
   - pip, poetry, and virtual environments
   - Dependency management
   - System package managers

10. **Dotfiles and Configuration** (`tools/10_dotfiles.ipynb`)
    - Shell configuration (.bashrc, .zshrc)
    - Tool configuration
    - Dotfile management

**💡 Recommended**: Start with Shell Basics and Git Essentials - you'll use these every day!

See `tools/README.md` for detailed information and learning paths.

---

## Installation

**📖 For detailed setup instructions, see [SETUP.md](SETUP.md)**

### Quick Start

1. **Clone the repository**:
```bash
git clone https://github.com/mykolas-perevicius/Education_Playground.git
cd Education_Playground
```

2. **Install dependencies**:
```bash
# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install all packages
pip install -r requirements.txt
```

3. **Start learning**:
```bash
jupyter notebook
# Then open 00_calibration_test.ipynb
```

**Need help?** Check [SETUP.md](SETUP.md) for:
- Platform-specific instructions (Windows, macOS, Linux)
- Alternative installation methods (Conda, Docker)
- GPU setup for deep learning
- Troubleshooting common issues

## How to Use This Course

1. **Start with the calibration test** to find your level
2. **Choose lessons based on your interests** - within each level, lessons are designed to be completed in parallel
3. **Complete all exercises** in each notebook
4. **Practice regularly** - coding and ML skills improve with practice
5. **Experiment freely** - modify examples and see what happens
6. **Build projects** - combine skills from different tracks
7. **Move to the next level** when you feel comfortable

## Flexible Learning Paths

### Path 1: Python-First Approach
Focus on Python fundamentals before exploring AI and systems

### Path 2: AI-Focused Approach
Start with AI/ML concepts alongside Python basics

### Path 3: Systems-Focused Approach
Learn computing fundamentals and algorithms

### Path 4: Balanced Approach
Rotate between tracks for well-rounded knowledge

**The choice is yours!** All paths lead to comprehensive understanding.

## Features

- **Self-paced learning**: Go at your own speed
- **Interactive exercises**: Learn by doing
- **Real code examples**: See concepts in action
- **Progressive difficulty**: Build skills systematically
- **Parallel learning tracks**: Choose your own adventure
- **Comprehensive coverage**: From basics to cutting-edge topics
- **Practical applications**: Real-world examples throughout

## Learning Tips

- **Run every code cell**: Don't just read - execute and experiment!
- **Modify examples**: Change values and see what happens
- **Complete exercises**: They reinforce what you've learned
- **Take breaks**: Your brain needs time to process new information
- **Mix tracks**: Don't feel locked into one track - explore!
- **Review previous lessons**: Repetition strengthens understanding
- **Build projects**: Combine concepts from multiple lessons
- **Join communities**: Share your progress and learn from others

## What's Included

### Python Programming
- Variables, data types, control flow
- Functions, classes, OOP
- Advanced patterns (decorators, generators)
- Data structures and algorithms
- **Performance optimization and profiling**
- **Memory management and efficiency**

### AI & Machine Learning
- Introduction to AI concepts
- Machine learning with scikit-learn
- Deep learning with TensorFlow/Keras/PyTorch
- Natural Language Processing and transformers
- Model evaluation, optimization, and hyperparameter tuning
- **GPU-accelerated deep learning**
- **End-to-end ML pipelines and MLOps**

### High-Performance & Parallel Computing ⚡ **NEW!**
- **Performance profiling** (cProfile, line_profiler, memory_profiler)
- **Optimization techniques** (vectorization, JIT compilation, caching)
- **NumPy vectorization** for 10-100x speedups
- **Numba** for C-speed Python
- **Multiprocessing** and threading for parallelism
- **Async I/O** with asyncio
- **GPU/CUDA programming** with CuPy and PyTorch
- **Multi-GPU training** and data parallelism
- Parallel algorithm patterns and optimization

### Computing Fundamentals
- Binary and data representation
- Computer architecture and CPU simulators
- Memory hierarchy and cache systems
- Concurrency, parallelism, and synchronization
- Computational complexity (P vs NP)
- Systems programming and virtual memory
- **GPU architecture and CUDA programming**

### Supplementary Materials

📚 **[RESOURCES.md](RESOURCES.md)** - Comprehensive external learning resources
- Curated free courses from top platforms (Coursera, edX, Fast.ai)
- Interactive learning platforms (Futurecoder, LearnPython.org, Kaggle)
- Books, YouTube channels, podcasts, communities
- Learning paths organized by focus area

⚡ **[PYTHON_CHEATSHEET.md](PYTHON_CHEATSHEET.md)** - Quick Python reference
- All core concepts in one place
- Code examples for every feature
- Best practices and common pitfalls
- One-liners and performance tips

🤖 **[ML_AI_CHEATSHEET.md](ML_AI_CHEATSHEET.md)** - ML/AI quick reference
- scikit-learn complete guide
- TensorFlow/Keras essentials
- NLP and text processing
- Model deployment patterns
- Troubleshooting common issues

🚀 **Project Ideas** (in each level folder)
- **Easy**: 10 beginner projects (calculator, games, chatbot)
- **Medium**: 10 intermediate projects (ML apps, data analysis, algorithms)
- **Hard**: 10+ advanced projects (frameworks, compilers, production ML systems)
- All include features, bonuses, and learning goals

## Contributing

Found a typo or have a suggestion? Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have questions or need help:
- Open an issue in this repository
- Check existing issues for solutions
- Review the lesson materials carefully

## Project Statistics

### Content Overview
- **Total Notebooks**: 40+ interactive Jupyter notebooks
- **Total Content**: 2MB+ of educational material
- **Code Examples**: 1,000+ working code samples
- **Exercises**: 200+ hands-on exercises with solutions
- **Quizzes**: 100+ self-check questions
- **Learning Hours**: 200-300 hours of comprehensive material

### Track Breakdown
| Track | Notebooks | Size | Key Topics |
|-------|-----------|------|------------|
| **Beginner Scripts** | 10 | 50KB | Python fundamentals |
| **Easy Level** | 5 | 200KB | Intro to programming & AI |
| **Medium Level** | 6 | 260KB | Intermediate Python & ML |
| **Hard Level** | 11 | 539KB | Advanced topics + GPU computing |
| **Developer Tools** | 10 | 350KB | Professional dev skills |

### Recent Enhancements (2025)
- ✅ **Hard notebooks 01-07**: Expanded from 14KB to 54KB average (3.8x growth)
- ✅ **Notebook 04 (Deep Learning)**: 13KB → 56K (4.3x expansion)
- ✅ **Notebook 05 (ML/NLP)**: 14KB → 48KB (3.4x expansion)
- ✅ **Notebook 06 (Systems)**: 19KB → 55KB (2.9x expansion)
- ✅ **Notebook 07 (Projects)**: 15KB → 87KB (5.8x expansion!)
- ✅ **NEW Notebook 10**: Performance Computing (40KB)
- ✅ **NEW Notebook 11**: CUDA & GPU Programming (38KB)
- **Total enhancement**: +200KB of production-quality content

### Quality Improvements
- **Before**: Basic examples, minimal exercises
- **After**: Production code, comprehensive exercises, quizzes, pro tips
- **Code Quality**: Professional-grade with detailed comments
- **Real-World Focus**: Industry-applicable examples
- **Testing**: All code validated and tested

## 💬 Need Help?

**Stuck on something? You're not alone!**

### 💭 Communities
- **[Python Discord](https://pythondiscord.com/)** — Live help from 350,000+ Python developers
- **[r/learnpython](https://reddit.com/r/learnpython)** — Beginner-friendly Python community
- **[r/learnmachinelearning](https://reddit.com/r/learnmachinelearning)** — ML/AI support
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/python)** — Q&A for specific problems

### 🐛 Report Issues
- **[GitHub Issues](https://github.com/mykolas-perevicius/Education_Playground/issues)** — Found a bug or have a suggestion?

---

## 📚 Additional Learning Resources

Want to supplement your learning? Check out these excellent resources:

### Python Fundamentals
- **[Python.org Official Tutorial](https://docs.python.org/3/tutorial/)** — The definitive Python guide
- **[Real Python](https://realpython.com/)** — In-depth Python tutorials
- **[Automate the Boring Stuff](https://automatetheboringstuff.com/)** — Free book, practical projects
- **[Python Tutor](https://pythontutor.com/)** — Visualize code execution

### Machine Learning & AI
- **[Google ML Crash Course](https://developers.google.com/machine-learning/crash-course)** — Free Google course
- **[Fast.ai](https://www.fast.ai/)** — Practical deep learning
- **[3Blue1Brown - Neural Networks](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)** — Beautiful visual explanations
- **[Kaggle Learn](https://www.kaggle.com/learn)** — Interactive ML courses

### Practice & Challenges
- **[LeetCode](https://leetcode.com/)** — Coding interview prep
- **[HackerRank](https://www.hackerrank.com/)** — Programming challenges
- **[Exercism](https://exercism.org/tracks/python)** — Practice with mentorship
- **[Advent of Code](https://adventofcode.com/)** — Fun yearly programming puzzles

### Developer Tools
- **[MIT Missing Semester](https://missing.csail.mit.edu/)** — Essential dev tools course
- **[Oh My Git!](https://ohmygit.org/)** — Learn Git interactively
- **[Learn Git Branching](https://learngitbranching.js.org/)** — Visual Git tutorial

### Video Tutorials
- **[Corey Schafer - Python](https://www.youtube.com/c/Coreyms)** — Excellent Python tutorials
- **[freeCodeCamp](https://www.youtube.com/c/Freecodecamp)** — Full courses (4-10 hours)
- **[Sentdex](https://www.youtube.com/c/sentdex)** — Python & ML tutorials

---

## Acknowledgments

Created to make programming, AI, computer science, and high-performance computing education accessible and interactive for everyone.

Special thanks to the open-source community and the thousands of developers who have contributed to the tools and libraries featured in this curriculum.

---

## 🎓 Start Your Journey

**Ready to begin?** [Click here to start learning!](https://mykolas-perevicius.github.io/Education_Playground/)

---

**Happy Learning!** Remember: every expert was once a beginner. Whether you're interested in building AI models, optimizing code for maximum performance, programming GPUs, understanding how computers work at the silicon level, or becoming a Python master - your journey starts here.

**From Hello World to CUDA kernels, from basic loops to distributed systems, from simple scripts to production ML pipelines - we've got you covered!**

Keep practicing, stay curious, and enjoy the journey! 🚀

**"The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie**
