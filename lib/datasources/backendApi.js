/**
  * @desc this file is to interact with backend
  * @author Anurag Mishra anuraagmishra92@gmail.com
  * @required config.json
*/

'use strict'

var HTTP 	= require('request');
var CONFIG 	= require('../../config.json');


exports.EVENTS = {

	/**
	 * Get Login for Access Token of user from backend
	 */
	UserLogin: function(cb) {
		var loginData = {
			username: CONFIG.platformCredentials.username,
			password: CONFIG.platformCredentials.password
		}

		HTTP({
			url: CONFIG.backend_api_url+'/users/login',
			method: 'POST',
			json: loginData
		},function(error, response, body) {
			console.log('======UserLogin======');
			cb(body.id);
		});
	},


	/**
	 * User logout from backend
	 */
	UserLogout: function(access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/users/logout?access_token='+access_token,
			method: 'POST'
		},function(error, response, body) {
			console.log('======UserLogout====');
			cb();
		});
	},


	/**
	 * Create user in backend
	 */
	CreateUser: function(userData, access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/users?access_token='+access_token,
			method: 'POST',
			json: userData
		},function(error, response, userCreatedData) {
			console.log('======CreateUser===DONE=====');
			cb(userCreatedData);
		});
	},


	/**
	 * Update user in backend
	 */
	UpdateUser: function(userId, userData, access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/users/'+userId+'?access_token='+access_token,
			method: 'PATCH',
			json: userData
		},function(error, response, userUpdatedData) {
			console.log('======UpdateUser===DONE=====');
			cb(userUpdatedData);
		});
	},


	/**
	 * Get user detail from backend
	 */
	GetUserDetail: function(senderId, access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/users?access_token='+access_token+'&filter={"where":{"senderId":"'+parseInt(senderId)+'"}}',
			method: 'GET',
			json: true
		},function(error, response, userDetail) {
			console.log('======GetUserDetail==DONE====');
			cb(userDetail);
		});
	},


	/**
	 * Get user detail using id from backend
	 */
	GetUserDetailUsingId: function(id, access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/users/'+id+'?access_token='+access_token,
			method: 'GET',
			json: true
		},function(error, response, userDetail) {
			console.log('======GetUserDetail==DONE====');
			cb(userDetail);
		});
	},


	/**
	 * Get user list from backend
	 */
	GetUserList: function(access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/users?access_token='+access_token,
			method: 'GET',
			json: true
		},function(error, response, userList) {
			console.log('======GetUserList==DONE====');
			cb(userList);
		});
	},


	/**
	 * Create model in backend
	 */
	CreateModelRecord: function(model, postData, access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/'+model+'?access_token='+access_token,
			method: 'POST',
			json: postData
		},function(error, response, modelCreatedData) {
			console.log('======CreateModel==DONE====');
			cb(modelCreatedData);
		});
	},


	/**
	 * Update model in backend
	 */
	UpdateModelRecord: function(modelId, model, postData, access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/'+model+'/'+modelId+'?access_token='+access_token,
			method: 'PATCH',
			json: postData
		},function(error, response, modelUpdatedData) {
			console.log('======UpdateModel==DONE====');
			cb(modelUpdatedData);
		});
	},


	/**
	 * Get detail of model from backend
	 */
	GetModelRecordDetail: function(modelId, model, access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/'+model+'/'+modelId+'?access_token='+access_token,
			method: 'GET',
			json: true
		},function(error, response, modelDetail) {
			console.log('======GetModelDetail==DONE====');
			cb(modelDetail);
		});
	},


	/**
	 * Get model list from backend
	 */
	GetModelRecordList: function(model, access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/'+model+'?filter={"order": "createdAt DESC", "limit": 4}&access_token='+access_token,
			method: 'GET',
			json: true
		},function(error, response, modelList) {
			console.log('======GetModelList==DONE====');
			cb(modelList);
		});
	},


	/**
	 * Get data from Elasticsearch
	 */
	GetDataFromES: function(esData, access_token, cb) {
		HTTP({
			url: CONFIG.backend_api_url+'/flakes/getdatafromes?access_token=' + access_token,
			method: 'POST',
			json: esData
		},function(error, response, body) {
			if(body && body.status === "success") {
				cb(body.data);
			} else {
				cb({"items": []});
			}
		});
	}
}