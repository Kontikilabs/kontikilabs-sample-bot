/**
  * @desc In this all messenger API is written which is used from whole project
  * @author Anurag Mishra anuraagmishra92@gmail.com
  * @required config.json
*/

'use strict'

var HTTP 		= require('request');
var CONFIG 		= require('../../config.json');
var BOTMETRICS 	= require('node-botmetrics')(CONFIG.botmetrics).facebook;


exports.EVENTS = {

	/**
	 * Send Action to messenger bot like mark_seen, typing_on and typing_off
	 */
	SenderAction: function(userId, action) {
		var fbData = {
			recipient: {id: userId},
			sender_action: action
		}

		HTTP({
			url: CONFIG.facebook.facebook_url+'/me/messages',
			qs: {access_token: CONFIG.facebook.page_token},
			method: 'POST',
			json: fbData
		}, function(error, response, body) {
			if (error) {
				console.log('Error sending message: ', error);
			} else if (response.body.error) {
				console.log('Error: SenderAction===', response.body.error);
			} else {
				console.log("===Success==SenderAction=");
				// BOTMETRICS.trackOutgoing(fbData);
			}
		});
	},


	/**
	 * Send text message to the bot
	 */
	SendTextMessage: function(userId, text, cb) {
		var fbData = {
			recipient: {id: userId},
			message: {
				text: text
			}
		}

		HTTP({
			url: CONFIG.facebook.facebook_url+'/me/messages',
			qs: {access_token: CONFIG.facebook.page_token},
			method: 'POST',
			json: fbData
		}, function(error, response, body) {
			if (error) {
				console.log('Error sending message: ', error);
				cb();
			} else if (response.body.error) {
				console.log('Error: SendTextMessage===', response.body.error);
				cb();
			} else {
				console.log("===Success=SendTextMessage==");
				// BOTMETRICS.trackOutgoing(fbData);
				cb();
			}
		});
	},


	/**
	 * Send generic template to the bot
	 */
	SendGenericTemplate: function(userId, elements, cb) {
		var fbData = {
			recipient: {id: userId},
			message: {
				"attachment": {
					"type": "template",
					"payload": {
						"template_type": "generic",
						"elements": elements
					}
				}
			}
		}

		HTTP({
			url: CONFIG.facebook.facebook_url+'/me/messages',
			qs: {access_token: CONFIG.facebook.page_token},
			method: 'POST',
			json: fbData
		}, function(error, response, body) {
			if (error) {
				console.log('Error sending message: ', error);
				cb();
			} else if (response.body.error) {
				console.log('Error: SendGenericTemplate===', response.body.error);
				cb();
			} else {
				console.log("===Success==SendGenericTemplate=");
				// BOTMETRICS.trackOutgoing(fbData);
				cb();
			}
		});
	},


	/**
	 * Send button template to the bot
	 */
	SendButtonTemplate: function(userId, text, buttons, cb) {
		var fbData = {
			recipient: {id: userId},
			message: {
				"attachment": {
					"type": "template",
					"payload": {
						"template_type": "button",
						"text": text,
						"buttons": buttons
					}
				}
			}
		}

		HTTP({
			url: CONFIG.facebook.facebook_url+'/me/messages',
			qs: {access_token: CONFIG.facebook.page_token},
			method: 'POST',
			json: fbData
		}, function(error, response, body) {
			if (error) {
				console.log('Error sending message: ', error);
				cb();
			} else if (response.body.error) {
				console.log('Error: SendButtonTemplate===', response.body.error);
				cb();
			} else {
				console.log("===Success==SendButtonTemplate=");
				// BOTMETRICS.trackOutgoing(fbData);
				cb();
			}
		});
	},


	/**
	 * Send quick reply button message to the bot
	 */
	SendQuickReplyMessage: function(userId, text, quickReplyButtons, cb) {
		var fbData = {
			recipient: {id: userId},
			message: {
				"text": text,
				"quick_replies": quickReplyButtons
			}
		}

		HTTP({
			url: CONFIG.facebook.facebook_url+'/me/messages',
			qs: {access_token: CONFIG.facebook.page_token},
			method: 'POST',
			json: fbData
		}, function(error, response, body) {
			if (error) {
				console.log('Error sending message: ', error);
				cb();
			} else if (response.body.error) {
				console.log('Error: ====SendQuickReplyMessage===', response.body.error);
				cb();
			} else {
				console.log("===Success===SendQuickReplyMessage====");
				// BOTMETRICS.trackOutgoing(fbData);
				cb();
			}
		});
	},


	/**
	 * Send media(image, audio, video) message to the bot
	 */
	SendMediaMessage: function(userId, data, cb) {
		console.log('===SendMediaMessage===data===', data);
		var fbData = {
			recipient: {id: userId},
			message: {
				"attachment": {
					"type": data.type,
					"payload": {
						"url": data.url
					}
				}
			}
		}

		HTTP({
			url: CONFIG.facebook.facebook_url+'/me/messages',
			qs: {access_token: CONFIG.facebook.page_token},
			method: 'POST',
			json: fbData
		}, function(error, response, body) {
			if (error) {
				console.log('Error sending message: ', error);
				cb();
			} else if (response.body.error) {
				console.log('Error: SendMediaMessage======', response.body.error);
				cb();
			} else {
				console.log("===Success===SendMediaMessage====");
				// BOTMETRICS.trackOutgoing(fbData);
				cb();
			}
		});
	},


	/**
	 * Send list message to the bot
	 */
	SendListTemplate: function(userId, elements, cb) {
		var fbData = {
			recipient: {id: userId},
			message: {
				"attachment": {
					"type": "template",
					"payload": {
						"template_type": "list",
						//"top_element_style": "compact",
						"elements": elements
					}
				}
			}
		}

		HTTP({
			url: CONFIG.facebook.facebook_url+'/me/messages',
			qs: {access_token: CONFIG.facebook.page_token},
			method: 'POST',
			json: fbData
		}, function(error, response, body) {
			if (error) {
				console.log('Error sending message: ', error);
				cb();
			} else if (response.body.error) {
				console.log('Error: SendListTemplate=====', response.body.error);
				cb();
			} else {
				console.log("===Success===SendListTemplate====");
				// BOTMETRICS.trackOutgoing(fbData);
				cb();
			}
		});
	},


	/**
	 * Get user profile detail from facebook
	 */
	GetProfileDetail: function(userId, cb) {
		HTTP({
			url: CONFIG.facebook.facebook_url+'/'+userId,
			qs: {access_token: CONFIG.facebook.page_token, fields: 'first_name,last_name,profile_pic,gender,locale,timezone'},
			method: 'GET',
			json: true
		}, function(error, response, body) {
			if (error) {
				console.log('Error sending message: ', error);
				cb();
			} else if (response.body.error) {
				console.log('Error: GetProfileDetail=====', response.body.error);
				cb();
			} else {
				console.log("===Success===GetProfileDetail===",body);
				cb(body);
			}
		});
	}
}