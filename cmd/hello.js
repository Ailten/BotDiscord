//module voteBan (use for ban an user).
module.exports = {
    //modules import.
    cmd: undefined,
    regexCmd: undefined,

    //init the module.
    init: function (cmd) {
        this.cmd = cmd;
        this.regexCmd = (/^!hello/i);
    },

    executeCmd: function (messageObjGet) {
        return this.cmd.channel.reply('hello !', messageObjGet);
    },

};