# Is-It-Phishy: Phishing Detection Game
![image](https://github.com/V-Dickerson/Phishing-Detector/assets/113952778/61fc6e0b-c29f-41f5-b289-00156ff77bf6)
![image](https://github.com/V-Dickerson/Phishing-Detector/assets/113952778/59477b94-a098-475a-a6be-a770a15a81e1)
![image](https://github.com/V-Dickerson/Phishing-Detector/assets/113952778/da1313e6-f189-427d-9b53-79d740a3916b)



## Overview
Is-It-Phishy is an interactive web-based game designed to demonstrate machine learning models by creating a competition between the user and a model in detecting phishing URLs. The project incorporates a multi-layer perceptron model, developed in Python using sklearn, pandas, and numpy, which predicts whether a given URL is legitimate or a phishing attempt. This model is integrated into a React frontend that accesses the model predictions via a Flask backend, where users can directly interact with the predictions and see real-time results.

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
