Required packages
	
	*	NodeJs
	*	npm
	*	ngrok (https://ngrok.com/download)

To build the project you need to run below command:

	*	npm install

To configure your project:
	
	*	Create your organization/account from http://app.kontikilabs.com

	*	Next, login to your organization to create your bot by clicking on 'Add new bot'.

	* 	Save the 'organisationId' and the 'botId', for further use.

	*	Create a Facebook page(https://www.facebook.com/pages/create) for your users to interact with the bot. Once, the page is created, save the 'Page Id' from the 'About' 
		tab of the page for further use.

	*   Create your Facebook developer account from : https://developers.facebook.com and proceed further by creating an App.

	*	Click 'Add Product' from the left navigation bar on your developer account.

	*	Select 'Set Up' option from the 'Messenger' box to generate the page token.

	*	Under the 'Token Generation' subheading, select your page from the drop-down menu and continue to see the generated token. Save this token for further use.

	*   Next, click on the 'Setup Webhooks' option, available just below the 'Token Generation' tab.

	*   To setup the 'Callback URL', go to the folder where your ngrok is, and from the terminal start ngrok for tunneling the server with the command 
		$ ./ngrok http -region eu 5000

	*	Pick the 'Forwarding URL' which will be like : https://112be1ed.eu.ngrok.io and append /webhook at the end, thus forming the result URL like :  
		https://112be1ed.eu.ngrok.io/webhook

	*	Opt a name for the 'Verify Token' and note it for further use. Let's name it as : this_is_demo_bot

	*	Next, select the option 'messages' and 'messaging_postbacks' from the list of check buttons and click on 'Verify and Save' button.

	*	Facebook signals your webhook integration with 'Complete'. Next, from the same 'webhooks' section select your page via the drop-down and click on the 'Subscribe' 	
		button.

	*	Now, go to the cloned demo-bot project, and open the 'config.json' file to paste the noted 'verification_token', 'page_token', 'page_id', platform 'username', 'password','organisationId', 'botId', and the 'bot' (bot name, here it is demo-bot).

	* 	Next, rename the file in lib/content/demo-bot.json with <botname>.json

	*	Start your project with $ DEBUG=kontikilabs-sample-bot:* NODE_ENV=development npm start

	*	Go to your Facebook page, and click on the 'Add a Button' option.

	*	Select 'Get in Touch' option from the list, and proceed further by opting 'Send Message'.

	*	Click on 'Add Button' to save the settings.

	*	Hover on the 'Send Message' button to select 'Test Button', and you can start the conversation.

	* 	Bot Greeting Text :	Hit the URL below to customize you bot by appending a greeting text.
					Add   :	http://localhost:5000/setgreetingtext

					Remove:	http://localhost:5000/removegreetingtext


	* 	Bot Get Started Button : Add a 'get started' button to your bot to make it more user friendly.
					Add   :	http://localhost:5000/setgetstartedbutton

					Remove:	http://localhost:5000/removegetstartedbutton

    * 	Bot Persistand Menu : Let your users access your website from the bot
					Add   :	http://localhost:5000/setpersistentmenu : To disable the input area change "composer_input_disabled" to true in the threadSettings.js file, present in the routes folder.

					Remove:	http://localhost:5000/removepersistentmenu

    * 	Bot Domin Whitelist Menu :
					Add   :	http://localhost:5000/setdomainwhitelist

					Remove:	http://localhost:5000/removedomainwhitelist

To Start the project
	
	For Development

	*	DEBUG=kontikilabs-sample-bot:* NODE_ENV=development npm start

	For Production

	*	DEBUG=kontikilabs-sample-bot:* NODE_ENV=production npm start