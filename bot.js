const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

const DISCORD_TOKEN = 'TU_TOKEN_DE_DISCORD';
const DEEPL_API_KEY = 'TU_API_KEY_DE_DEEPL';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  // Verificar que el mensaje provenga de un usuario y no del propio bot
  if (!message.author.bot) {
    // Traducir el mensaje usando DeepL
    const translatedMessage = await translateMessage(message.content);

    // Enviar el mensaje traducido en el mismo canal de Discord
    message.channel.send(`Mensaje original: ${message.content}`);
    message.channel.send(`Mensaje traducido: ${translatedMessage}`);
  }
});

async function translateMessage(text) {
  try {
    const response = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      {
        text,
        target_lang: 'EN', // Lenguaje al que se traducirá el mensaje (EN = inglés)
        auth_key: DEEPL_API_KEY,
      }
    );

    return response.data.translations[0].text;
  } catch (error) {
    console.error('Error al traducir el mensaje:', error.message);
    return 'No se pudo traducir el mensaje.';
  }
}

client.login(DISCORD_TOKEN);
