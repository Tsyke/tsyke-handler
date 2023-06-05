const { deleteCommands, loadCommands, loadEvents } = require("./AppFunctions")

module.exports.AllCommand = async (Client) => {
    loadCommands(Client);
    loadEvents(Client);
}