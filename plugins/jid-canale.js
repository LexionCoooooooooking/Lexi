import fetch from 'node-fetch';

const handler = async (message, { conn, args }) => {
  if (!args[0]) {
    return conn.sendMessage(message.chat, {
      text: "❗ *𝐮𝐬𝐚 𝐢𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐜𝐨𝐬𝐢̀:* .jid <𝐥𝐢𝐧𝐤 𝐝𝐞𝐥 𝐜𝐚𝐧𝐚𝐥𝐞>"
    }, { quoted: message });
  }

  const url = args[0];
  const regex = /https:\/\/whatsapp\.com\/channel\/([a-zA-Z0-9]+)/;
  const match = url.match(regex);

  if (!match) {
    return conn.sendMessage(message.chat, {
      text: "❌ *𝐥𝐢𝐧𝐤 𝐧𝐨𝐧 𝐯𝐚𝐥𝐢𝐝𝐨. 𝐚𝐬𝐬𝐢𝐜𝐮𝐫𝐚𝐭𝐢 𝐜𝐡𝐞 𝐬𝐢𝐚 𝐮𝐧 𝐥𝐢𝐧𝐤 𝐝𝐢 𝐜𝐚𝐧𝐚𝐥𝐞 𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩.*"
    }, { quoted: message });
  }

  try {
    const res = await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0'
      }
    });

    const html = await res.text();

    const jidMatch = html.match(/"id":"(120\d+@newsletter)"/);

    if (jidMatch && jidMatch[1]) {
      const jid = jidMatch[1];
      await conn.sendMessage(message.chat, {
        text: `✅ *𝐣𝐢𝐝 𝐝𝐞𝐥 𝐜𝐚𝐧𝐚𝐥𝐞:* \n\`\`\`${jid}\`\`\`\n\n📡 *𝐢𝐧𝐟𝐨 𝐫𝐢𝐜𝐚𝐯𝐚𝐭𝐚 𝐝𝐚𝐥 𝐥𝐢𝐧𝐤 𝐮𝐟𝐟𝐢𝐜𝐢𝐚𝐥𝐞.*`
      }, { quoted: message });
    } else {
      await conn.sendMessage(message.chat, {
        text: "❌ *𝐣𝐢𝐝 𝐧𝐨𝐧 𝐭𝐫𝐨𝐯𝐚𝐭𝐨. 𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐩𝐨𝐭𝐫𝐞𝐛𝐛𝐞 𝐚𝐯𝐞𝐫𝐞 𝐧𝐚𝐬𝐜𝐨𝐬𝐭𝐨 𝐥𝐞 𝐢𝐧𝐟𝐨 𝐨𝐩𝐩𝐮𝐫𝐞 𝐢𝐥 𝐥𝐢𝐧𝐤 𝐞̀ 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐨.*"
      }, { quoted: message });
    }

  } catch (err) {
    console.error(err);
    await conn.sendMessage(message.chat, {
      text: "⚠️ *𝐞𝐫𝐫𝐨𝐫𝐞 𝐧𝐞𝐥𝐥𝐚 𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐨 𝐧𝐞𝐥 𝐩𝐚𝐫𝐬𝐢𝐧𝐠 𝐝𝐞𝐥 𝐬𝐢𝐭𝐨.*"
    }, { quoted: message });
  }
};

handler.help = ['jid <link>'];
handler.tags = ['tools'];
handler.command = /^\.jid$/i;
handler.owner = false;

export default handler;
