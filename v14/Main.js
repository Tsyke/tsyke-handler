require('dotenv').config();
const { 
    GatewayIntentBits, 
    Partials, 
    ActivityType 
} = require("discord.js");

const TsykeHandler = require("./class/Client.js");
const { AllCommand } = require('./lib/Functions');

const client = new TsykeHandler({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping, ,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ]
});

client.on('ready', async () => {
    client.user.setPresence({
        activities: [{ name: `Tsyke-Handler.`, type: ActivityType.Playing }],
        status: 'dnd',
    });
});

client.on("debug", async (debug) => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let file = date + "-" + month + "-" + year + "_" + hours + "." + minutes + "." + seconds

    var fs = require('fs')
    var logger = fs.createWriteStream(`./debug/${file}.txt`, {
        flags: 'a'
    })
    logger.write(debug)
});

(async () => {
    await client.login(process.env.TOKEN);
    AllCommand(client);
})();

process.on('unhandledRejection', error => {
    console.log(`[ ERROR ] Unhandled Rejection: ${error.message}`);
});

module.exports = client