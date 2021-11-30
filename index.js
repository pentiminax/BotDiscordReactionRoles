const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const roleClaim = require('./utils/role-claim');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.once('ready', () => {
    console.log('Ready!');
    roleClaim(client);
});

client.login(token);