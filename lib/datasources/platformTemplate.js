/**
  * @desc this file will create template as per platform
  * @author Anurag Mishra anuraagmishra92@gmail.com
  * @required backendApi.js
*/

'use strict'

var BACKEND_API = require('./backendApi');
var CONFIG 		= require('../../config.json');


/*
	generic template format
*/

exports.CreateGenericTemplate = function(data, inputJSON, templateCb) {
	var CONTENT = require('../contents/'+inputJSON.bot+'.json');

	var templates = [];
	for(var i = 0; i < data.length; i++) {
		var json = {
			"title": data[i].title,
			"subtitle": data[i].description,
			"image_url": data[i].image_url || CONFIG.default_image_url,
			"buttons": [
				{
					"title": "Visit our website",
					"type": "web_url",
					"url": "http://kontikilabs.com",
					"webview_height_ratio": "tall"
				}
			]
		}
		templates.push(json);
	}

	templateCb(templates);
}

/*
	Quick reply format
*/

exports.CreateQuickReply = function(inputJSON, templateCb) {
	var CONTENT = require('../contents/'+inputJSON.bot+'.json');

	var templates = [
		{
			"title": "QR message",
			"buttons": [
				{
					"title": "button_title_1",
					"type": "postback",
					"payload": "USER_DEFINED_PAYLOAD"
				},
				{
					"title": "button_title_1",
					"type": "postback",
					"payload": "USER_DEFINED_PAYLOAD"
				}
			]
		}
	];

	templateCb(templates);
}