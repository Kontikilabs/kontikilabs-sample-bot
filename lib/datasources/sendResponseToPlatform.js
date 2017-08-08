/**
  * @desc send response on basis of platform
  * @author Anurag Mishra anuraagmishra92@gmail.com
  * @required config.json
*/

'use strict';

var HTTP 	= require('request');
var FB_API 	= require('../datasources/fbApi');
var CONFIG 	= require('../../config.json');

exports.SendText = function(inputJSON, textArray, cb) {
	console.log('====textArray====', textArray);
	if (Array.isArray(textArray) === false) {
		var text = [];
		text.push(textArray);
		textArray = text;
	}

	switch (inputJSON.platform) {
		case 'facebook':
			FB_API.EVENTS.SendTextMessage(inputJSON.senderId, textArray[0], function(genericTemplateResponse) {
				cb();
			});

			break;

		default:
			cb();
			break;
	}
}

exports.SendGenericTemplate = function(inputJSON, template, cb) {
	switch (inputJSON.platform) {
		case 'facebook':
			FB_API.EVENTS.SendGenericTemplate(inputJSON.senderId, template, function(genericTemplateResponse) {
				cb();
			});

			break;

		default:
			cb();
			break;
	}
}

exports.SendTypingAction = function(inputJSON, action, cb) {

	switch (inputJSON.platform) {
		case 'facebook':
			FB_API.EVENTS.SenderAction(inputJSON.senderId, action);
			cb();
			break;

		default:
			cb();
			break;
	}
}
