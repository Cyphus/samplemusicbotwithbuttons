const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const Player = require('../../../../../helper/player.js');
const {channel_id, guild_id} = context.params.event;

if (context.params.event.channel_id)
  return lib.utils.kv['@0.1.16'].set({
    key: `voice_${process.env.key}_${context.params.event.guild_id}_${context.params.event.member.user.id}`,
    value: {channelId: context.params.event.channel_id},
  });
else {
  let botInfo = await lib.discord.users['@0.1.5'].me.list();
  if (context.params.event.user_id === botInfo.id) {
    await lib.utils.kv['@0.1.16'].clear({
      key: `music_${process.env.key}_${guild_id}`,
    });

    return Player.reset({channel_id, guild_id});
  } else
    await lib.utils.kv['@0.1.16'].clear({
      key: `voice_${process.env.key}_${context.params.event.guild_id}_${context.params.event.member.user.id}`, // required
    });
}
