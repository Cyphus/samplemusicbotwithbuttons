const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const Player = require('../../../../../helper/player.js')
const send = require('../../../../../tools/send.js')
const { channel_id, guild_id }= context.params.event
let currentQueue = await lib.utils.kv['@0.1.16'].get({
  key: `music_${process.env.key}_${guild_id}`,
  defaultValue: [ "x" ]
});

const loop = await lib.utils.kv['@0.1.16'].get({
  key:`voice_${process.env.key}_${guild_id}_loop`
})


if(loop) currentQueue.push(currentQueue[0])
currentQueue = currentQueue.slice(1)

await lib.utils.kv['@0.1.16'].set({
  key: `music_${process.env.key}_${guild_id}`,
  value: currentQueue
});

if(!currentQueue.length) {
  await lib.discord.voice['@0.0.1'].channels.disconnect({  guild_id })
  return Player.reset({ channel_id, guild_id })
} else return Player.play(currentQueue[0].url, { channel_id, guild_id, direct: true })

