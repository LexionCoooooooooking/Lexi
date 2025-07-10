import axios from "axios";

const API_KEY = "65137657dba81669f2b1ebc2a2ff3dc3"; 

async function getNumberInfo(phoneNumber) {
    const url = `http://apilayer.net/api/validate?access_key=${API_KEY}&number=${phoneNumber}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.valid) {
            return `
💎═══════•⊰✦⊱•═══════👻

*Ꮮ𝐄𝐗𝚰Ꮻ𝐍 DOXXA*

📞 INFO NUMERO
─────────────────────────
➤ Numero originale: ${data.number}
➤ Formato locale: ${data.local_format}
➤ Formato internazionale: ${data.international_format}

🌍 PAESE
➤ Nome: ${data.country_name}
➤ Codice: ${data.country_code}
➤ Prefisso: +${data.country_prefix}

📍 LOCALIZZAZIONE
➤ Regione/Area: ${data.location || "Non disponibile"}

📡 OPERATORE
➤ Carrier: ${data.carrier || "Non disponibile"}
➤ Tipo di linea: ${data.line_type || "Non specificato"}
💎═══════•⊰✦⊱•═══════👻
`;
        } else {
            return "❌ Numero non valido o non trovato.";
        }
    } catch (error) {
        return `*_❌ Errore nella richiesta: ${error.message}_*`;
    }
}

const handler = async (m, { text, participants }) => {
    if (!text) {
        return m.reply("📌 Esempio d'uso: .dox +393331234567");
    }

    const sender = m.sender;
    const isGroup = !!m.isGroup;
    const admins = isGroup ? participants.filter(p => p.admin).map(p => p.id) : [];

    
    if (!admins.includes(sender) && sender !== text.replace(/\D/g, "")) {
        return m.reply("🚫 Accesso negato. Solo admin o numero target.");
    }

    const result = await getNumberInfo(text);
    m.reply(result);
};

handler.help = ["dox"];
handler.tags = ["tools"];
handler.command = ["dox"];

export default handler;
