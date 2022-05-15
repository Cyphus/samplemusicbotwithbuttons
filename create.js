const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const Player = require('../../../../helper/player.js');
const send = require('../../../../tools/send.js')
const message = context.params.event;
const keyDetails = await lib.utils.kv['@0.1.16'].get({
  key: `${process.env.key}_${message.guild_id}`,
});

if (message.content.startsWith('!setup')) {
  let channelId = message.content.match(/\d+/g);
  if (!channelId)
    return lib.discord.channels['@0.2.0'].messages.create({
      content: `Please mention the channel where you want to setup music bot.`,
      channel_id: message.channel_id,
    });
  else channelId = channelId[0];

  const msg = await lib.discord.channels['@0.2.0'].messages.create({
    content: `**[ Song List]**\nJoin a voice channel and queue songs by name or url in here.`,
    channel_id: channelId,
    embed: {
      title: `Vibing Alone 😎`,
      url: `https://withwin.in`,
      description: `This is the music bot, created by \`CTK WARRIOR#7923\` in Autocode.`,
      color: 0xD43790,
      image: {
        url: 'https://c.tenor.com/Wgo-XGZmUNAAAAAC/music-listening-to-music.gif',
      },
      thumbnail: {
        url: 'https://images.discordapp.net/avatars/636147614722555924/2e020703ae7e9ec152662c8c04d0cf0e.png?size=1024',
      },
    },
  });

  await Player.reset({keyDetails: {channelId, messageId: msg.id}});

  await lib.utils.kv['@0.1.16'].set({
    key: `${process.env.key}_${message.guild_id}`,
    value: {channelId, messageId: msg.id},
  });

  await lib.discord.channels['@0.2.0'].messages.create({
    content: `Setup is completed :)`,
    channel_id: message.channel_id,
  });
} else if (keyDetails && keyDetails.channelId === message.channel_id) {
  const voice_channel = await lib.utils.kv['@0.1.16'].get({
    key: `voice_${process.env.key}_${message.guild_id}_${message.author.id}`,
  });

  await lib.discord.channels['@0.2.0'].messages.destroy({
    message_id: message.id, // required
    channel_id: message.channel_id, // required
  });

  if (!voice_channel)
    return send("Please join the voice channel first!", { channel_id: context.params.event.channel_id })

  await Player.play(message.content, {
    channel_id: voice_channel.channelId,
    guild_id: message.guild_id,
    keyDetails,
  }).catch(async (err) => {
    console.log(err)
    await send("Unable to play the song, please try again later.", { channel_id: context.params.event.channel_id })
  });
}







