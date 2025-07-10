import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (message, { conn, usedPrefix }) => {
  const senderName = await conn.getName(message.sender);
  const targetJid = message.quoted
    ? message.quoted.sender
    : message.mentionedJid && message.mentionedJid[0]
    ? message.mentionedJid[0]
    : message.fromMe
    ? conn.user.jid
    : message.sender;

  const profilePicUrl = (await conn.profilePictureUrl(targetJid, "image").catch(() => null)) || "./src/avatar_contact.png";
  const profilePicBuffer = await (await fetch(
    profilePicUrl !== "./src/avatar_contact.png"
      ? profilePicUrl
      : "https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png"
  )).buffer();

  const botName = global.db?.data?.nomedelbot || "𝔏𝔢𝔵𝔦𝔬𝔫";
  const vs = global.db?.data?.version || "1.0";

  const commandList = `
╭━━━〔 *⚡ 𝑴𝑬𝑵𝑼 𝑫𝑬𝑳 𝑩𝑶𝑻 ⚡* 〕━━━╮
┃  
┃ 👑 *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑮𝑬𝑵𝑬𝑹𝑨𝑳𝑰* 👑
┃
┃ ━━━━━━━━━━━
┃
┃ ✶ ${usedPrefix}𝑷𝑹𝑶𝑷𝑹𝑰𝑬𝑻𝑨𝑹𝑰𝑶
┃ ✶ ${usedPrefix}𝑭𝑼𝑵𝒁𝑰𝑶𝑵𝑰
┃ ✶ ${usedPrefix}𝑨𝑫𝑴𝑰𝑵
┃ ✶ ${usedPrefix}𝑶𝑾𝑵𝑬𝑹
┃ ✶ ${usedPrefix}𝑪𝑶𝑵𝑺𝑰𝑮𝑳𝑰𝑨
┃ ✶ ${usedPrefix}𝑺𝑬𝑮𝑵𝑨𝑳𝑨
┃
╰━━━━━━━━━━━━━━━━━━╯
🚀 𝑩𝒐𝒕: ${botName}
🌟 *𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬:* ${vs}
`.trim();

  await conn.sendMessage(message.chat, {
    text: commandList,
    footer: 'Scegli un menu:',
    buttons: [
      { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: "🛡️ Menu Admin" }, type: 1 },
      { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
      { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: "🚨 Menu Sicurezza" }, type: 1 },
      { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: "👥 Menu Gruppo" }, type: 1 },
    ],
    headerType: 4,
    viewOnce: true,
    contextInfo: {
      mentionedJid: conn.parseMention(commandList),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '12036341808721@newsletter',
        serverMessageId: '',
        newsletterName: botName
      },
      externalAdReply: {
        title: senderName,
        body: `⚙️ 𝑽𝒆𝒓𝒔𝒊𝒐𝒏𝒆 𝑩𝒐𝒕: ${vs}`,
        mediaType: 1,
        renderLargerThumbnail: false,
        previewType: "PHOTO",
        thumbnail: profilePicBuffer,
        sourceUrl: 'https://whatsapp.com' // Cambia con il tuo link se necessario
      }
    }
  });
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;
