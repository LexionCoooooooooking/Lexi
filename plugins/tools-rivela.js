let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
    if (!m.quoted) throw '𝐑𝐢𝐬𝐩𝐨𝐧𝐝𝐢 𝐚 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐯𝐢𝐬𝐮𝐚𝐥𝐢𝐳𝐳𝐚𝐛𝐢𝐥𝐞 𝐮𝐧𝐚 𝐬𝐨𝐥𝐚 𝐯𝐨𝐥𝐭𝐚 (foto, video o audio)'

    if (m.quoted.mtype !== 'viewOnceMessageV2') throw '𝐐𝐮𝐞𝐬𝐭𝐨 𝐧𝐨𝐧 𝐞̀ 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐚 𝐯𝐢𝐬𝐮𝐚𝐥𝐢𝐳𝐳𝐚𝐳𝐢𝐨𝐧𝐞 𝐮𝐧𝐢𝐜𝐚'

    let msg = m.quoted.message
    let type = Object.keys(msg)[0]

    let mediaType = ''
    if (type === 'imageMessage') mediaType = 'image'
    else if (type === 'videoMessage') mediaType = 'video'
    else if (type === 'audioMessage') mediaType = 'audio'
    else throw '𝐈𝐥 𝐭𝐢𝐩𝐨 𝐝𝐢 𝐦𝐞𝐝𝐢𝐚 𝐧𝐨𝐧 è 𝐬𝐮𝐩𝐩𝐨𝐫𝐭𝐚𝐭𝐨 (solo foto, video o audio)'

    let stream = await downloadContentFromMessage(msg[type], mediaType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }

    if (mediaType === 'video') {
        return conn.sendFile(m.chat, buffer, 'video.mp4', msg[type].caption || '', m)
    } else if (mediaType === 'image') {
        return conn.sendFile(m.chat, buffer, 'image.jpg', msg[type].caption || '', m)
    } else if (mediaType === 'audio') {
        return conn.sendFile(m.chat, buffer, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
    }
}

handler.help = ['readvo']
handler.tags = ['tools']
handler.command = ['readviewonce', 'nocap', 'rivela', 'readvo'] 
export default handler
