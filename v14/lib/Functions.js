const { 
    loadCommands, 
    loadEvents 
} = require("./AppFunctions");

const { 
    PermissionsBitField 
} = require('discord.js');

module.exports.AllCommand = async (client) => {
    loadCommands(client);
    loadEvents(client);
}

module.exports.formatDate = async (date) => {
    let d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    let year = d.getFullYear();
    let dateMs = d.getMilliseconds();

    return `${day}/${month}/${year} | ${hour}:${minute}:${second}`
}

module.exports.convertToMs = async (unit, time) => {
    if(unit === "Secondes") {
        time = time * 1000;
    } else if(unit === "Minutes") {
        time = time * 1000 * 60
    } else if(unit === "Heures") {
        time = time * 1000 * 60 * 60
    } else if(unit === "Jours") {
        time = time * 1000 * 60 * 60 * 24
    } else {
        throw new Error("Invalid time unit '" + unit + "'");
    }
    return time;
}

module.exports.DEBUG = async (type, name, result) => {
    console.log(`[ DEBUG ] Function.DEBUG.js: ${type} ${name} | Result: ${result}`);
}

module.exports.convertBitfieldToArray = async (bitfield) => {
    const permissions = new PermissionsBitField(bitfield);
    const Perms = permissions.serialize()
    return Perms;
}

module.exports.sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports.fetchChannel = async function(guild, channel) {
        const Fetch = await guild.channels.fetch(channel).catch(function (err) {
            return false;
        })
        return Fetch;
}

module.exports.fetchMessage = async function (channel, messageId) {
    const Fetch = await channel.messages.fetch(messageId).catch(function (err) {
        return false;
    })
    return Fetch;
}

module.exports.fetchRole = async function(guild, roleId) {
    const Fetch = await guild.roles.fetch(roleId).catch(function (err) {
        return false;
    })
    return Fetch;
}

module.exports.fetchRoleGroup = async function(guild, ...roleId) {
    let data = []
    roleId.forEach(async function(role) {
        const Fetch = await guild.roles.fetch(role).catch(function (err) {
            return data.push(false)
        })
        return data.push(Fetch.id)
    })
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
}