/**
  * @desc This file is for handling api.ai calls and manipulate with their result
  * @author Anurag Mishra anuraagmishra92@gmail.com
  * @required config.json
*/

'use strict';

var APIAI 	= require('apiai');

/**
 * Call recast API to get the intent name and other entities
 */
exports.CallAI = function(inputJSON, apiaiCb) {
	console.log('Came into APIAI', inputJSON);

	var CONTENT = require('../contents/' + inputJSON.bot + '.json');

	var CLIENT = APIAI(CONTENT.apiai_client_key);

	var options = {
		sessionId: inputJSON.senderId
	}

	var request = CLIENT.textRequest(inputJSON.text, options);

	request.on('response', function(response) {
		console.log('====aiObject====', JSON.stringify(response));
		apiaiCb(response.result);
	});

	request.on('error', function(error) {
		apiaiCb(response);
	});

	request.end();
};