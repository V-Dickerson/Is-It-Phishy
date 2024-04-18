from flask import Flask, json
import pickle
import random
import pandas as pd
from sklearn.neural_network import MLPClassifier
import warnings


warnings.filterwarnings("ignore")
api = Flask(__name__)

######################################################
################## REUSED VARIABLES ##################
######################################################
api.model = None
api.urls = None
api.url_columns = None
api.x_test = None
api.raw_x = None
api.y_test = None
api.model_scaler = None
api.predictions = None
api.predictions_confidence = None


##############################################################
################## INTERFACED API FUNCTIONS ##################
##############################################################

@api.route('/api/get-question')
def getRandom(): # returns an array of the data features from the array
    print("getRandom called from server")
    # handle unloaded model
    if api.model is None:
        loadModel()
    if api.x_test is None or api.y_test is None:
        loadTesting()
    if api.predictions is None:
        loadPredictions()
    
    # the random URL, model choice, prediction, etc that we're selecting to analyze
    randomIndex = random.randint(0,len(api.y_test))

    # selecting from api environment variables the information necessary for the game
    model_pred = api.predictions[randomIndex]

    confidence = api.predictions_confidence[randomIndex][model_pred]*100

    to_return = {
        "url": api.urls.iloc[randomIndex],
        "url_data": list([[api.columns[i], api.raw_x.iloc[randomIndex][i]] for i in range(len(api.columns))]), # json.dumps(list(zip(api.columns, api.raw_x.iloc[randomIndex]))),
        "answer": int(api.y_test.iloc[randomIndex]),
        "model_answer": int(model_pred),
        "model_confidence": int(confidence),
    }

    return to_return




######################################################################
################## HELPER FUNCTIONS -- NO INTERFACE ##################
######################################################################

# loads the MLP model into the environment variables for the api
def loadModel():
    print("loadModel called from server")
    try: 
        with open('./api/phishing-model-v1.pkl', 'rb') as file_handle:
            api.model = pickle.load(file_handle)
        with open('./api/model-scaler.pkl', 'rb') as file_handle:
            api.model_scaler = pickle.load(file_handle)
        return True # worked as expected
    except:
        return False # something went wrong, error behavior to report

# loads the test data used for the game (verifying predictions, informing users)
def loadTesting():
    print('loadTesting called from server')
    testing = pd.read_parquet('./api/Testing.circ')
    api.urls = testing['url'] # grabbing this for later! easily interfaced for returning data to server
    testing = testing.drop(['url'], axis=1)
    testing['status'] = testing['status'].replace({'phishing':1, 'legitimate':0})
    api.raw_x = testing.drop('status', axis=1)
    api.columns = list(api.raw_x.columns.values)
    api.x_test = api.model_scaler.transform(api.raw_x)
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

