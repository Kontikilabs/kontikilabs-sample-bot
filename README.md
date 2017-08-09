Required packages

	*	NodeJs
	*	npm
	*	ngrok (https://ngrok.com/download)

To build the project you need to run below command:

	*	npm install

To configure your project:

	*	Create your organisation/account from http://app.kontikilabs.com, and add the credentials i.e 'username' and 'password' into the kontikilabs-sample-bot/config.json file.

	*	Next, login to your organisation to create your bot by clicking on 'Add new bot'.

	* 	Once your bot is created, click on it to enter inside your bot dashboard.

	*	Click on the 'setting icon' present in the KTL platform header to copy your 'OrganisationId', 'BotId' and the 'Bot Name' into the config.json file.
		The bot name in the config.json file should be without any space or dot. for eg, if you name the bot as 'Demo Bot' in the KTL Platform, rename it as demo-bot in the file.

	*	Create a Facebook page(https://www.facebook.com/pages/create) for your users to interact with the bot. Once the page is created, copy the 'Page Id' from the 'About' tab and paste it into the config.json file.

	*   Create your Facebook developer account from : https://developers.facebook.com and proceed further by creating an App.

	*	Click 'Add Product' from the left navigation bar on your developer account.

	*	Select 'Set Up' option from the 'Messenger' box to generate the page token.

	*	Under the 'Token Generation' subheading, select your page from the drop-down menu and continue to see the generated token. Copy this token into the config.json file.

	*	In the config.json file add a 'verification_token' of your choice and save the file.

	*	Next, rename the file in lib/contents/demo-bot.json with <botname>.json, the <botname> should match with the name in the config.json file.

	*	Next, start your project with $ DEBUG=kontikilabs-sample-bot:* NODE_ENV=development npm start

	*   Now, go to the folder where your ngrok is, and from the terminal start ngrok for tunneling the server with the command:
		$ ./ngrok http -region eu 5000

	*	Pick the 'Forwarding URL' which will be like : https://112be1ed.eu.ngrok.io and append /webhook at the end, thus forming the result Callback URL like :
		https://112be1ed.eu.ngrok.io/webhook

	*   Now, go to the 'Messenger Product' option in your Facebook App and click on the 'Setup Webhooks' option, available just below the 'Token Generation' tab.

	*	Paste the Callback URL in the text box.

	*	Next, copy the 'Verify Token' that you added in the config.json file in the field 'verification_token'.

	*	Next, select the option 'messages' and 'messaging_postbacks' from the list of check buttons and click on 'Verify and Save' button.

	*	Facebook signals your webhook integration with 'Complete'. Next, from the same 'webhooks' section select your page via the drop-down and click on the 'Subscribe' button.

	*	Go to your Facebook page, and click on the 'Add a Button' option.

	*	Select 'Get in Touch' option from the list, and proceed further by opting 'Send Message'.

	*	Click on 'Add Button' to save the settings.

	*	Hover on the 'Send Message' button to select 'Test Button', and you can start the conversation.

	* 	Bot Greeting Text :	Hit the URL below to customize your bot by appending a greeting text.
					Add   :	http://localhost:5000/setgreetingtext

					Remove:	http://localhost:5000/removegreetingtext

	* 	Bot Get Started Button : Add a 'get started' button to your bot to make it more user friendly.
					Add   :	http://localhost:5000/setgetstartedbutton

					Remove:	http://localhost:5000/removegetstartedbutton

    * 	Bot Persistent Menu : Let your users access your website from the bot
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
