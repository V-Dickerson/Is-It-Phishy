from flask import Flask
import pickle
import random
import pandas as pd
from sklearn.neural_network import MLPClassifier
import warnings

warnings.filterwarnings("ignore")
api = Flask(__name__)

api.model = None
api.urls = None
api.x_test = None
api.y_test = None
api.predictions = None
api.predictions_confidence = None


##############################################################
################## INTERFACED API FUNCTIONS ##################
##############################################################

@api.route('/get-question')
def getRandom(): # returns an array of the data features from the array
    print("getRandom called from server")
    # handle unloaded model
    if api.model is None:
        loadModel()
    if api.x_test is None or api.y_test is None:
        loadTesting()
    if api.predictions is None:
        loadPredictions()
    
    randomIndex = random.randint(0,len(api.y_test))

    model_pred = api.predictions[randomIndex]

    to_return = {
        "url": api.urls.iloc[randomIndex],
        "url_data": list(api.x_test.iloc[randomIndex]),
        "answer": int(api.y_test.iloc[randomIndex]),
        "model_answer": int(model_pred),
        "model_confidence": int(api.predictions_confidence[randomIndex][model_pred]),
    }
    print("##############################################")
    return to_return




######################################################################
################## HELPER FUNCTIONS -- NO INTERFACE ##################
######################################################################

# loads the MLP model into the environment variables for the api
def loadModel():
    print("loadModel called from server")
    try: 
        with open('../../model-config/phishing-model-v1.pkl', 'rb') as file_handle:
            api.model = pickle.load(file_handle)
        return True # worked as expected
    except:
        return False # something went wrong, error behavior to report

# loads the test data used for the game (verifying predictions, informing users)
def loadTesting():
    print('loadTesting called from server')
    testing = pd.read_parquet('../../model-config/Training.parquet')
    api.urls = testing['url'] # grabbing this for later! easily interfaced for returning data to server
    testing = testing.drop(['url'], axis=1)
    testing['status'] = testing['status'].replace({'phishing':1, 'legitimate':0})
    api.x_test = testing.drop('status', axis=1)
    api.y_test = testing['status']
    
# loads the predictions from the test data into the API.
def loadPredictions():
    print("loadPredictions called from server")
    if api.model is None:
        loadModel()
    if api.x_test is None or api.y_test is None:
        loadTesting()

    api.predictions = api.model.predict(api.x_test)
    api.predictions_confidence = api.model.predict_proba(api.x_test)


