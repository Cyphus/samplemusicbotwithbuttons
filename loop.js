const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const { guild_id, member } = context.params.event 
const reply = require('../../../../../tools/reply.js');

const loop = await lib.utils.kv['@0.1.16'].get({
  key:`voice_${process.env.key}_${guild_id}_loop`
})

await lib.utils.kv['@0.1.16'].set({
  key:`voice_${process.env.key}_${guild_id}_loop`,
  value: loop ? false : true
})

let components = context.params.event.message.components

components[0].components[2].style = loop ? 2 : 1

await lib.discord.channels['@0.2.0'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.channel_id,
    components
});

await reply(guild_id, { content: `**${member.user.username}** ${loop ? 'disabled' : 'enabled'} loop.`})
