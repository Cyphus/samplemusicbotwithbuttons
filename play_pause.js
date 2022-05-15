const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const {guild_id, member} = context.params.event;
const reply = require('../../../../../tools/reply.js');

let status = await lib.discord.voice['@0.0.1'].tracks.retrieve({
  guild_id,
});

let components = context.params.event.message.components

if (status.paused) {
  await lib.discord.voice['@0.0.1'].tracks.resume({
    guild_id,
  });
  
  components[0].components[0].style = 2
  components[0].components[0].label = "PAUSE"
  
} else {
  await lib.discord.voice['@0.0.1'].tracks.pause({
    guild_id,
  });
  
  components[0].components[0].style = 1
  components[0].components[0].label = "RESUME"
}

await lib.discord.channels['@0.2.0'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.channel_id,
    components
});

await reply(guild_id, { content: `**${member.user.username}** ${status.paused ? 'resumed' : 'paused'} the current song.`})


