'use strict'

var BACKEND_API 		= require('../datasources/backendApi');
var PLATFORMTEMPLATE 	= require('../datasources/platformTemplate');
var LOCALSTORAGE 		= require('../datasources/localStorage');
var CONFIG 				= require('../../config.json');
var SENDRESPONSE 		= require('../datasources/sendResponseToPlatform');

exports.intent = function(inputJSON, object, intentResponse) {
	console.log('came to STORY intent');

	 var CONTENT = require('../contents/' + inputJSON.bot + '.json');

	/*
		json to save conversation in localstorage
	*/

	var localStorageData = {
		senderId: inputJSON.senderId,
		topic: 'STORY',
		text: inputJSON.text,
		platform: inputJSON.platform,
		bot: inputJSON.bot
	};

	LOCALSTORAGE.SaveUserConversation(localStorageData, function(localMemorycb) {
		var text = object.result.fulfillment.speech;
		// send text if required paramater is not fullfilled
		if (object.result.actionIncomplete) {
			SENDRESPONSE.SendText(inputJSON, text, function() {});
		} else {
			BACKEND_API.EVENTS.UserLogin(function(access_token) {    // to get access token from backend
				var filter = {
					"where": {
						"bot_id": CONFIG.platformCredentials.botId,
						"status": "publish"
					}
				}
				BACKEND_API.EVENTS.GetFilteredData('flakes', filter, access_token, function(data) {     // get stories json from backend
					if (data.items.length > 0) {
						SENDRESPONSE.SendText(inputJSON, text, function() {
							PLATFORMTEMPLATE.CreateGenericTemplate(data.items, inputJSON, function(template){   // to create generic template of stories
								SENDRESPONSE.SendGenericTemplate(inputJSON, template, function() {    // to send generic template of stories
								});
							});
						});
					} else {
						SENDRESPONSE.SendText(inputJSON, 'No stories available', function() {});
					}
				});
			});
		}

		intentResponse({});
	});
};
