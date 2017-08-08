var EXPRESS = require('express');
var ROUTER 	= EXPRESS.Router();

var FBMESSAGE 		= require('../lib/fb-messages');
var THREADSETTING 	= require('./threadSettings');

/* GET home page. */
ROUTER.get('/', function(req, res, next) {
  res.render('index', { title: 'demo bot' });
});

// Routes
ROUTER.get('/webhook', FBMESSAGE.GetValidateToken);
ROUTER.post('/webhook', FBMESSAGE.GetFBMessage);

// Default actions for bot
ROUTER.get('/setgreetingtext', THREADSETTING.SetGreetingText);
ROUTER.get('/removegreetingtext', THREADSETTING.RemoveGreetingText);

ROUTER.get('/setgetstartedbutton', THREADSETTING.SetGetStartedButton);
ROUTER.get('/removegetstartedbutton', THREADSETTING.RemoveGetStartedButton);

ROUTER.get('/setpersistentmenu', THREADSETTING.SetPersistentMenu);
ROUTER.get('/removepersistentmenu', THREADSETTING.RemovePersistentMenu);

ROUTER.get('/setdomainwhitelist', THREADSETTING.SetDomainWhitelist);
ROUTER.get('/removedomainwhitelist', THREADSETTING.RemoveDomainWhitelist);

module.exports = ROUTER;