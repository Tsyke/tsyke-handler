const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

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
    execute: async (client, i) => { 
        if (i.sub === 'welcome') {
            const WelcomeEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Bienvenue sur mon Handler !")
                .setDescription("Ceci est un handler !")
                .setFooter({ text: `Demandé par ${i.member.user.username}`, iconURL: i.member.displayAvatarURL()})
            return i.reply({ embeds: [WelcomeEmbed], ephemeral: true });
        }
     }
}