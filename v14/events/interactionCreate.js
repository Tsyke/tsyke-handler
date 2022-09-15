const client = require("../Main");

module.exports = async (i) => {
    if (i.isCommand() || i.isContextMenu()) {
        const command = await client.public.commands.get(i.commandName);
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
}