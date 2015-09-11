import httplib
import time
from hashlib import sha1
import random
import string
import json
#from flask import Blueprint, make_response, jsonify, request
from sys import argv

import os

# Get the current directory
current_dir = os.getcwd();
print "Current directory: " + current_dir;
data_dir = os.path.normpath(os.getcwd() + os.sep + os.pardir) + "/data";

print "Data directory: " + data_dir;

## Setting up initial variables



offset_ini = 0;
limit_ini = 750;
sleeping_time = 10;
status_Sold = "sold";
status_ForSale = "listings";
query_text = "Karlstad"


#Get the path and name of the file where the output data will be stored 
filename = data_dir + "/booli_" + query_text + ".json";
#filename = "/Users/djjupa/Projects/git/Booli/data/booli.json"

# Global variables
sold_all = [];
housingObjects = [];
total_objects = 1;
search_parameters = {};




# 
def callBooli(status, query_text, offset, limit):

    # Setup the stuff
    callerId = "DataAfterLife"
    timestamp = str(int(time.time()))
    unique = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(116))
    hashstr = sha1(callerId+timestamp+"XQc9CrWSJInMEnGjLnXE85aheCS8DqsFv2N5HXMi"+unique).hexdigest()
    
    
    # The request string    
    url = "/"+status+"?q="+query_text+"&callerId="+callerId+"&time="+timestamp+"&unique="+unique+"&hash="+hashstr+"&offset="+str(offset)+"&limit="+str(limit)
    # Setup and open the connection
    connection = httplib.HTTPConnection("api.booli.se")
    connection.request("GET", url)
    response = connection.getresponse()
    response_data = response.read()
    connection.close()
    
    if response.status != 200:
        print "fail";
    
    
    # Transform this into a json string
    result_onecall_json = json.loads(response_data);
    
    # get the number of objects (houses) according to the json string
    global total_objects;   # tell python that this variable is global 
    total_objects = result_onecall_json['totalCount'];
    
    global search_parameters;
    search_parameters = result_onecall_json['searchParams'];
    search_parameters['queryText'] = query_text;
    search_parameters['status'] = status;
    
    # Print some debugging output
    print "Total number of housing objects: " + str(total_objects);
    print "Offset: " + str(offset);
    print "Limit: " + str(limit);
    
    
    result_all_json = result_onecall_json['sold'];
    
    print "Array of sold objects: " + str(len(result_all_json));
    
        
    # This will be the list storing all the values of the "sold" property of the json array 
    #global sold_all;
    #sold_all = sold_all + result_all_json_sold; 
       
    #print "length of sold_all: " + str(len(sold_all));    
    
    return result_all_json;
    
    
    
    
    
# END of function
    
# Call the API until all of the objects (houses) has been retrieved
while(offset_ini < total_objects):
    
    global housingObjects;
    housingObjects = housingObjects + callBooli(status_Sold, query_text, offset_ini, limit_ini);
    print "Length of housingObjects: " + str(len(housingObjects));


    # Preparing for the next call 
    offset_ini = offset_ini + limit_ini;
    print "Total number of housing objects: " + str(total_objects);
    print "Offset_ini: " + str(offset_ini);
    print "Limit_ini: " + str(limit_ini);
    
    # Wait sometime for the next request
    time.sleep(sleeping_time);



data_all = {'totalCount': total_objects,
            'searchParameters': search_parameters,
            'housingObjects': housingObjects}

#Verify that the json string is valid -- if not it will throw an error
json.loads(data_all);

# Open the stream to write to a file
target = open(filename, 'w')
    
target.write(json.dumps(data_all, indent=4))
#target.write(json.dumps(result_pretty_json, indent=4, sort_keys=True))
#print result






# # Setup the stuff
# callerId = "DataAfterLife"
# timestamp = str(int(time.time()))
# unique = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(116))
# hashstr = sha1(callerId+timestamp+"XQc9CrWSJInMEnGjLnXE85aheCS8DqsFv2N5HXMi"+unique).hexdigest()
# 
# 
# # The request string
# url = "/sold?q=karlstad&callerId="+callerId+"&time="+timestamp+"&unique="+unique+"&hash="+hashstr
# 
# # Setup and open the connection
# connection = httplib.HTTPConnection("api.booli.se")
# connection.request("GET", url)
# response = connection.getresponse()
# data = response.read()
# connection.close()
# 
# if response.status != 200:
#     print "fail"
# 
# result = data
# 
# result_pretty_json = json.loads(result)
# 
# # Open the stream to write to a file
# target = open(filename, 'a')
# 
# target.write(json.dumps(result_pretty_json, indent=4))
# #target.write(json.dumps(result_pretty_json, indent=4, sort_keys=True))
# #print result