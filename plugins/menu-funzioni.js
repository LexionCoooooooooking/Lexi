import fetch from 'node-fetch';

let handler = async (message, { conn, usedPrefix }) => {
  const chatData = global.db.data.chats[message.chat];

  const {
    antiToxic, antilinkhard, antiPrivate, antispam, antiCall,
    modohorny, gpt, antiinsta, antielimina, antitelegram,
    antiPorno, jadibot, autosticker, modoadmin, audios,
    isBanned, welcome, detect, sologruppo, soloprivato,
    antiLink, antitiktok, antitraba, antiArab
  } = chatData;

  let botName = global.db.data.nomedelbot || "𝔏𝔢𝔵𝔦𝔬𝔫";

  let quotedMessage = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      locationMessage: {
        name: "📡 𝐌𝐞𝐧𝐮 𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐢",
        jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer()
      }
    },
    participant: "0@s.whatsapp.net"
  };

  let menuText = `
╭─❖ 𝙁𝙐𝙉𝙕𝙄𝙊𝙉𝙄 𝘼𝙏𝙏𝙄𝙑𝙀 ❖─╮
 ${detect ? '✔️' : '✖️'} » ${usedPrefix}detect
 ${gpt ? '✔️' : '✖️'} » ${usedPrefix}gpt
 ${jadibot ? '✔️' : '✖️'} » ${usedPrefix}jadibot
 ${welcome ? '✔️' : '✖️'} » ${usedPrefix}benvenuto
 ${sologruppo ? '✔️' : '✖️'} » ${usedPrefix}sologruppo
 ${soloprivato ? '✔️' : '✖️'} » ${usedPrefix}soloprivato
 ${modoadmin ? '✔️' : '✖️'} » ${usedPrefix}modoadmin
 ${isBanned ? '✔️' : '✖️'} » ${usedPrefix}bangp
 ${antiPorno ? '✔️' : '✖️'} » ${usedPrefix}antiporno
 ${antiCall ? '✔️' : '✖️'} » ${usedPrefix}anticall
 ${antitraba ? '✔️' : '✖️'} » ${usedPrefix}antitrava
 ${antiArab ? '✔️' : '✖️'} » ${usedPrefix}antipaki
 ${antiLink ? '✔️' : '✖️'} » ${usedPrefix}antilink
 ${antiinsta ? '✔️' : '✖️'} » ${usedPrefix}antiinsta
 ${antitiktok ? '✔️' : '✖️'} » ${usedPrefix}antitiktok
 ${antielimina ? '✔️' : '✖️'} » ${usedPrefix}antielimina
────────────
ⓘ Info sulle funzioni
✔️ » Funzione attivata 
✖️ » Funzione disabilitata 
────────────
ⓘ Uso del comando
${usedPrefix}attiva antilink
${usedPrefix}disabilita antilink
ⓘ Info sullo stato
${usedPrefix}infostato
──────────────`.trim();

  await conn.sendMessage(message.chat, {
    text: menuText,
    footer: 'Scegli un menu:',
    buttons: [
      { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🏠 Menu Principale" }, type: 1 },
      { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: "🛡️ Menu Admin" }, type: 1 },
      { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
      { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: "👥 Menu Gruppo" }, type: 1 },
    ],
    contextInfo: {
      mentionedJid: conn.parseMention(botName),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363418210683@newsletter", // ← JID canale
        serverMessageId: '',
        newsletterName: botName
      }
    }
  }, { quoted: quotedMessage });
};

handler.help = ["funzioni", "menu", "menuadmin", "menuowner", "menugruppo"];
handler.tags = ["menu"];
handler.command = /^(funzioni|menu|menuadmin|menuowner|menugruppo)$/i;

export default handler;
