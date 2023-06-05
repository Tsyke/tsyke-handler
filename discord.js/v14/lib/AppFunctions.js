const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const {
    readdirSync
} = require("fs");

const fs = require("fs");

module.exports.loadEvents = async (client) => {
    await fs.readdir("./events/", (err, files) => {
        if (err) return console.log(err);
        files.forEach((f) => {
            const event = require(`../events/${f}`);
            let eventName = f.split(".")[0];
            console.log(`Event chargé: \x1b[34m\x1b[4m${f}\x1b[0m`);
            client.on(eventName, event.bind(null));
        });
    });
}

module.exports.loadCommands = async (client) => {
    const commandFolder = readdirSync("./commands");
    try {
        client.commandArray = [];
        for (let file of commandFolder) {
            const command = require(`../commands/${file}`);
            client.public.commands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
            console.log(`[Slash] Commande ${command.data.name} en cours de chargement`);
        }


        const rest = new REST({
            version: "9",
        }).setToken(process.env.TOKEN);

        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: client.commandArray,
            });
            console.log("Commandes envoyées");
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
};
