import { GatewayDispatchEvents } from "discord-api-types/v10";

export = {
	name: GatewayDispatchEvents.IntegrationCreate,
	async execute(client: any, { data: i, api }: any) {
		console.log(i);
		
		if (i.isCommand()) {
			const command = await client.commands.get(i.commandName);
			if (!command) return;
			if (i.options._subcommand) i.sub = i.options._subcommand;
			if (i.options._group) i.grp = i.options._group;
			try {
				await command.execute(i);
			} catch (e) {
				console.log(e);
				if (i.replied)
					return i.channel.send({
						content: ":x: | Une erreur est survenue.",
						ephemeral: true,
					});
			}
		}
	},
};