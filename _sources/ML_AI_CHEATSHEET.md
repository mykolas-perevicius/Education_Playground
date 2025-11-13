# Machine Learning & AI Quick Reference

A comprehensive reference for ML/AI with Python.

## Table of Contents
- [scikit-learn Basics](#scikit-learn-basics)
- [Data Preprocessing](#data-preprocessing)
- [Model Training & Evaluation](#model-training--evaluation)
- [Deep Learning (TensorFlow/Keras)](#deep-learning-tensorflowkeras)
- [Natural Language Processing](#natural-language-processing)
- [Model Deployment](#model-deployment)

---

## scikit-learn Basics

### Installation
```bash
pip install scikit-learn pandas numpy matplotlib
```

### Basic Workflow
```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# 1. Load data
X, y = load_data()

# 2. Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3. Preprocess
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 4. Train
model = LogisticRegression()
model.fit(X_train, y_train)

# 5. Predict
y_pred = model.predict(X_test)

# 6. Evaluate
accuracy = accuracy_score(y_test, y_pred)
```

---

## Data Preprocessing

### Handling Missing Data
```python
from sklearn.impute import SimpleImputer

# Mean imputation
imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)

# Other strategies: 'median', 'most_frequent', 'constant'
```

### Feature Scaling
```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Standardization (mean=0, std=1)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Normalization (range 0-1)
scaler = MinMaxScaler()
X_normalized = scaler.fit_transform(X)
```

### Encoding Categorical Variables
```python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
import pandas as pd

# Label Encoding (for target variable)
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# One-Hot Encoding
encoder = OneHotEncoder(sparse=False)
X_encoded = encoder.fit_transform(X_categorical)

# Pandas get_dummies
df_encoded = pd.get_dummies(df, columns=['category'])
```

### Feature Engineering
```python
from sklearn.preprocessing import PolynomialFeatures

# Polynomial features
poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)
```

---

## Model Training & Evaluation

### Classification Models

#### Logistic Regression
```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
```

#### Decision Tree
```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(max_depth=5)
model.fit(X_train, y_train)
```

#### Random Forest
```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, max_depth=10)
model.fit(X_train, y_train)

# Feature importance
importances = model.feature_importances_
```

#### Support Vector Machine
```python
from sklearn.svm import SVC

model = SVC(kernel='rbf', C=1.0)
model.fit(X_train, y_train)
```

#### Gradient Boosting
```python
from sklearn.ensemble import GradientBoostingClassifier

model = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1)
model.fit(X_train, y_train)
```

#### XGBoost
```python
import xgboost as xgb

model = xgb.XGBClassifier(n_estimators=100, learning_rate=0.1)
model.fit(X_train, y_train)
```

### Regression Models

```python
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor

# Linear Regression
model = LinearRegression()

# Ridge (L2 regularization)
model = Ridge(alpha=1.0)

# Lasso (L1 regularization)
model = Lasso(alpha=1.0)

# Random Forest Regressor
model = RandomForestRegressor(n_estimators=100)
```

### Clustering

```python
from sklearn.cluster import KMeans, DBSCAN

# K-Means
kmeans = KMeans(n_clusters=3)
labels = kmeans.fit_predict(X)

# DBSCAN
dbscan = DBSCAN(eps=0.5, min_samples=5)
labels = dbscan.fit_predict(X)
```

### Evaluation Metrics

#### Classification
```python
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score,
    roc_curve
)

# Basic metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)

# Classification Report
report = classification_report(y_test, y_pred)

# ROC AUC
y_pred_proba = model.predict_proba(X_test)
auc = roc_auc_score(y_test, y_pred_proba[:, 1])

# ROC Curve
fpr, tpr, thresholds = roc_curve(y_test, y_pred_proba[:, 1])
```

#### Regression
```python
from sklearn.metrics import (
    mean_squared_error, mean_absolute_error, r2_score
)

mse = mean_squared_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred, squared=False)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
```

### Cross-Validation
```python
from sklearn.model_selection import cross_val_score, KFold

# Simple CV
scores = cross_val_score(model, X, y, cv=5)
print(f"Accuracy: {scores.mean():.2f} (+/- {scores.std():.2f})")

# K-Fold CV
kfold = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=kfold)
```

### Hyperparameter Tuning

#### Grid Search
```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(
    RandomForestClassifier(),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)

grid_search.fit(X_train, y_train)

best_params = grid_search.best_params_
best_model = grid_search.best_estimator_
```

#### Randomized Search
```python
from sklearn.model_selection import RandomizedSearchCV

param_dist = {
    'n_estimators': [50, 100, 150, 200],
    'max_depth': [5, 10, 15, 20, None],
    'min_samples_split': [2, 5, 10]
}

random_search = RandomizedSearchCV(
    RandomForestClassifier(),
    param_dist,
    n_iter=20,
    cv=5,
    random_state=42
)

random_search.fit(X_train, y_train)
```

---

## Deep Learning (TensorFlow/Keras)

### Installation
```bash
pip install tensorflow numpy matplotlib
```

### Basic Neural Network
```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Build model
model = keras.Sequential([
    layers.Dense(64, activation='relu', input_shape=(input_dim,)),
    layers.Dropout(0.2),
    layers.Dense(32, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(num_classes, activation='softmax')
])

# Compile
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train
history = model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_split=0.2,
    callbacks=[
        keras.callbacks.EarlyStopping(patience=5),
        keras.callbacks.ModelCheckpoint('best_model.h5')
    ]
)

# Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test)

# Predict
predictions = model.predict(X_new)
```

### Convolutional Neural Network (CNN)
```python
model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])
```

### Recurrent Neural Network (RNN/LSTM)
```python
model = keras.Sequential([
    layers.LSTM(128, return_sequences=True, input_shape=(seq_length, features)),
    layers.Dropout(0.2),
    layers.LSTM(64),
    layers.Dropout(0.2),
    layers.Dense(num_classes, activation='softmax')
])
```

### Transfer Learning
```python
# Load pre-trained model
base_model = keras.applications.VGG16(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

# Freeze base model
base_model.trainable = False

# Add custom layers
model = keras.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(num_classes, activation='softmax')
])
```

### Callbacks
```python
# Early Stopping
early_stop = keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True
)

# Model Checkpoint
checkpoint = keras.callbacks.ModelCheckpoint(
    'best_model.h5',
    monitor='val_accuracy',
    save_best_only=True
)

# Learning Rate Scheduler
def scheduler(epoch, lr):
    if epoch > 10:
        return lr * 0.9
    return lr

lr_schedule = keras.callbacks.LearningRateScheduler(scheduler)

# Use in training
model.fit(X_train, y_train, callbacks=[early_stop, checkpoint, lr_schedule])
```

---

## Natural Language Processing

### Text Preprocessing
```python
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

def preprocess_text(text):
    # Lowercase
    text = text.lower()

    # Remove special characters
    text = re.sub(r'[^a-zA-Z\s]', '', text)

    # Tokenize
    tokens = word_tokenize(text)

    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [w for w in tokens if w not in stop_words]

    # Stemming
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(w) for w in tokens]

    return ' '.join(tokens)
```

### TF-IDF Vectorization
```python
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer(max_features=1000)
X_tfidf = vectorizer.fit_transform(texts)
```

### Word Embeddings with Keras
```python
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Tokenize
tokenizer = Tokenizer(num_words=10000, oov_token='<OOV>')
tokenizer.fit_on_texts(texts)

# Convert to sequences
sequences = tokenizer.texts_to_sequences(texts)

# Pad sequences
padded = pad_sequences(sequences, maxlen=100, padding='post')

# Embedding layer
model = keras.Sequential([
    layers.Embedding(10000, 16, input_length=100),
    layers.LSTM(32),
    layers.Dense(1, activation='sigmoid')
])
```

### Sentiment Analysis Pipeline
```python
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

pipeline = Pipeline([
    ('vectorizer', TfidfVectorizer()),
    ('classifier', MultinomialNB())
])

pipeline.fit(X_train, y_train)
predictions = pipeline.predict(X_test)
```

---

## Model Deployment

### Save/Load Models

#### scikit-learn
```python
import joblib

# Save
joblib.dump(model, 'model.pkl')

# Load
model = joblib.load('model.pkl')
```

#### TensorFlow/Keras
```python
# Save
model.save('model.h5')
model.save('model_folder')  # SavedModel format

# Load
model = keras.models.load_model('model.h5')
```

### Simple Flask API
```python
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = data['features']
    prediction = model.predict([features])
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
```

---

## Best Practices

### Data Preparation
1. Always split data before preprocessing
2. Fit scalers/encoders only on training data
3. Handle missing values appropriately
4. Check for class imbalance
5. Use stratified splits for imbalanced data

### Model Training
1. Start simple, then increase complexity
2. Use cross-validation
3. Monitor training/validation curves
4. Use regularization to prevent overfitting
5. Save best model, not last model

### Evaluation
1. Use appropriate metrics for your problem
2. Create confusion matrix for classification
3. Plot learning curves
4. Test on truly unseen data
5. Consider model interpretability

### Production
1. Version your models
2. Monitor model performance over time
3. Handle edge cases and errors gracefully
4. Log predictions for analysis
5. Set up A/B testing for new models

---

## Common Issues & Solutions

### Overfitting
```python
# Solutions:
- More training data
- Data augmentation
- Regularization (L1/L2)
- Dropout
- Early stopping
- Simpler model
- Cross-validation
```

### Underfitting
```python
# Solutions:
- More complex model
- More features
- Less regularization
- Train longer
- Better feature engineering
```

### Class Imbalance
```python
from sklearn.utils.class_weight import compute_class_weight

# Compute class weights
class_weights = compute_class_weight(
    'balanced',
    classes=np.unique(y_train),
    y=y_train
)

# Use in model
model.fit(X_train, y_train, class_weight=dict(enumerate(class_weights)))

# Or use SMOTE
from imblearn.over_sampling import SMOTE
smote = SMOTE()
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)
```

---

## Resources

- **scikit-learn docs**: https://scikit-learn.org/
- **TensorFlow tutorials**: https://www.tensorflow.org/tutorials
- **Keras documentation**: https://keras.io/
- **Papers With Code**: https://paperswithcode.com/
- **Kaggle**: https://www.kaggle.com/

This cheat sheet covers the essentials. Refer to official documentation for detailed information!
