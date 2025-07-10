import { googleImage } from '@bochilteam/scraper'
var handler = async (m, { conn, text, usedPrefix, command }) => {
const paroleproibite = ['se men', 'hen tai', 'se xo', 'te tas', 'cu lo', 'c ulo', 'cul o', 'ntr', 'rule34', 'rule', 'caca', 'polla', 'po', 'porn', 'gor', 'cum', 'semen', 'puta', 'puto', 'cul', 'putita', 'putito', 'pussy', 'henti', 'pne', 'coño', 'asesinato', 'zoofilia', 'mia kalifa', 'desnudo', 'desnuda', 'cuca', 'chocha', 'muertos', 'porub', 'polloooo', 'xvos', 'eta', 'vagia', 'marsha may', 'misha cross', 'sexmex', 'furry', 'furro', 'furra','rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga', 'horny', 'ass', 'popo', 'nsfw', 'femdom', 'futanari', 'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob', 'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation', 'violacion', 'bdsm', 'cachonda', '+18', 'cp', 'xxx', 'nuda', 'nude', 'mia marin', 'lana rhoades', 'cepesito', 'hot', 'buceta']
if (paroleproibite.some(word => m.text.toLowerCase().includes(word))) return conn.reply(m.chat, '⚠️ 𝐍𝐨𝐧 𝐩𝐨𝐬𝐬𝐨 𝐢𝐧𝐯𝐢𝐚𝐫𝐞 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐧𝐭𝐞𝐧𝐮𝐭𝐨', m,)
if (!text) return conn.reply(m.chat, `> ⓘ 𝐔𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:\n> ${usedPrefix + command} gatto`, m,)
const res = await googleImage(text)
let image = res.getRandom()
let link = image
conn.sendFile(m.chat, link, 'errore.jpg', `🔍 𝐈𝐦𝐦𝐚𝐠𝐢𝐧𝐞: ${text}`, m)
}
handler.command = ['immagina'];
export default handler
