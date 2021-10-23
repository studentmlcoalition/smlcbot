import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import WOKCommands from 'wokcommands';

dotenv.config();

const token = process.env.DISCORD_TOKEN ?? '';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
    console.log(`${client.user?.tag} ready!`);

    new WOKCommands(client, {
        botOwners: process.env.DISCORD_OWNER,
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: process.env.TS_NODE === 'true',
    });

    client.user?.setActivity('with data');
});

client.login(token);
