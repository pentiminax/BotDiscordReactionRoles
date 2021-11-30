const { TextChannel, Message } = require('discord.js');

/**
 * 
 * @param {Message} message 
 * @param {Array} reactions 
 */
const addReactions = (message, reactions) => {
    message.react(reactions[0]);
    reactions.shift();

    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750);
    }
}

const initializeFirstMessage = async ({ channel, text, reactions }) => {
    await channel.send(text).then((message) => {
        addReactions(message, reactions)
    });
}

const editFirstMessage = ({ messages, text, reactions }) => {
    for (const message of messages) {

        message[1].edit(text);

        if (reactions) {
            addReactions(message[1], reactions);
        }
    }
}

/**
 * 
 * @param {TextChannel} channel 
 * @param {Message} message 
 * @param {Array} reactions 
 */
module.exports = (channel, text, reactions) => {
    channel.messages.fetch().then(messages => {
        if (messages.size === 0)
            initializeFirstMessage({ channel: channel, text: text, reactions: reactions })
        else if (messages.size === 1)
            editFirstMessage({ messages: messages, text: text, reactions: reactions })
    });
}