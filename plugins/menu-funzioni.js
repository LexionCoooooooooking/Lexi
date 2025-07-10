// Plugin fatto da Gabs & 333 Staff
import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (message, { conn, usedPrefix }) => {
  const chatData = global.db.data.chats[message.chat];

  const {
    antiToxic,
    antilinkhard,
    antiPrivate,
    antispam,
    antiCall,
    modohorny,
    gpt,
    antiinsta,
    antielimina,
    antitelegram,
    antiPorno,
    jadibot,
    autosticker,
    modoadmin,
    audios,
    isBanned,
    welcome,
    detect,
    sWelcome,
    sBye,
    sPromote,
    sDemote,
    antiLink,
    antilinkbase,
    antitiktok,
    sologruppo,
    soloprivato,
    antitraba,
    antiArab,
    antiviewonce
  } = chatData;

  let quotedMessage = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      locationMessage: {
        name: "𝐌𝐞𝐧𝐮 𝐝𝐞𝐥𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐚𝐥𝐢𝐭𝐚'"
      }
    },
    participant: "0@s.whatsapp.net"
  };

  let menuText = `
──────────────
 ${detect ? '🟢' : '🔴'} » ${usedPrefix}detect
 ${gpt ? '🟢' : '🔴'} » ${usedPrefix}gpt
 ${jadibot ? '🟢' : '🔴'} » ${usedPrefix}jadibot
 ${welcome ? '🟢' : '🔴'} » ${usedPrefix}benvenuto
 ${sologruppo ? '🟢' : '🔴'} » ${usedPrefix}sologruppo
 ${soloprivato ? '🟢' : '🔴'} » ${usedPrefix}soloprivato
 ${modoadmin ? '🟢' : '🔴'} » ${usedPrefix}modoadmin
 ${isBanned ? '🟢' : '🔴'} » ${usedPrefix}bangp
 ${antiPorno ? '🟢' : '🔴'} » ${usedPrefix}antiporno
 ${antiCall ? '🟢' : '🔴'} » ${usedPrefix}anticall
 ${antitraba ? '🟢' : '🔴'} » ${usedPrefix}antitrava
 ${antiArab ? '🟢' : '🔴'} » ${usedPrefix}antipaki
 ${antiLink ? '🟢' : '🔴'} » ${usedPrefix}antilink
 ${antiinsta ? '🟢' : '🔴'} » ${usedPrefix}antiinsta
 ${antitiktok ? '🟢' : '🔴'} » ${usedPrefix}antitiktok
 ${antielimina ? '🟢' : '🔴'} » ${usedPrefix}antielimina
────────────
ⓘ Info sulle funzioni
🟢 » Funzione attivata 
🔴 » Funzione disabilitata 
────────────
ⓘ Uso del comando
${usedPrefix}attiva antilink
${usedPrefix}disabilita antilink
ⓘ Info sullo stato
${usedPrefix}infostato
──────────────`.trim();

  let botName = global.db.data.nomedelbot || "𝔏𝔢𝔵𝔦𝔬𝔫";

  conn.sendMessage(message.chat, {
    text: menuText,
    contextInfo: {
      mentionedJid: conn.parseMention(botName),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "12746350@newsletter",
        serverMessageId: '',
        newsletterName: botName
      }
    }
  }, { quoted: quotedMessage });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(funzioni)$/i;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map(unit => unit.toString().padStart(2, '0')).join(':');
}
