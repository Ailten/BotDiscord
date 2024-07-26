//module user (use for manage users discord).
module.exports = {

    //modules import.
    bot: undefined,
    channel: undefined,
    guild: undefined,

    //init the module.
    init: function(bot, channel, guild){
        this.bot = bot;
        this.channel = channel;
        this.guild = guild;
    },

    //get an user obj by his pseudo.
    getUserByName: function(userName){
        //get user in cache list.
        let user = this.guild.getGuildByName('Ailten')
            .members.cache.find( guildMember => 
                guildMember.user.username.toLowerCase() === userName.toLowerCase()
            );

        //verify if user not found.
        if(user === undefined){
            this.channel.log("getUserByName, user ["+userName+"] not found.", false);
            return undefined;
        }

        //return user.
        return user;
    },
    
};