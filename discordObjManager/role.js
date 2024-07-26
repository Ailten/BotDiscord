//module role (use for manage roles discord).
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

    //get a role obj by his name.
    getRoleByName: function(roleName){
        
        //get role in cache list.
        let role = this.guild.getGuildByName('Ailten')
            .roles.cache.find(
                r => r.name.toLowerCase() === roleName.toLowerCase()
            );

        //verify if role not found.
        if(role === undefined){
            this.channel.log("getRoleByName, role ["+roleName+"] not found.", false);
            return undefined;
        }

        //return user.
        return role;
    },

    //return true if the user obj send has the id role send.
    thisUserHasThisRole: function(userObj, roleName){

        //get role obj by name.
        let role = this.getRoleByName(roleName);
        if(role === undefined){
            return false;
        }

        //verify if user obj has id of role ask in his array role id.
        return userObj._roles.find(rId => rId === role.id) !== undefined;
    },

};