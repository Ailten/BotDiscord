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
        this.regexCmd = (/^!voteBan[ ]{0,1}/i);
    },

    executeCmd: function (messageObjGet) {
        //get pseudo voted in commande.
        let pseudoToBan = messageObjGet.content
            .replace(this.regexCmd, ''); //remove commande (and space).
        if (pseudoToBan === undefined || pseudoToBan === "") {
            this.cmd.channel.log("cmd voteBan, not found pseudo.", false);
            return false;
        }

        //get pseudo of user who vote.
        let pseudoFromVote = messageObjGet.author.username;
        let userFromVote = this.cmd.user.getUserByName(pseudoFromVote);
        if (userFromVote === undefined) {
            this.cmd.channel.log("cmd voteBan, user sender cmd is not found.", false);
            return false;
        }
        let userToBan = this.cmd.user.getUserByName(pseudoToBan);
        if (userToBan === undefined) {
            this.cmd.channel.log("cmd voteBan, user target cmd is not found.", false);
            return false;
        }

        //get pseudo of user sender (and both obj user, sender and target).
        let objPseudoBan = this.arrayPseudoBan.find(
            pb => pb.pseudo === pseudoToBan
        );
        if (objPseudoBan === undefined) {
            objPseudoBan = {
                pseudo: pseudoToBan,
                vote: 1,
                pseudoHaveBeenVote: [pseudoFromVote],
            };
            this.arrayPseudoBan.push(objPseudoBan);
        } else if (objPseudoBan.pseudoHaveBeenVote.includes(pseudoFromVote)) {
            this.cmd.channel.log("cmd voteBan, this user has already vote.", false);
            return false;
        } else {
            objPseudoBan.vote += 1;
            objPseudoBan.pseudoHaveBeenVote.push(pseudoFromVote);
        }
        
        //check if the user ask, has role role "verified".
        let isUserFromVoteIsVerified = this.cmd.role.thisUserHasThisRole(
            userFromVote, 
            "verified"
        );
        if (!isUserFromVoteIsVerified) {
            this.cmd.channel.log(
                "cmd voteBan, user ask has not role verified.",
                false,
            );
        }

        //check if the user target, hasnt  role "verified".
        let isUserToBanIsVerified = this.cmd.role.thisUserHasThisRole(
            userToBan, 
            "verified"
        );
        if (isUserToBanIsVerified) {
            this.cmd.channel.log(
                "cmd voteBan, user target has role verified.",
                false,
            );
        }

        //if as much vote, set role for fake ban.
        if (objPseudoBan.vote >= 2) {
            let role = messageObjGet.options.getRole("petite crotte");
            if (role === undefined) {
                this.cmd.channel.log(
                    "cmd voteBan, role [petite crotte] not found.",
                    false,
                );
                return false;
            }
            let userToBan = this.bot.users.find(
                (user) => user.username == objPseudoBan.pseudo,
            );
            if (userToBan === undefined) {
                this.cmd.channel.log(
                    "cmd voteBan, user [objPseudoBan.pseudo] not found.",
                    false,
                );
                return false;
            }
            userToBan.roles.add(role);
        }

        //return success.
        return true;
    },
};
