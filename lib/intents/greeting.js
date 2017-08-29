/**
  * @desc handling greeting scenarios like "hi", "hello", etc.
*/ 

'use strict'

var LOCALSTORAGE 		= require('../datasources/localStorage');
// var CONFIG 				= require('../../config.json');
var SENDRESPONSE 		= require('../datasources/sendResponseToPlatform');

exports.intent = function(inputJSON, object, intentResponse) {
	console.log('came to GREETING intent');

	// var CONTENT = require('../contents/' + inputJSON.bot + '.json');

	var localStorageData = {
		senderId: inputJSON.senderId,
		topic: 'GREETING',
		text: inputJSON.text,
		platform: inputJSON.platform,
		bot: inputJSON.bot
	};

	LOCALSTORAGE.SaveUserConversation(localStorageData, function(localMemorycb) {
		var text = object.result.fulfillment.speech;
		SENDRESPONSE.SendText(inputJSON, text, function() {
		});

		intentResponse({});
	});
};
