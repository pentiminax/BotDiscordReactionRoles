const { Client, MessageReaction } = require('discord.js');
const firstMessage = require('./first-message');

const emojis = {
    windows: "Windows",
    linux: "Linux"
}

/**
 * 
 * @param {MessageReaction} reaction 
 * @param {*} user 
 * @param {*} add 
 */
const handleReaction = (reaction, user, add) => {
    const emoji = reaction.emoji.name;
    const { guild } = reaction.message;

    const roleName = emojis[emoji];

    if (!roleName) {
        return;
    }

    const role = guild.roles.cache.find(role => role.name === roleName);

    if (!role) {
        return;
    }

    const member = guild.members.cache.find(member => member.id === user.id);

    if (add) {
        member.roles.add(role);
    } else {
        member.roles.remove(role);
    }
}

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    const channel = client.channels.cache.find((channel) => channel.id == '913053365167071242');
    const getEmoji = emojiName => client.emojis.cache.find((emoji) => emoji.name === emojiName);

    const reactions = [];

    let message = "Réagis avec l'un des émojis suivant pour obtenir le(s) rôle(s) de développeur qui te correspond le mieux :\n\n";

    for (const key in emojis) {
        const emoji = getEmoji(key);
        if (emoji) {
            reactions.push(emoji);
            const role = emojis[key];
            message += `${emoji} : ${role}\n`;
        }
    }

    firstMessage(channel, message, reactions);

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channel.id) {
            handleReaction(reaction, user, true);
        }
    });

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channel.id) {
            handleReaction(reaction, user, false);
        }
    });
}