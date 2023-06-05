import { Client } from "@discordjs/core";
import { ClientInterface } from "../types/Client";
import { Collection } from "@discordjs/collection";

export default class TsykeHandler extends Client {
    commands: any
    commandArray
    constructor({ rest, gateway }: ClientInterface) {
        super({ rest, gateway });
        this.commands = new Collection();
        this.commandArray = new Array();
    }
}