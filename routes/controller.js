/**
  * @desc the call comes in this file to manipulate the response
  * @author Anurag Mishra anuraagmishra92@gmail.com
  * @required localStorage.js and recastai.js
*/

'use strict';

var FS 				= require('fs');
var LOCALSTORAGE 	= require('../lib/datasources/localStorage');
var BACKEND_API 	= require('../lib/datasources/backendApi');
var APIAI 			= require('../lib/intentParsers/apiai');

/**
 * User interaction with bot
 */
exports.UserInteraction = function(inputJSON, callback) {
	console.log('======inputJSON=====', inputJSON);
	if (!inputJSON.platform || !inputJSON.senderId || !inputJSON.bot) {
		callback({status: 'error', message: 'Objects platform, senderId and bot are required.'});
	} else {
		var INTENT;
		if (inputJSON.isSetIntent) {
			var object = {
				intent: inputJSON.payload
			}
			console.log('=======Code goes here=======');

			CheckFileExists(inputJSON, object, function(response) {
				callback(response);
			});
		} else {			
			APIAI.CallAI(inputJSON, function(aiResult) {
				var aiObject = {};

				if (aiResult.metadata && Object.keys(aiResult.metadata).length > 0) {
					aiObject.intent = aiResult.metadata.intentName;
				} else {
					aiObject.intent = 'fallback';
				}

				aiObject.result = {
					actionIncomplete: aiResult.actionIncomplete,
					params: aiResult.parameters,
					fulfillment: aiResult.fulfillment
				}

				CheckFileExists(inputJSON, aiObject, function(response) {
					callback(response);
				});
			});
		}
	}
};

/**
 * Check intent file is exists or not, if exist send the call to that file otherwise manipulate the call here itself
 */
function CheckFileExists(inputJSON, aiObject, fileCb) {
	FS.exists('lib/intents/' + aiObject.intent + '.js', function(exists) {
		if (exists) {
			var INTENT = require('../lib/intents/' + aiObject.intent);
			INTENT.intent(inputJSON, aiObject, function(intentResponse) {
				fileCb(intentResponse);
			});
		} else {
			var FALLBACKHANDLER = require('../lib/intents/fallback');
			FALLBACKHANDLER.intent(inputJSON, aiObject, function(intentResponse) {
				fileCb(intentResponse);
			});
		}
	});
}