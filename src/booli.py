import httplib
import time
from hashlib import sha1
import random
import string
import json
from flask import Blueprint, make_response, jsonify, request
from sys import argv

import os

# Get the current directory
current_dir = os.getcwd();
print "Current directory: " + current_dir


## Setting up initial variables

#Get the path and name of the file where the output data will be stored 
# filename = current_dir + "/data/booli.json" 
filename = "/Users/djjupa/Projects/git/Booli/data/booli.json"


offset_ini = 0;
limit_ini = 100;
sleeping_time = 10;
status_Sold = "sold";
status_ForSale = "listings";

def callBooli(status_Sold, offset, limit):

    # Setup the stuff
    callerId = "DataAfterLife"
    timestamp = str(int(time.time()))
    unique = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(116))
    hashstr = sha1(callerId+timestamp+"XQc9CrWSJInMEnGjLnXE85aheCS8DqsFv2N5HXMi"+unique).hexdigest()
    
    
    # The request string
    
    url = "/"+status_Sold+"?q=karlstad&callerId="+callerId+"&time="+timestamp+"&unique="+unique+"&hash="+hashstr+"&offset="+str(offset)+"&limit="+str(limit)
    # Setup and open the connection
    connection = httplib.HTTPConnection("api.booli.se")
    connection.request("GET", url)
    response = connection.getresponse()
    data = response.read()
    connection.close()
    
    if response.status != 200:
        print "fail"
    
    result = data
    
    result_pretty_json = json.loads(result)
    
    # Open the stream to write to a file
    target = open(filename, 'a')
    
    target.write(json.dumps(result_pretty_json, indent=4))
    #target.write(json.dumps(result_pretty_json, indent=4, sort_keys=True))
    #print result

    
    
# END of function
    
# First call -- Do a loop here and increase the offsets
callBooli(status_Sold,offset_ini, limit_ini);

# Preparing for the next call 
offset_ini = offset_ini + limit_ini;
time.sleep(sleeping_time);
    
    

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