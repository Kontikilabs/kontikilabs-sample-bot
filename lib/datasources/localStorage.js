/**
  * @desc this file is to save conversation of all user in localStorage
  * @author Anurag Mishra anuraagmishra92@gmail.com
*/

'use strict';

var LOCALSTORAGE        = require('node-localstorage').LocalStorage;
var MEMORYSTORAGE       = new LOCALSTORAGE('./UserConversations');

/**
 * Save user conversation in local memory
 */
exports.SaveUserConversation = function(data, localMemorycb) {
    var date = new Date();
    var conversationArray = [];

    if (MEMORYSTORAGE.getItem(data.platform + '_' + data.bot + '_' + data.senderId) === null) {
        conversationArray.push({
            topic: data.topic,
            text: data.text,
            timestamp: date,
            platform: data.platform,
            bot: data.bot
        });
        MEMORYSTORAGE.setItem(data.platform + '_' + data.bot + '_' + data.senderId, JSON.stringify(conversationArray));
    } else {
        var senderArray = JSON.parse(MEMORYSTORAGE.getItem(data.platform + '_' + data.bot + '_' + data.senderId));

        console.log('========SaveUserConversation======', senderArray.length);
        for (var i = 0;i < senderArray.length;i++) {
            conversationArray.push({
                topic: senderArray[i].topic,
                text: senderArray[i].text,
                timestamp: senderArray[i].timestamp,
                platform: senderArray[i].platform,
                bot: senderArray[i].bot
            });
        }
        conversationArray.push({
            topic: data.topic,
            text: data.text,
            timestamp: date,
            platform: data.platform,
            bot: data.bot
        });
        MEMORYSTORAGE.setItem(data.platform + '_' + data.bot + '_' + data.senderId, JSON.stringify(conversationArray));
    }

    localMemorycb();
};

/**
 * Get conversation of specific user from localstorage
 */
exports.GetUserConversation = function(key) {
    console.log('====GetUserConversation====', key);
    var value = JSON.parse(MEMORYSTORAGE.getItem(key));

    return value;
};
