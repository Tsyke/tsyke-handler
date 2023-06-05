import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { client, gateway } from "../main";
import { APIInteraction } from "@discordjs/core";

export = {
    data: new SlashCommandBuilder()
        .setName("welcome")
        .setDescription("Bienvenue sur mon handler !"),
    execute(api: any, i: APIInteraction) {
        return api.interactions.reply(
            i.id,
            i.token,
            { 
                content: 'Bienvenue sur mon handler !',
                embeds: [
                    new EmbedBuilder({
                        title: "Test",
                        description: "Test",
                        fields: [
                            {
                                name: "Jsuis con ?",
                                value: "Oui."
                            }
                        ]
                    })
                ]
            }
        )
    }
}