const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const reply = require('../../../../../tools/reply.js');
const { guild_id, member } = context.params.event 

await lib.utils.kv['@0.1.16'].clear({
  key: `music_${process.env.key}_${guild_id}`,
});

await lib.discord.voice['@0.0.1'].channels.disconnect({  guild_id });
await reply(guild_id, { content: `**${member.user.username}** stoped the bot from playing music.`})
