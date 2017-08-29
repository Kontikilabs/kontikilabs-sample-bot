# Bot Building with [Kon-Tiki Labs](http://kontikilabs.com)

This is a sample Messenger bot, which when paired with our [KTL platform](http://app.kontikilabs.com) will automatically conduct conversations 
with the bot users.

## Table of Contents

  - [Set up the Bot](#setup-the-bot)
    - [Prerequisites](#prerequisites)
    - [Bot Linking with the KTL Platform](#bot-linking-with-the-ktl-platform)
    - [The Facebook Requirements](#the-facebook-requirements)
      - [Your Bot Page](#your-bot-page)
      - [Facebook Developer Account](#facebook-developer-account)
      - [Start your Project](#start-your-project)
      - [Tunneling the Server](#tunneling-the-server)
    - [Testing the Sample Bot](#testing-the-sample-bot)
    - [Adding Features to your Bot](#adding-features-to-your-bot)
      - [Bot Greeting Text](#bot-greeting-text)
      - [Bot Get Started Button](#bot-get-started-button)
      - [Bot Persistent Menu](#bot-persistent-menu)
      - [Bot Domain Whitelist Menu](#bot-domain-whitelist-menu)
    - [To Start the Project](#to-start-the-project)
  - [Integrate Customised Conversational Experience](#integrate-customised-conversational-experience)
    - [Build Conversational Interface for your Bot](#build-conversational-interface-for-your-bot)
    - [Build Responses to User’s Request](#build-responses-to-users-request)
    - [Response for your Business Logic](#response-for-your-business-logic)
      - [Send Text](#send-text)
      - [Send Generic Template](#send-generic-template)
      - [Send Typing Action](#send-typing-action)
      
## Set up the Bot

### Prerequisites

Use the command below to clone the repository:
```
 git clone https://github.com/Kontikilabs/kontikilabs-sample-bot.git
```

To rename the project with the name of your choice and to remove the GIT reference use the following commands:

```
 mv kontikilabs-sample-bot your-folder-name
 cd your-folder-name/
 sudo rm -rf .git
```

Once you have cloned the sample project, you require the following 3 packages:

- NodeJs
- npm
- [ngrok](https://ngrok.com/download)

### Bot Linking with the KTL Platform

For building and managing the bot content, start with creating an **organisation/account** on our user-friendly 
[KTL platform](http://app.kontikilabs.com).

In order to link the KTL platform with the bot, add the platform credentials i.e the *'username' and 'password'* to the 
[config.json](https://github.com/Kontikilabs/kontikilabs-sample-bot/blob/master/config.json) file.

On successful login to the platform you will be redirected to a page which will allow you to **Add New Bot**. 
Once the bot is created you will be able to enter your bot dashboard.

KTL platform allows you to have multiple bots in a single organisation. So, how does the KTL platform content get linked to the sample bot?

Our sample bot is powered to handle this, you just need to add the **botId** of the desired bot in the *config.json* file, and the linking is 
done.

To get your **organisationId**, **botId** and the **bot name**, click on the 'setting icon' in the KTL platform header.

*The bot name in the config.json file should be without any space or dot. For example, if you name the bot as 'Demo Bot' in the KTL Platform, 
rename it as demo-bot in the config.json file.*

Your config.json file code will look like: 
```
"app": {
  "platform": "facebook",
  "bot": "<bot-name>"
},

"platformCredentials": {
   "username": "<platform_username>",
   "password": "<platform_password>",
   "organisationId": "<platform_organisation_Id>",
   "botId": "<platform_bot_Id>"
}
```
### The Facebook Requirements

#### Your Bot Page
Your bot will require a Facebook page through which the users will interact. [Create your Facebook page](https://www.facebook.com/pages/create)
and get the **Page Id** from the **About** tab. Pass this id in the ```page_id``` field of the *config.json* file.

#### Facebook Developer Account
The instructions below cover setting up your Facebook developer account:

1.  [Register for a developer account on Facebook](https://developers.facebook.com). 
2.  Create an App from your developer account.
3.  Click **Add Product** from the left navigation bar on your developer account.
4.  Select **Set Up** option from the *Messenger* box to generate the page token.
5.  Under the **Token Generation** subheading, select your page from the drop-down menu and continue to see the generated token. Pass this token in the ```page_token``` field of the *config.json* file.
6.  Next, in the *config.json file* add a **verification_token** of your choice and save the file.
7.  Next, rename the file [demo-bot.json](https://github.com/Kontikilabs/kontikilabs-sample-bot/blob/master/lib/contents) with *botname.json*. The *botname* should match the name in the *config.json* file.
   
Your code in the *config.json* file should look like:

```
"facebook": {
  "facebook_url": "https://graph.facebook.com/v2.7",
  "verification_token": "<webhook_verification_token>",
  "page_token": "<your_facebook_page_token>",
  "page_id": "<your_facebook_page_id>"
}
```
####  Start your Project
Once the above setup is done, start your project from the terminal with the command..

```DEBUG=kontikilabs-sample-bot:* NODE_ENV=development npm start```

If you want to change *kontikilabs-sample-bot* in the above command, then you need to change the below code snippet..

```var debug = require('debug')('kontikilabs-sample-bot:server')``` 

in the [www file](https://github.com/Kontikilabs/kontikilabs-sample-bot/blob/master/bin/www)

####  Tunneling the Server

Once you have started your project and downloaded ngrok, proceed by following the instructions below:

1.  Go to the folder where your ngrok resides, and from the terminal start ngrok for tunneling the server with the command:
    
    ```./ngrok http -region eu 5000```
    
2.  Pick the **Forwarding URL** which will look like : *https://112be1ed.eu.ngrok.io*.
    To the *Forwarding URL* append */webhook* at the end, thus forming the result Callback URL like :
    **https://112be1ed.eu.ngrok.io/webhook**
3.  Now, go to the *Messenger Product* option in your Facebook App and click on the **Setup Webhooks** option, available just below the *Token Generation* tab.
4.  Add this *Callback URL* in text box provided.
5.  Next, copy the **Verify Token** that you added in the ```verification_token``` field of the *config.json* file.
6.  Next, select the **messages** and **messaging_postbacks** options from the list of check boxes and click on *Verify and Save* button.
7.  Facebook signals your webhook integration with 'Complete'. Next, from the same *webhooks* section select your page via the drop-down and click on the *Subscribe* button.

###  Testing the Sample Bot
Once the entire setup is done you can test the bot from your Facebook page by following the steps below: 

1.  Go to your Facebook page, and click on the 'Add a Button' option.
2.  Select the 'Get in Touch' option from the list, and proceed further by opting 'Send Message'.
3.  Click on the 'Add Button' to save the settings.
4.  Hover on the 'Send Message' button to select the 'Test Button', and you can start the conversation.

###  Adding Features to your Bot
Our Sample Bot holds the ability to allow user customization and add other Facebook features to increase your customers' interaction level. 
For your ease we provide direct URLs which when hit on the browser **Adds** or **Removes** the feature. Check the doc below for all such features:

####  Bot Greeting Text
Hit the URL below to welcome your bot users with a greeting text.
 
Action        | URL
------------- | -------------
Add           | http://localhost:5000/setgreetingtext
Remove        | http://localhost:5000/removegreetingtext

####  Bot Get Started Button
Hit the URL below to add a 'get started' button to your bot to make it more user-friendly.
 
Action        | URL
------------- | -------------
Add           | http://localhost:5000/setgetstartedbutton
Remove        | http://localhost:5000/removegetstartedbutton

####  Bot Persistent Menu
Let your users access your website from the bot. To disable the input area change ```composer_input_disabled``` to *true* in the 
[threadSettings.js](https://github.com/Kontikilabs/kontikilabs-sample-bot/blob/master/routes/threadSettings.js) file.

Action        | URL
------------- | -------------
Add           | http://localhost:5000/setpersistentmenu
Remove        | http://localhost:5000/removepersistentmenu

####  Bot Domain Whitelist Menu
 
Action        | URL
------------- | -------------
Add           | http://localhost:5000/setdomainwhitelist
Remove        | http://localhost:5000/removedomainwhitelist


### To Start the Project

Environment   | Command
------------- | -------------
Development   | DEBUG=kontikilabs-sample-bot:* NODE_ENV=development npm start
Production    | DEBUG=kontikilabs-sample-bot:* NODE_ENV=production npm start

This completes the entire bot setup. Check the document below to see how you can enhance your bot.

##  Integrate Customised Conversational Experience

Artificial intelligence is the backbone of any chatbot. Each and every bot is judged by the amount of Machine Learning and the Natural 
Language Processing it holds.

An intelligent bot can say things and reply to what is demanded. Basically, it can talk to your users.

To make your chatbot appear intelligent, Kon-Tiki Labs has integrated [API.AI](https://api.ai) into the sample bot, but the scope for making the 
bot more intelligent should never die. 

In the document below we explain how you can enhance your bot to increase its intelligence level.

###  Build Conversational Interface for your Bot
Once you have configured the entire setup, you can get started by creating your account in [API.AI](https://console.api.ai/api-client/#/login).

After you have registered for the API.AI, proceed further by creating an **agent**, which will allow your bot to transform natural user requests
into actionable data. 

Once your agent is successfully created, you will be able to view your **Client access token** from the agent’s setting screen. 
Add this to your **kontikilabs-sample-bot** project by passing it in the ```apiai_client_key``` field of the 
[botname.json](https://github.com/Kontikilabs/kontikilabs-sample-bot/tree/master/lib/contents) file .

Your code block will be like:
```
{
	"apiai_client_key": "<my_apiai_client_access_token>",

}
```
###  Build Responses to User’s Request
How will your bot handle the user’s query? API.AI manages this with **intents**, which act as a mapping between what a user says and what action 
should be taken by your bot.

Proceed by adding new intents to your bot.
The trick here is that the name of the file you create inside the *intents folder* should be same as the *intent name* you create in API.AI. 

*For example, my **greeting** intent in the api.ai will trigger the exact name of the script file i.e 
[**greeting.js**](https://github.com/Kontikilabs/kontikilabs-sample-bot/tree/master/lib/intents/greeting.js) in your project.*

The code below covers setting up greeting scenarios like ‘hi’, ‘hello’ etc. 

```
var LOCALSTORAGE = require('../datasources/localStorage');

exports.intent = function(input JSON, object, intent Response) {
var localStorage Data = {
		senderId: inputJSON.senderId,
		topic: 'GREETING',
		text: inputJSON.text,
		platform: inputJSON.platform,
		bot: inputJSON.bot
	};
	LOCALSTORAGE.SaveUserConversation(localStorageData, function(localMemorycb) {
		/*write your business logic here*/
	});
};
```

###  Response for your Business Logic

You can include the following business logic in the code above :

#####  Send Text

```
SENDRESPONSE.SendText(inputJSON, 'your_text_here', function() {
});
```
#####  Send Generic Template

```
SENDRESPONSE.SendGenericTemplate(inputJSON, 'your_generic_template_here', function() {
});
```

#####  Send Typing Action

```
SENDRESPONSE.SendTypingAction(inputJSON, 'your_action_here', function() {
});
```
