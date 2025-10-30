# Education Playground - Interactive Programming, AI & Computing Platform

Welcome to the Education Playground! A comprehensive, self-paced learning platform covering **Python Programming**, **Artificial Intelligence**, **Machine Learning**, and **Computer Science Fundamentals** for all skill levels.

## Overview

This repository contains a complete curriculum organized into three difficulty levels. Each level includes modules on:
- **Python Programming**: Core language skills
- **AI & Machine Learning**: From basics to deep learning
- **Computing Fundamentals**: How computers work and CS theory

**All lessons within each level can be completed in parallel** - choose your own path based on your interests!

## Getting Started

### 1. Take the Calibration Test

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
   - Computer architecture and organization
   - Memory hierarchy and caching
   - Concurrency and parallelism
   - Computational complexity theory (P vs NP)
   - Formal languages and automata
   - Virtual memory and paging

---

## Installation

### Prerequisites

- Python 3.8 or higher
- Jupyter Notebook or JupyterLab

### Setup

1. Clone this repository:
```bash
git clone https://github.com/mykolas-perevicius/Education_Playground.git
cd Education_Playground
```

2. (Optional) Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install required packages:
```bash
pip install jupyter numpy pandas matplotlib scikit-learn tensorflow xgboost nltk
```

4. Start Jupyter:
```bash
jupyter notebook
```

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

### AI & Machine Learning
- Introduction to AI concepts
- Machine learning with scikit-learn
- Deep learning with TensorFlow/Keras
- Natural Language Processing
- Model evaluation and optimization

### Computing Fundamentals
- Binary and data representation
- Computer architecture
- Memory management
- Concurrency and parallelism
- Computational complexity
- Systems programming

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

## Acknowledgments

Created to make programming, AI, and computer science education accessible and interactive for everyone.

---

**Happy Learning!** Remember: every expert was once a beginner. Whether you're interested in building AI models, understanding how computers work, or becoming a Python master - your journey starts here. Keep practicing, stay curious, and enjoy the journey!
