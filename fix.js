const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const { guild_id, channel_id } = context.params.event 
const Player = require('../../../../../helper/player.js')

await lib.utils.kv['@0.1.16'].clear({
  key: `music_${process.env.key}_${guild_id}`,
});

await lib.discord.voice['@0.0.1'].channels.disconnect({  guild_id }).catch(err => {})
await Player.reset({channel_id, guild_id});
