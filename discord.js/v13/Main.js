require('dotenv').config();
const { Intents } = require("discord.js");

const TsykeHandler = require("./class/Client.js");
const { AllCommand } = require('./Functions');

const client = new TsykeHandler({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]
});

client.on('ready', () => {
    const statuses = [
        () => `${client.guilds.cache.size} serveurs`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) - client.guilds.cache.size} utilisateurs`,

    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), { type: "STREAMING", url: "https://twitch.tv/TsykeHandler" });
        i = ++i % statuses.length;
    }, 1e4)
});

(async () => {
    await client.login(process.env.TOKEN);
    AllCommand(client);
})();

process.on('unhandledRejection', error => {
    console.error(`Uncaught Promise Rejection: \n${error.stack}`);
})