import fs from "fs";
import path from "path";
import TsykeHandler from "./Client";
import { REST } from "@discordjs/rest";
import { rest } from "../main";
import { Routes } from "@discordjs/core";

export class Handler {
    constructor() {
    }

    async loadEvent(client: TsykeHandler) {
        const eventsPath = path.join(__dirname, '/../events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
                console.log("EVENT STARTED : %s", event.name);
            } else {
                client.on(event.name, (...args) => event.execute(...args));
                console.log("EVENT LOADED : %s", event.name);
            }
        }
    }

    async loadCommand(client: any) {
        const commandFolder = fs.readdirSync(path.resolve(__dirname + `/../commands`));
        try {
            client.commandArray = [];
            for (let file of commandFolder) {
                const command = require(path.resolve(__dirname + `/../commands/${file}`));
                console.log(command);
                
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
                console.log(`[Slash] Commande ${command.data.name} en cours de chargement`);
            }


            

            try {
                await rest.put(Routes.applicationCommands("990625062572924980"), {
                    body: client.commandArray,
                });
                console.log("Commandes envoyées");
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    }
}