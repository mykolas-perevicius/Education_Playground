# Python Quick Reference Cheat Sheet

A comprehensive Python reference for quick lookups.

## Table of Contents
- [Basics](#basics)
- [Data Types](#data-types)
- [Control Flow](#control-flow)
- [Functions](#functions)
- [Classes & OOP](#classes--oop)
- [Data Structures](#data-structures)
- [File I/O](#file-io)
- [Error Handling](#error-handling)
- [Modules & Packages](#modules--packages)
- [Advanced Features](#advanced-features)

---

## Basics

### Comments
```python
# Single line comment

"""
Multi-line comment
or docstring
"""
```

### Variables
```python
x = 5                  # Integer
y = 3.14              # Float
name = "Python"       # String
is_valid = True       # Boolean
```

### Print & Input
```python
print("Hello", "World")           # Hello World
print(f"x = {x}")                 # f-string (formatted)
user_input = input("Enter name: ")  # Get user input
```

### Operators
```python
# Arithmetic
+ - * / // % **          # Add, sub, mul, div, floor div, mod, power

# Comparison
== != < > <= >=         # Equal, not equal, less, greater, etc.

# Logical
and or not              # Logical operators

# Assignment
= += -= *= /= //= %=   # Assign, add-assign, etc.
```

---

## Data Types

### Numbers
```python
int_num = 42
float_num = 3.14
complex_num = 1 + 2j

# Conversion
int("123")      # String to int
float("3.14")   # String to float
str(42)         # Number to string
```

### Strings
```python
s = "Hello World"

# Methods
s.upper()           # "HELLO WORLD"
s.lower()           # "hello world"
s.split()           # ["Hello", "World"]
s.replace("H", "J") # "Jello World"
s.strip()           # Remove whitespace
s.find("World")     # Find substring (returns index)
s.startswith("H")   # True
s.endswith("d")     # True

# Slicing
s[0]        # "H"
s[-1]       # "d"
s[0:5]      # "Hello"
s[::2]      # Every 2nd character

# Formatting
f"{x} + {y} = {x+y}"         # f-string
"{} + {} = {}".format(x, y, x+y)  # format()
"%d + %d = %d" % (x, y, x+y)      # % operator
```

---

## Control Flow

### If Statements
```python
if x > 0:
    print("Positive")
elif x < 0:
    print("Negative")
else:
    print("Zero")

# Ternary
result = "Positive" if x > 0 else "Non-positive"
```

### Loops
```python
# For loop
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for item in [1, 2, 3]:
    print(item)

for key, value in dict.items():
    print(key, value)

# While loop
while x < 10:
    x += 1

# Loop control
break       # Exit loop
continue    # Skip to next iteration
```

### Comprehensions
```python
# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]

# Dict comprehension
{x: x**2 for x in range(5)}

# Set comprehension
{x**2 for x in range(10)}
```

---

## Functions

### Basic Functions
```python
def greet(name):
    return f"Hello, {name}!"

def add(a, b=0):  # Default parameter
    return a + b

# Call
greet("Alice")
add(5, 3)
add(5)  # Uses default b=0
```

### Advanced Functions
```python
# *args and **kwargs
def func(*args, **kwargs):
    print(args)    # Tuple of positional args
    print(kwargs)  # Dict of keyword args

# Lambda
square = lambda x: x**2
sorted_list = sorted(items, key=lambda x: x[1])

# Decorators
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Time: {time.time() - start}")
        return result
    return wrapper

@timer
def slow_function():
    pass
```

---

## Classes & OOP

### Basic Class
```python
class Dog:
    # Class variable
    species = "Canis familiaris"

    def __init__(self, name, age):
        # Instance variables
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} says Woof!"

    def __str__(self):
        return f"{self.name}, {self.age} years old"

# Create instance
my_dog = Dog("Buddy", 3)
print(my_dog.bark())
```

### Inheritance
```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        pass

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"
```

### Special Methods
```python
class MyClass:
    def __init__(self):       # Constructor
        pass

    def __str__(self):        # String representation
        return "MyClass"

    def __len__(self):        # Length
        return 10

    def __getitem__(self, key):  # Indexing
        return self.data[key]

    def __call__(self):       # Make callable
        pass
```

---

## Data Structures

### Lists
```python
lst = [1, 2, 3, 4, 5]

# Methods
lst.append(6)       # Add to end
lst.insert(0, 0)    # Insert at index
lst.remove(3)       # Remove first occurrence
lst.pop()           # Remove and return last
lst.pop(0)          # Remove and return at index
lst.sort()          # Sort in place
lst.reverse()       # Reverse in place
lst.index(4)        # Find index
lst.count(2)        # Count occurrences
lst.clear()         # Remove all

# Slicing
lst[0]      # First element
lst[-1]     # Last element
lst[1:3]    # Elements 1 to 2
lst[::2]    # Every 2nd element
lst[::-1]   # Reverse
```

### Dictionaries
```python
d = {"name": "Alice", "age": 25}

# Access
d["name"]           # Get value
d.get("name")       # Safe get (returns None if not found)
d.get("city", "Unknown")  # With default

# Methods
d.keys()            # All keys
d.values()          # All values
d.items()           # All key-value pairs
d.update({"age": 26})  # Update
d.pop("age")        # Remove and return
d.clear()           # Remove all

# Dict comprehension
{k: v*2 for k, v in d.items()}
```

### Sets
```python
s = {1, 2, 3, 4}

# Methods
s.add(5)            # Add element
s.remove(3)         # Remove (error if not found)
s.discard(3)        # Remove (no error)
s.pop()             # Remove and return arbitrary element

# Set operations
a = {1, 2, 3}
b = {3, 4, 5}
a | b               # Union: {1, 2, 3, 4, 5}
a & b               # Intersection: {3}
a - b               # Difference: {1, 2}
a ^ b               # Symmetric difference: {1, 2, 4, 5}
```

### Tuples
```python
t = (1, 2, 3)       # Immutable

# Named tuples
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(1, 2)
print(p.x, p.y)
```

---

## File I/O

### Reading Files
```python
# Read entire file
with open('file.txt', 'r') as f:
    content = f.read()

# Read lines
with open('file.txt', 'r') as f:
    lines = f.readlines()  # List of lines

# Read line by line
with open('file.txt', 'r') as f:
    for line in f:
        print(line.strip())
```

### Writing Files
```python
# Write (overwrite)
with open('file.txt', 'w') as f:
    f.write("Hello\n")

# Append
with open('file.txt', 'a') as f:
    f.write("World\n")

# Write multiple lines
with open('file.txt', 'w') as f:
    lines = ["Line 1\n", "Line 2\n"]
    f.writelines(lines)
```

### JSON
```python
import json

# Write JSON
data = {"name": "Alice", "age": 25}
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

# Read JSON
with open('data.json', 'r') as f:
    data = json.load(f)

# Strings
json.dumps(data)    # Dict to string
json.loads(string)  # String to dict
```

---

## Error Handling

### Try-Except
```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"Error: {e}")
else:
    print("No errors")
finally:
    print("Always runs")
```

### Raise Exceptions
```python
def divide(a, b):
    if b == 0:
        raise ValueError("b cannot be zero")
    return a / b

# Custom exception
class CustomError(Exception):
    pass

raise CustomError("Something went wrong")
```

---

## Modules & Packages

### Import
```python
import math                 # Import module
from math import sqrt       # Import specific function
from math import *          # Import all (not recommended)
import math as m            # Import with alias

# Use
math.sqrt(16)
sqrt(16)
m.sqrt(16)
```

### Common Built-in Modules
```python
import os           # Operating system interface
import sys          # System-specific parameters
import datetime     # Date and time
import random       # Random number generation
import re           # Regular expressions
import json         # JSON encoder/decoder
import math         # Mathematical functions
import collections  # Advanced data structures
```

---

## Advanced Features

### Generators
```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for i in countdown(5):
    print(i)

# Generator expression
gen = (x**2 for x in range(10))
```

### Iterators
```python
class MyRange:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        self.current += 1
        return self.current - 1
```

### Context Managers
```python
class MyContext:
    def __enter__(self):
        print("Entering")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exiting")

with MyContext() as ctx:
    print("Inside")
```

### Property Decorators
```python
class Person:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        self._name = value

    @name.deleter
    def name(self):
        del self._name

p = Person("Alice")
print(p.name)       # Calls getter
p.name = "Bob"      # Calls setter
```

### Type Hints
```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

from typing import List, Dict, Optional, Union

def process(items: List[int]) -> Dict[str, int]:
    return {"count": len(items)}

def get_user(id: int) -> Optional[Dict]:
    return None  # or user dict
```

---

## Useful One-Liners

```python
# Swap variables
a, b = b, a

# Multiple assignment
x, y, z = 1, 2, 3

# Unpack
first, *rest, last = [1, 2, 3, 4, 5]

# Check if all/any
all([True, True, False])  # False
any([True, False, False]) # True

# Enumerate
for i, item in enumerate(items):
    print(i, item)

# Zip
for x, y in zip([1, 2, 3], ['a', 'b', 'c']):
    print(x, y)

# Flatten list
flat = [item for sublist in nested for item in sublist]

# Remove duplicates
unique = list(set(items))

# Dictionary merge (Python 3.9+)
merged = dict1 | dict2

# Walrus operator (Python 3.8+)
if (n := len(items)) > 10:
    print(f"Too many items: {n}")
```

---

## Performance Tips

1. Use list comprehensions instead of loops
2. Use `join()` for string concatenation
3. Use generators for large datasets
4. Use `set` for membership testing
5. Use built-in functions (they're optimized in C)
6. Profile before optimizing (`cProfile`)

---

## Common Pitfalls

```python
# Mutable default arguments
def bad(items=[]):  # BAD
    items.append(1)
    return items

def good(items=None):  # GOOD
    if items is None:
        items = []
    items.append(1)
    return items

# Late binding closures
funcs = [lambda: i for i in range(5)]  # All return 4
funcs = [lambda i=i: i for i in range(5)]  # Fix

# Modifying list while iterating
for item in items:
    if condition:
        items.remove(item)  # BAD

items = [item for item in items if not condition]  # GOOD
```

---

This cheat sheet covers the most commonly used Python features. For more details, check the [official Python documentation](https://docs.python.org/).
