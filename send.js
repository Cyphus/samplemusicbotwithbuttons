const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

async function send(content, { channel_id }) {
  const msg = await lib.discord.channels['@0.2.0'].messages.create({
    content,
    channel_id,
  });

  await sleep(5000);
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

module.exports = send;
