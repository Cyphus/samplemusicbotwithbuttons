const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

async function reply(guild_id, { content }) {
 const keyDetails = await lib.utils.kv['@0.1.16'].get({
    key: `${process.env.key}_${guild_id}`,
  });
  
  const msg = await lib.discord.channels['@0.2.0'].messages.create({
    content: ``,
    embed: {
      description: content,
      color: 0xd43790
    },
    channel_id: keyDetails.channelId,
    message_reference: {
      message_id: keyDetails.messageId
    }
  });

  await sleep(10000);
  await lib.discord.channels['@0.2.0'].messages.destroy({
    message_id: msg.id, // required
    channel_id: msg.channel_id, // required
  });
}

async function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports = reply;
