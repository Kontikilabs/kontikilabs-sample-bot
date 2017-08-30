/**
  * @desc this file is for interaction between the Bot and Facebook
  * @required fbApi.js and config.json
*/

'use strict'

var CONFIG 				= require('../config.json');
var FB_API 				= require('./datasources/fbApi.js');
var API 				= require('../routes/controller.js');
var LOCALSTORAGE 		= require('./datasources/localStorage');
var BOTMETRICS 			= require('node-botmetrics')(CONFIG.botmetrics).facebook;
var MOMENT 				= require('moment');


/**
 * Validate token for facebook
 */
exports.GetValidateToken = function(req, res) {
	if(req.query['hub.verify_token'] === CONFIG.facebook.verification_token) {
		return res.status(200).send(req.query['hub.challenge']);
	} else {
		res.status(500).send({"status": "error", "responseMessage": "Wrong verification token."});
	}
};

/**
 * Get info from Facebook webhook
 */
exports.GetFBMessage = function(req, res) {
	// BOTMETRICS.trackIncoming(req.body);

	var data = req.body;
	if (data.object === 'page') {
		data.entry.forEach(function(entry) {
			var pageID = entry.id;

			// Iterate over each messaging event
			entry.messaging.forEach(function(event) {
				FB_API.EVENTS.SenderAction(event.sender.id, 'mark_seen');
				console.log('=======event========',JSON.stringify(event));
				if (event.message && event.message.text && !event.message.quick_reply) {
					ReceivedTextMessage(event);
				} else if(event.message && event.message.quick_reply) {
					ReceivedQuickReplyMessage(event);
				} else if(event.postback) {
					ReceivedPostbackMessage(event);
				} else if(event.referral && event.referral.ref) {
					ReferralLinkTriggered(event);
				} else {
					console.log("Webhook received unknown event: ", event);
				}
			});
		});
		res.sendStatus(200);
	}
};


/**
 * Received text message from bot's user
 */
function ReceivedTextMessage(event) {
	console.log('========ReceivedTextMessage============');
	FB_API.EVENTS.SenderAction(event.sender.id, 'typing_on');
	var inputJSON = {
		text: event.message.text,
		senderId: event.sender.id,
		platform: CONFIG.app.platform,
		bot: CONFIG.app.bot,
		payload: null,
		isSetIntent: false
	};
	API.UserInteraction(inputJSON, function(response) {
		return;
	});
}


/**
 * Received quick reply message from bot's user
 */
function ReceivedQuickReplyMessage(event) {
	console.log('========ReceivedQuickReplyMessage============');
	FB_API.EVENTS.SenderAction(event.sender.id, 'typing_on');
	switch(event.message.quick_reply.payload) {
		case 'GET_STARTED_BUTTON':
			GetStartedButtonCallback(event);
			break;
		default:
			var inputJSON = {
				text: event.message.text,
				senderId: event.sender.id,
				platform: CONFIG.app.platform,
				bot: CONFIG.app.bot,
				payload: event.message.quick_reply.payload,
				isSetIntent: true
			};
			API.UserInteraction(inputJSON, function(response) {
				return;
			});
	}
}


/**
 * Received postback message from bot's user
 */
function ReceivedPostbackMessage(event) {
	console.log('========ReceivedPostbackMessage============');
	FB_API.EVENTS.SenderAction(event.sender.id, 'typing_on');
	switch(event.postback.payload) {
		case 'GET_STARTED_BUTTON':
			GetStartedButtonCallback(event);
			break;
		default:
			var inputJSON = {
				text: null,
				senderId: event.sender.id,
				platform: CONFIG.app.platform,
				bot: CONFIG.app.bot,
				payload: event.postback.payload,
				isSetIntent: true
			};
			API.UserInteraction(inputJSON, function(response) {
				return;
			});
		
	}
}


/**
 * Callback on get started button
 */
function GetStartedButtonCallback(event) {
	console.log('========GetStartedButtonCallback============');
	FB_API.EVENTS.GetProfileDetail(event.sender.id, function(facebookUserDetail) {
		var inputJSON = {
			text: null,
			senderId: event.sender.id,
			firstName: facebookUserDetail.first_name,
			lastName: facebookUserDetail.last_name,
			profilePic: facebookUserDetail.profile_pic,
			gender: facebookUserDetail.gender,
			locale: facebookUserDetail.locale,
			timezone: facebookUserDetail.timezone,
			platform: CONFIG.app.platform,
			bot: CONFIG.app.bot,
			bot_id: CONFIG.platformCredentials.botId,
			organisation_id: CONFIG.platformCredentials.organisationId,
			payload: 'get_started',
			isSetIntent: true,
			referral: false
		}

		if(event.postback.referral) {
			inputJSON.referral = true;
			inputJSON.refParam = event.postback.referral.ref;
		}

		API.UserInteraction(inputJSON, function(response) {
			return;
		});
	});
}