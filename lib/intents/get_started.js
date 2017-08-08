/**
  * @desc handling Signup of user to the database
*/ 

'use strict'

var BACKEND_API 		= require('../datasources/backendApi');
var PLATFORMTEMPLATE 	= require('../datasources/platformTemplate');
var LOCALSTORAGE 		= require('../datasources/localStorage');
var CONFIG 				= require('../../config.json');
var SENDRESPOSNE 		= require('../datasources/sendResponseToPlatform');

exports.intent = function(inputJSON, object, intentResponse) {
	console.log('came to GET_STARTED intent');

	var CONTENT = require('../contents/' + inputJSON.bot + '.json');

	/*
		json to save conversation in localstorage
	*/

	var localStorageData = {
		senderId: inputJSON.senderId,
		topic: 'GET_STARTED',
		text: inputJSON.text,
		platform: inputJSON.platform,
		bot: inputJSON.bot
	};

	BACKEND_API.EVENTS.UserLogin(function(access_token) { // To get access token from backend
		BACKEND_API.EVENTS.GetUserDetail(inputJSON.senderId, access_token, function(userDetail) { // get User details
			LOCALSTORAGE.SaveUserConversation(localStorageData, function(localMemorycb) {
				if(userDetail.length > 0) {    	// condition if user exist in database
					var userData = userDetail[0];

					var welcomeResponseText = CONTENT.get_started.message1 + userData.firstName + ', ' + CONTENT.get_started.message2;

					BACKEND_API.EVENTS.UserLogout(access_token, function(logout) {
						inputJSON.userId = userData.id;

						/*
							code to send messages to user 
						*/
						SENDRESPOSNE.SendText(inputJSON, welcomeResponseText, function() {
							SENDRESPOSNE.SendTypingAction(inputJSON, 'typing_on', function(){
								setTimeout(function() {
									SENDRESPOSNE.SendText(inputJSON, CONTENT.get_started.message3, function() {
										SENDRESPOSNE.SendTypingAction(inputJSON.senderId, 'typing_on', function(){
											setTimeout(function() {
												SENDRESPOSNE.SendText(inputJSON, CONTENT.get_started.message4, function() {
												});
											}, CONFIG.timer); // included timer to give delay in back to back messages
										});	
									});
								}, CONFIG.timer);
							});	
						});
					});
				} else {	// else condition if user doesn't exist in database then create new user in backend
					var userData = inputJSON;
					delete userData.text;
					delete userData.payload;
					delete userData.isSetIntent;
					delete userData.referral;
					userData.role = 'customer';
					userData.password = 'password';
					if(!inputJSON.username) {
						userData.username = inputJSON.senderId;
					}
					if(!inputJSON.email) {
						userData.email = inputJSON.senderId+'@'+inputJSON.bot+'.com';
					}

					var welcomeResponseText = CONTENT.get_started.message1 + userData.firstName + ', ' + CONTENT.get_started.message2;

					BACKEND_API.EVENTS.CreateUser(userData, access_token, function(userCreatedData) {	// hit api to create User in backend
						BACKEND_API.EVENTS.UserLogout(access_token, function(logout) {
							inputJSON.userId = userCreatedData.id;

							/*
								code to send messages to user 
							*/

							SENDRESPOSNE.SendText(inputJSON, welcomeResponseText, function() {
								SENDRESPOSNE.SendTypingAction(inputJSON, 'typing_on', function(){
									setTimeout(function() {
										SENDRESPOSNE.SendText(inputJSON, CONTENT.get_started.message3, function() {
											SENDRESPOSNE.SendTypingAction(inputJSON.senderId, 'typing_on', function(){
												setTimeout(function() {
													SENDRESPOSNE.SendText(inputJSON, CONTENT.get_started.message4, function() {
													});
												}, CONFIG.timer); // included timer to give delay in back to back messages
											});	
										});
									}, CONFIG.timer);
								});	
							});
						});
					});
				}

				intentResponse({});
			});
		});
	});
};