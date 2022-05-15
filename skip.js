const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const Player = require('../../../../../helper/player.js');
const reply = require('../../../../../tools/reply.js');
const {guild_id, member} = context.params.event;

let currentQueue = await lib.utils.kv['@0.1.16'].get({
  key: `music_${process.env.key}_${guild_id}`,
  defaultValue: [],
});

currentQueue = currentQueue.slice(1);
await lib.utils.kv['@0.1.16'].set({
  key: `music_${process.env.key}_${guild_id}`,
  value: currentQueue,
});

if (!currentQueue.length) {
  await lib.discord.voice['@0.0.1'].channels.disconnect({guild_id});
} else {
  let currentInfo = await lib.discord.voice['@0.0.1'].tracks.retrieve({
    guild_id: guild_id,
  });

  await Player.play(currentQueue[0].url, {
    channel_id: currentInfo.channel_id,
    guild_id,
    direct: true,
  });
}

await reply(guild_id, { content: `**${member.user.username}** skipped the song.`})
