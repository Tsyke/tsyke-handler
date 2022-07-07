const { deleteCommands, loadCommands, loadEvents } = require("./AppFunctions")

module.exports.AllCommand = async (App) => {
    //await deleteCommands(App);
    loadCommands(App);
    loadEvents(App);
}