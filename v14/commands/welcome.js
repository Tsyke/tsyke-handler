const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const client = require("../Main");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("welcome")
        .setDescription("Bienvenue sur l'handler")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("welcome")
                .setDescription("Ceci est un handler !")
        )
    ,
    execute: async (i) => { 
        if (i.sub === 'welcome') {
            const WelcomeEmbed = new EmbedBuilder({
                title: "Bienvenue sur mon Handler !",
                description: "Ceci est un handler !",
                color: 0xfff,
                footer: {
                    text: `Demandé par ${i.member.user.username}`,
                    iconURL: i.member.displayAvatarURL()
                }
            });
            return i.reply({ embeds: [WelcomeEmbed], ephemeral: true });
        }
     }
}