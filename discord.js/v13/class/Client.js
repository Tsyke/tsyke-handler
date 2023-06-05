const { Client, Collection } = require("discord.js");
class TsykeHandler extends Client {
    constructor(options) {
        super(options);
    }
    _private = {
        offServerId: null,
        devServerId: null,
    }
    public = {
        commands: new Collection()
    }
}

module.exports = TsykeHandler;