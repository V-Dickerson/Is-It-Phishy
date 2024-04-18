from flask import Flask, json
import pickle
import random
import pandas as pd

api = Flask(__name__)

######################################################
################## REUSED VARIABLES ##################
######################################################
api.urls = None
api.x_test = None
api.y_test = None
api.predictions = None
api.predictions_confidence = None
api.columns = None


##############################################################
################## INTERFACED API FUNCTIONS ##################
##############################################################

@api.route('/api/get-question')
def getRandom(): # returns an array of the data features from the array
    print("getRandom called from server")
    # handle unloaded model
    if api.x_test is None:
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
        "url_data": list([[api.columns[i], api.x_test.iloc[randomIndex][i]] for i in range(len(api.columns))]), # json.dumps(list(zip(api.columns, api.raw_x.iloc[randomIndex]))),
        "answer": int(api.y_test.iloc[randomIndex]),
        "model_answer": int(model_pred),
        "model_confidence": int(confidence),
    }

    return to_return

######################################################################
################## HELPER FUNCTIONS -- NO INTERFACE ##################
######################################################################

# loads the test data used for the game (verifying predictions, informing users)
def loadTesting():
    print('loadTesting called from server')
    with open('./api/numeric_data.pkl', 'rb') as file:
        numeric_data = pickle.load(file)
        api.x_test = numeric_data.drop('status', axis=1)
        api.columns = list(api.x_test.columns.values)
        api.y_test = numeric_data['status']
    with open('./api/urls.pkl', 'rb') as file:
        api.urls = pickle.load(file)
    
# loads the predictions from the test data into the API.
def loadPredictions():
    print("loadPredictions called from server")
    with open('./api/predictions.pkl', 'rb') as file_handle:
        api.predictions = pickle.load(file_handle)
    with open('./api/predictions_probability.pkl', 'rb') as file_handle:
        api.predictions_confidence = pickle.load(file_handle)

