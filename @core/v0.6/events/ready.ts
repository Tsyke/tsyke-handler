import { GatewayDispatchEvents } from "discord-api-types/v10";

export = {
	name: GatewayDispatchEvents.Ready,
	once: true,
	execute(client: any) {
		console.log(client);
		
		// console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};