//Plugin fatto da Gabs & 333 Staff
import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('Formato non supportato.');
    }

    try {
      const { data } = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      if (data?.success) {
        return {
          id: data.id,
          image: data.info.image,
          title: data.title,
          downloadUrl: await ddownr.cekProgress(data.id)
        };
      } else {
        throw new Error('Errore nel recupero dei dettagli del video.');
      }
    } catch (error) {
      console.error('Errore:', error.message);
      throw error;
    }
  },

  cekProgress: async (id) => {
    try {
      while (true) {
        const { data } = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        if (data?.success && data.progress === 1000) {
          return data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error('Errore:', error.message);
      throw error;
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) return conn.reply(m.chat, `💣 Inserisci il nome della musica.`, m);

    const search = await yts(text);
    if (!search.all.length) return m.reply('Nessun risultato trovato.');

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const formattedViews = new Intl.NumberFormat().format(views);
    const infoMessage = `
⭐ *Titolo:* ${title}
⏳ *Durata:* ${timestamp}
👁️ *Visualizzazioni:* ${formattedViews}
📺 *Canale:* ${author?.name || 'Sconosciuto'}
📅 *Pubblicato:* ${ago}
🔗 *Link:* ${url}`;

    // Thumbnail come immagine
    const thumb = (await conn.getFile(thumbnail))?.data;

    // Invio del messaggio con bottoni per scegliere tra audio o video
    await conn.sendMessage(m.chat, {
      text: infoMessage,
      footer: 'Seleziona un formato per il download:',
      buttons: [
        { buttonId: `${usedPrefix}play ${url}`, buttonText: { displayText: '🎧 Scarica Audio' }, type: 1 },
        { buttonId: `${usedPrefix}ytmp4 ${url}`, buttonText: { displayText: '🎥 Scarica Video' }, type: 1 },
      ],
      headerType: 4,
      image: { url: thumbnail }
    }, { quoted: m });

    // Se il comando è già diretto (senza bottoni), scarica subito
    if (command === 'play') {
      const api = await ddownr.download(url, 'mp3');
      return await conn.sendMessage(m.chat, {
        audio: { url: api.downloadUrl },
        mimetype: "audio/mpeg"
      }, { quoted: m });

    } else if (command === 'ytmp4') {
      let sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];

      const results = await Promise.allSettled(sources.map(src => fetch(src).then(res => res.json())));
      
      for (const result of results) {
        if (result.status === "fulfilled") {
          const { data, result: resResult, downloads } = result.value;
          const downloadUrl = data?.dl || resResult?.download?.url || downloads?.url || data?.download?.url;
          if (downloadUrl) {
            return conn.sendMessage(m.chat, {
              video: { url: downloadUrl },
              fileName: `${title}.mp4`,
              mimetype: 'video/mp4',
              caption: 'Scaricato con successo!',
              thumbnail: thumb
            }, { quoted: m });
          }
        }
      }

      return m.reply(`⚠︎ Nessun link valido trovato.`);
    }

  } catch (error) {
    return m.reply(`⚠︎ *Errore:* ${error.message}`);
  }
};

handler.command = handler.help = ['play', 'ytmp4'];
handler.tags = ['downloader'];

export default handler;
