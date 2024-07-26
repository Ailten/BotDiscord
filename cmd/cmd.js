//module cmd (use for manage all discord command).
module.exports = {
    //array of obj modules cmd.
    arrayCmdModules: [],

    //modules import.
    bot: undefined,
    channel: undefined,
    user: undefined,
    role: undefined,

    //init the module.
    init: function(bot, channel, user, role){
        this.bot = bot;
        this.channel = channel;
        this.user = user;
        this.role = role;

        //push every cmd modules.
        this.arrayCmdModules.push(require('./hello.js'));
        this.arrayCmdModules.push(require('./voteBan.js'));
        this.arrayCmdModules.push(require('./applyParam.js'));

        //init every cmd modules. 
        this.arrayCmdModules.forEach(cm => {
            cm.init(this); 
        });
    },

    searchCmd: function(messageObj){
        let isSuccess = false;

        //loop on every cmd and execute if found.
        this.arrayCmdModules.forEach(cm => {
            if((cm.regexCmd).test(messageObj.content)){
                isSuccess = cm.executeCmd(messageObj);
                return;
            }
        });

        //return error if no cmd found.
        return isSuccess;
        
    },

};
