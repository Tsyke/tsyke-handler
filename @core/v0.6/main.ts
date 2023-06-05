import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import { GatewayDispatchEvents, GatewayIntentBits } from '@discordjs/core';
import { Handler } from './class/Handler';
import TsykeHandler from './class/Client';

export const rest = new REST({ version: '10' }).setToken("TOKEN");

export const gateway = new WebSocketManager({
	token: "TOKEN",
	intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
	rest,
});

export const client = new TsykeHandler({ rest, gateway });

client.on(GatewayDispatchEvents.InteractionCreate, async ({ data: i, api }: any) => {
	const command = await client.commands.get(i?.data?.name);
	if(command) {
		try{
			command.execute(api, i)
		} catch(e) {
			console.log(e);
		}
	}
});

gateway.connect().then(() => {
	new Handler().loadEvent(client);
	new Handler().loadCommand(client);
});