import { Constants, GuildMember } from 'discord.js';
import type { ICommand } from 'wokcommands';

const command: ICommand = {
    category: 'SMLCBot',
    description: 'Set your role and nickname based on your school.',
    guildOnly: true,

    slash: true,
    expectedArgs: '<school>',

    options: [
        {
            name: 'school',
            description: 'Name of school',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING,
        },
    ],

    callback({ interaction, args }) {
        const arg = args[0];
        const member = interaction.member as GuildMember;

        function getRole(name: string) {
            return interaction.guild?.roles.cache.find(r => r.name.toLowerCase() === name.toLowerCase());
        }

        const argRole = getRole(arg);
        if (argRole) {
            if (member.manageable) {
                const nameArray = member.displayName.split(' - ');
                let name: string;

                if (nameArray.length > 1) {
                    const school = nameArray.slice(-1)[0];
                    const currRole = getRole(school);
                    if (currRole) {
                        member.roles.remove(currRole);
                    }
                    name = nameArray.slice(0, -1).join(' - ');
                } else {
                    name = nameArray[0];
                }

                member.setNickname(`${name} - ${argRole.name}`);
                member.roles.add(argRole);
                interaction.reply(`School set to "${argRole.name}".`);
            } else {
                interaction.reply('Can\'t set nickname and role. Check that the bot has a higher role and the user is not the server owner.');
            }
        } else {
            interaction.reply(`"${arg}" has not been added as a school yet. Ask a Director to add it first.`);
        }
    },
};

export default command;