const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
const fs = require("fs");
const { join } = require('path');

dotenv.config();

const intents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
const client = new Client({ intents: intents});

const commands = {}
const commandFiles = fs.readdirSync(join(__dirname, '.', 'commands/')).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(join(__dirname, '.', 'commands/')+file);
    commands[command.data.name] = command
}

fs.readdir(`./events/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, commands, ...args));
    });
});

client.login(process.env.DISCORD_TOKEN);