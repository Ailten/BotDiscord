//module voteBan (use for ban an user).
module.exports = {
    //array of user marked to ban.
    arrayPseudoBan: [],

    //modules import.
    cmd: undefined,
    regexCmd: undefined,

    //init the module.
    init: function (cmd) {
        this.cmd = cmd;
        this.regexCmd = (/^!applyParam/i);
    },

    executeCmd: function (messageObjGet) {

        //get channel param.
        let channelParam = this.cmd.channel.getChannelByName('bot-params');
        if(channelParam === null){
            this.cmd.channel.log("cmd applyParam, channel params not found.", false);
            return false;
        }

        //write all params get.
        let allParamsGet = '--- param ---';
        channelParam.messages
            .fetch({ limit: 100 })
            .then(ms => { //async call get messages.
                ms.forEach(mObj => { //loop messages.
                    mObj.content
                        .replace(/```/g, '') //sanitize.
                        .split('\n') //split.
                        .forEach(line => {
                            let regextract = (line)
                                .match(/(^[a-zA-Z0-9_-]{1,}:|[a-zA-Z0-9_.-]{1,}$)/g);
                            console.log(line);
                            console.log(regextract);
                            if(regextract !== null && regextract.length === 2){
                                allParamsGet += "\n" + 
                                    regextract[0].replace(/:$/, '') + ' : ' + 
                                    regextract[1];
                            }
                    });
                });
                this.cmd.channel.log(allParamsGet);
        });

        //return success.
        return true;
    },

};