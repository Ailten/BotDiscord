//module channel (use for manage channels discord and send message on it).
module.exports = {
    //all channels (id, name).
    channels: [
        { name: 'bot-log', id: '1223308295838761110' },
        { name: 'bot-params', id: '1223344325899845632' }
    ],

    //--->

    //modules import.
    bot: undefined,

    //init the module.
    init: function (bot) {
        this.bot = bot;
    },

    //--->

    //send a message in a discord channel.
    sendMessage: function (message, channelName, isInBox=false) {

        //make a discord box message (for code or asci).
        if(isInBox){
            message = '```'+message+'```';
        }

        //get channel by id.
        let channel = this.getChannelByName(channelName);
        if (channel === null) {
            return false;
        }

        //send message to channel.
        channel.send(message);

        //success.
        return true;
    },

    //send a message back to a message get.
    reply: function(messageToSend, messageObjGet){
        //get channel of message get.
        let channel = messageObjGet.channel;
        if (channel === undefined) {
            console.log(
                '[X] error: channelId ' + channelFind.id + ' not found ! [X]',
            );
            return false;
        }

        //send message.
        channel.send(messageToSend);

        //success.
        return true;
    },

    //write a log in channel bot-log.
    log: function(message, isASuccess){
        //add char success/error to message.
        if(isASuccess !== undefined){
            message = '['+(isASuccess? 'V': 'X')+'] '+message;
        }

        //send message debug in channel discord.
        let success = this.sendMessage(
            message, //message.
            'bot-log', //channelName.
            true, //isInBox.
        );

        //success.
        return success;
    },

    //get an obj channel by name.
    getChannelByName: function(channelName){

        //get channel.
        let channelFind = this.channels.find((c) => c.name === channelName);
        if (channelFind === undefined) {
            console.log(
                '[X] error: channelName ' + channelName + ' not found ! [X]',
            );
            return null;
        }

        //get channel by id.
        let channel = this.bot.channels.cache.get(channelFind.id);
        if (channel === undefined) {
            console.log(
                '[X] error: channelId ' + channelFind.id + ' not found ! [X]',
            );
            return null;
        }

        //return success.
        return channel;
    },
};
