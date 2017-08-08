/**
  * @desc handling fall back scenarios
*/

'use strict'

var BACKEND_API 		= require('../datasources/backendApi');
var FB_API 				= require('../datasources/fbApi');
var PLATFORMTEMPLATE 	= require('../datasources/platformTemplate');
var LOCALSTORAGE 		= require('../datasources/localStorage');
var CONFIG 				= require('../../config.json');
var SENDRESPOSNE 		= require('../datasources/sendResponseToPlatform');

exports.intent = function(inputJSON, object, intentResponse) {
	console.log('came to FALLBACK intent');

	var CONTENT = require('../contents/' + inputJSON.bot + '.json');

	var localStorageData = {
		senderId: inputJSON.senderId,
		topic: 'FALLBACK',
		text: inputJSON.text,
		platform: inputJSON.platform,
		bot: inputJSON.bot
	};

	LOCALSTORAGE.SaveUserConversation(localStorageData, function(localMemorycb) {
		var text = CONTENT.fallback_message;
		if (object.result) {
			var text = object.result.fulfillment.speech;
		}

		SENDRESPOSNE.SendText(inputJSON, text, function() {
		});

		intentResponse({});
	});
};
