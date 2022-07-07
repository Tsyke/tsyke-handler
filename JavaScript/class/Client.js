const { Client, Collection } = require("discord.js");
const fetch = require("node-fetch");
class Stats extends Client {
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

module.exports = Stats;