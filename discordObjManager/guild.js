//module user (use for manage users discord).
module.exports = {
    guilds: [
        { name: 'Ailten', id: '1099296948974006302' }
    ],

    //modules import.
    bot: undefined,
    channel: undefined,

    //init the module.
    init: function(bot, channel){
        this.bot = bot;
        this.channel = channel;
    },

    //get obj guild by name.
    getGuildByName: function(guildName){

        //get guild in list.
        let guildObj = this.guilds.find(
            g => g.name.toLowerCase() === guildName.toLowerCase()
        )
        if(guildObj === undefined){
            this.channel.log(
                "getGuildByName, guildName ["+guildName+"] not found.", 
                false
            );
            return undefined;
        }

        //get obj guild usable.
        let guild = this.bot.guilds.cache.get(guildObj.id);
        if(guild === undefined){
            this.channel.log(
                "getGuildByName, guildId ["+guildName+"] not found.", 
                false
            );
            return undefined;
        }

        //return obj guild usable.
        return guild;
    }

};