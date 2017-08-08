/**
  * @desc this file is for creating default text, get started button etc.
  * @required config.json
*/

'use strict'

var HTTP 			= require('request');
var CONFIG 			= require('../config.json');


/**
 * The Greeting Text is only rendered the first time the user interacts with a the Page on Messenger.
 */
exports.SetGreetingText = function(req, res) {
	var fbData = {
		"greeting": [
			{
				"locale": "default",
				"text": "Hi {{user_full_name}}, Welcome to the demo bot."
			}
		]
	}

	HTTP({
		url: CONFIG.facebook.facebook_url+'/me/messenger_profile',
		qs: {access_token: CONFIG.facebook.page_token},
		method: 'POST',
		json: fbData
	},function(error, response, body) {
		console.log('======SetGreetingText======',body);
		res.status(200).send(body);
	});
}


/**
 * Remove Greeting Text
 */
exports.RemoveGreetingText = function(req, res) {
	var fbData = {
		"fields": [
			"greeting"
		]
	}

	HTTP({
		url: CONFIG.facebook.facebook_url+'/me/messenger_profile',
		qs: {access_token: CONFIG.facebook.page_token},
		method: 'DELETE',
		json: fbData
	},function(error, response, body) {
		console.log('======RemoveGreetingText======',body);
		res.status(200).send(body);
	});
}


/**
 * The Welcome Screen can display a Get Started button.
 */
exports.SetGetStartedButton = function(req, res) {
	var fbData = {
		"get_started": {
			"payload":"GET_STARTED_BUTTON"
		}
	}

	HTTP({
		url: CONFIG.facebook.facebook_url+'/me/messenger_profile',
		qs: {access_token: CONFIG.facebook.page_token},
		method: 'POST',
		json: fbData
	},function(error, response, body) {
		console.log('======SetGetStartedButton======',body);
		res.status(200).send(body);
	});
}


/**
 * Remove Get Started Button
 */
exports.RemoveGetStartedButton = function(req, res) {
	var fbData = {
		"fields": [
			"get_started"
		]
	}

	HTTP({
		url: CONFIG.facebook.facebook_url+'/me/messenger_profile',
		qs: {access_token: CONFIG.facebook.page_token},
		method: 'DELETE',
		json: fbData
	},function(error, response, body) {
		console.log('======RemoveGetStartedButton======',body);
		res.status(200).send(body);
	});
}


/**
 * Set Persistent Menu for Bot
 */
exports.SetPersistentMenu = function(req, res) {
	var fbData = {
		"persistent_menu": [
			{
				"locale": "default",
				"composer_input_disabled": false,
				"call_to_actions": [
					{
						"type":"web_url",
						"title":"Powerwed By Kontikilabs",
						"url":"http://Kontikilabs.com",
						"webview_height_ratio":"full"
					}
				]
			}
		]
	}

	HTTP({
		url: CONFIG.facebook.facebook_url+'/me/messenger_profile',
		qs: {access_token: CONFIG.facebook.page_token},
		method: 'POST',
		json: fbData
	},function(error, response, body) {
		console.log('======SetPersistentMenu======',body);
		res.status(200).send(body);
	});
}


/**
 * Remove Persistent Menu from Bot
 */
exports.RemovePersistentMenu = function(req, res) {
	var fbData = {
		"fields": [
			"persistent_menu"
		]
	}

	HTTP({
		url: CONFIG.facebook.facebook_url+'/me/messenger_profile',
		qs: {access_token: CONFIG.facebook.page_token},
		method: 'DELETE',
		json: fbData
	},function(error, response, body) {
		console.log('======RemovePersistentMenu======',body);
		res.status(200).send(body);
	});
}


/**
 * Setting Domain Whitelist for Bot
 */
exports.SetDomainWhitelist = function(req, res) {
	var fbData = {
		"whitelisted_domains": [
			"https://8df9e60d.ngrok.io"
		]
	}

	HTTP({
		url: CONFIG.facebook.facebook_url+'/me/messenger_profile',
		qs: {access_token: CONFIG.facebook.page_token},
		method: 'POST',
		json: fbData
	},function(error, response, body) {
		console.log('======SetDomainWhitelist======',body);
		res.status(200).send(body);
	});
}


/**
 * Remove Domain from Whitelist in Bot
 */
exports.RemoveDomainWhitelist = function(req, res) {
	var fbData = {
		"fields": [
			"whitelisted_domains"
		]
	}

	HTTP({
		url: CONFIG.facebook.facebook_url+'/me/messenger_profile',
		qs: {access_token: CONFIG.facebook.page_token},
		method: 'DELETE',
		json: fbData
	},function(error, response, body) {
		console.log('======RemoveDomainWhitelist======',body);
		res.status(200).send(body);
	});
}