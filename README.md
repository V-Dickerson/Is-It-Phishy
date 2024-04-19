# Is-It-Phishy: Phishing Detection Game

## Overview
Is-It-Phishy is an interactive web-based game designed to demonstrate machine learning models by creating a competition between the user and a model in detecting phishing URLs. The project incorporates a multi-layer perceptron model, developed in Python using sklearn, pandas, and numpy, which predicts whether a given URL is legitimate or a phishing attempt. This model is integrated into a React frontend that accesses the model predictions via a Flask backend, where users can directly interact with the predictions and see real-time results.

## Display
<p align="center">
  <img alt="Gameplay Screen" src="https://github.com/V-Dickerson/Is-It-Phishy/assets/113952778/c8a2eeed-9609-46af-b750-8a161c389c5b" width="45%">
  <img alt="Answer Screen" src="https://github.com/V-Dickerson/Is-It-Phishy/assets/113952778/bfbad7b6-b11b-4da8-b22d-d3f2f60334de" width="45%">
</p>
<p align="center">
  <img alt="Intro Screen" src="https://github.com/V-Dickerson/Is-It-Phishy/assets/113952778/16d37d17-3b07-4fe9-a705-f59c75f7d0bb" width="28%">
  <img alt="Model View Screen" src="https://github.com/V-Dickerson/Is-It-Phishy/assets/113952778/b7bb8059-ae77-4078-922d-dfda81bbc9e9" width="28%">
  <img alt="About Screen" src="https://github.com/V-Dickerson/Is-It-Phishy/assets/113952778/e0720422-7a51-4a33-8fa6-79f6bbfebee0" width="28%">
</p>

## Aims
- **Interactive Gameplay:** Users test whether URLs are phishing attempts and see if they can outguess the model.
- **Learning Opportunity:** Provides insights into how machine learning models make predictions.
- **Open Source:** All the code is available on GitHub for learning, modification, and distribution. The project has a Jupyter notebook that outlines the process I had in training and exporting the model which can be found in the model-config folder.

## Architecture
- **Backend:** Flask API serving model predictions.
- **Frontend:** React application for user interactions.
- **Model:** Sklearn's MLPClassifier trained on URL features.

## License
Distributed under the GNU General Public License. See `LICENSE` for more information.
