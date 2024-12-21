const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { cmd, commands } = require('../command')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();
//fb downloader
cmd({
    pattern: "fb",
    desc: "Download fb videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("Please provide a valid Facebook video URL!");
        const data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);
        let desc = ` *COBRA-MD FB DOWNLOADER...⚙️*

*Reply This Message With Option*

*1 Download FB Video In HD*
*2 Download FB Video In SD*

> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*`;

        const vv = await conn.sendMessage(from, { image: { url: "https://files.catbox.moe/de82e3.jpg"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: "> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*" }, { quoted: mek });
                        break;
                    case '2':               
                    await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: "> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*" }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});



const {cmd , commands} = require('../command')
const yts = require('yt-search');
const fg = require('api-dylux');

// -------- Song Download --------
cmd({
    pattern: 'song',
    desc: 'download songs',
    react: "🎧",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('*Please enter a query or a url !*');

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `*🦚 C͜͡OBRA-MD ๛ SONG DOWNLOADER . .⚙️*

🦚 TITLE - ${data.title}

🦚 VIEWS - ${data.views}

🦚 DESCRIPTION - ${data.description}

🦚 TIME - ${data.timestamp}

🦚 AGO - ${data.ago}

*👻Reply This Message With Option👻*

*1️⃣ NORMAL TYPE AUDIO*
*2️⃣ DOCUMENT TYPE AUDIO*

> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        let down = await fg.yta(url);
                        let downloadUrl = down.dl_url;
                        await conn.sendMessage(from, { audio: { url:downloadUrl }, caption: '> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*', mimetype: 'audio/mpeg'},{ quoted: mek });
                        break;
                    case '2':               
                        // Send Document File
                        let downdoc = await fg.yta(url);
                        let downloaddocUrl = downdoc.dl_url;
                        await conn.sendMessage(from, { document: { url:downloaddocUrl }, caption: '> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*', mimetype: 'audio/mpeg', fileName:data.title + ".mp3"}, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});


//==================== Video downloader =========================

cmd({
    pattern: 'video',
    desc: 'download videos',
    react: "📽️",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('*Please enter a query or a url !*');

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `*📽️ COBRA-MD VIDEO DOWNLOADER . .⚙️*

🦚 TITLE - ${data.title}

🦚 VIEWS - ${data.views}

🦚 DESCRIPTION - ${data.description}

🦚 TIME - ${data.timestamp}

🦚 AGO - ${data.ago}

*👻Reply This Message With Option👻*

*1️⃣ NORMAL VIDEO TYPE*
*2️⃣ DOCUMENT VIDEO TYPE*

> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        let downvid = await fg.ytv(url);
                        let downloadvUrl = downvid.dl_url;
                        await conn.sendMessage(from, { video : { url:downloadvUrl }, caption: '> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*', mimetype: 'video/mp4'},{ quoted: mek });
                        break;
                    case '2':
                        let downviddoc = await fg.ytv(url);
                        let downloadvdocUrl = downviddoc.dl_url;
                        await conn.sendMessage(from, { document: { url:downloadvdocUrl }, caption: '> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*', mimetype: 'video/mp4', fileName:data.title + ".mp4" }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
 
const { cmd } = require('../command');
const { exec } = require('child_process');
const config = require('../config');

// 1. Shutdown Bot
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 Shutting down...").then(() => process.exit());
});

// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");
    if (args.length === 0) return reply("📢 ρℓєαѕє ρяσνι∂є α мєѕѕαgє тσ вяσα∂¢αѕт.");

    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }

    reply("📢 мєѕѕαgє вяσα∂¢αѕтє∂ тσ αℓℓ gяσυρѕ.");
});

// 3. Set Profile Picture
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ ρℓєαѕє яєρℓу тσ αη ιмαgє.");

    try {
        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.jid, { url: media });
        reply("🖼️ ρяσƒιℓє ρι¢тυяє υρ∂αтє∂ ѕυ¢¢єѕѕƒυℓℓу!");
    } catch (error) {
        reply(`❌ єяяσя υρ∂αтιηg ρяσƒιℓє ρι¢тυяє: ${error.message}`);
    }
});

// 4. Block User
cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");
    if (!quoted) return reply("❌ ρℓєαѕє яєρℓу тσ тнє υѕєя уσυ ωαηт тσ вℓσ¢к.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 User ${user} вℓσ¢кє∂ ѕυ¢¢єѕѕƒυℓℓу.`);
    } catch (error) {
        reply(`❌ єяяσя вℓσ¢кιηg υѕєя: ${error.message}`);
    }
});

// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");
    if (!quoted) return reply("❌ ρℓєαѕє яєρℓу тσ тнє υѕєя уσυ ωαηт тσ υηвℓσ¢к.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} υηвℓσ¢кє∂ ѕυ¢¢єѕѕƒυℓℓу.`);
    } catch (error) {
        reply(`❌ єяяσя υηвℓσ¢кιηg υѕєя: ${error.message}`);
    }
});

// 6. Clear All Chats
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 αℓℓ ¢нαтѕ ¢ℓєαяє∂ ѕυ¢¢єѕѕƒυℓℓу!");
    } catch (error) {
        reply(`❌ єяяσя ¢ℓєαяιηg ¢нαтѕ: ${error.message}`);
    }
});

// 7. Get Bot JID
cmd({
    pattern: "jid",
    desc: "Get the bot's JID.",
    category: "owner",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");
    reply(`🤖 *Bot JID:* ${conn.user.jid}`);
});

// 8. Group JIDs List
cmd({
    pattern: "gjid",
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "owner",
    react: "📝",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ уσυ αяє ησт тнє σωηєя!");

    const groups = await conn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join('\n');
    reply(`📝 *Group JIDs:*\n\n${groupJids}`);
});


const config = require('../config');
const { cmd, commands } = require('../command');
const { default: makeWASocket, useMultiFileAuthState, WA_DEFAULT_EPHEMERAL, jidNormalizedUser, proto, getDevice, generateWAMessageFromContent, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, generateForwardMessageContent, downloadContentFromMessage, jidDecode } = require('@whiskeysockets/baileys')
cmd({
    pattern: "admins",
    desc: "Get a list of group admins.",
    react: "👥",
    category: "group",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        const groupMetadata = await conn.groupMetadata(from);
        const admins = groupMetadata.participants
            .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
            .map(admin => `@${admin.id.split('@')[0]}`)
            .join('\n');

        return await conn.sendMessage(from, {
            text: `*Group Admins:*\n\n${admins}`,
            mentions: groupMetadata.participants
                .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
                .map(admin => admin.id)
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e.message}`);
    }
});

cmd({
    pattern: "groupdesc",
    desc: "Change the group description.",
    use: '.groupdesc <New Description>',
    react: "👥",
    category: "group",
    filename: __filename
},
async (conn, mek, m, {
    from, args, quoted, body, isCmd, command, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!isAdmins) return reply(`You Must Be Admin For Use This Command`);
        if (args.length === 0) return reply('Please provide a new group description.');

        const newDesc = args.join(' '); // Join all arguments as the new description
        await conn.groupUpdateDescription(from, newDesc);

        return await conn.sendMessage(from, {
            text: `Group description has been updated to:\n\n${newDesc}`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e.message}`);
    }
});


cmd({
    pattern: "groupinfo",
    desc: "Get information  the group.",
    react: "👥",
    category: "group",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        const groupMetadata = await conn.groupMetadata(from); // Get group metadata
        const groupInfo = `
*Group Name:* ${groupMetadata.subject}
*Group Description:* ${groupMetadata.desc || 'No description'}
*Members:* ${groupMetadata.participants.length}
*Created At:* ${new Date(groupMetadata.creation * 1000).toLocaleString()}
        `;
        return await conn.sendMessage(from, {
            text: groupInfo
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e.message}`);
    }
});

cmd({
    pattern: "grouplink",
    desc: "Get the group's invite link.",
    react: "👥",
    category: "group",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        const inviteLink = await conn.groupInviteCode(from);
        return await conn.sendMessage(from, {
            text: `*Here is your group's invite link:* https://chat.whatsapp.com/${inviteLink}`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e.message}`);
    }
});

cmd({
    pattern: "gname",
    desc: "Change the group name",
    use: ".gname <New Group Name>",
    react: "✏️",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, sender, groupMetadata, args, reply }) => {
    if (!isGroup) {
        return await reply("This command can only be used in groups.");
    }
    const botNumber = conn.user.jid;
    const isBotAdmin = groupMetadata.participants.some(participant => participant.jid === botNumber && participant.admin);
    
    if (!isBotAdmin) {
        return await reply("I'm not an admin in this group.");
    }
    const newName = args.join(" ");
    if (!newName) {
        return await reply("Please provide a new group name.");
    }
    try {
        await conn.groupUpdateSubject(from, newName);
        return await reply(`Group name changed to "${newName}" successfully!`);
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
    } catch (error) {
        console.error('Error changing group name:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return await reply("Failed to change the group name. Please try again later.");
    }
});

cmd({
    pattern: "setsubject",
    desc: "Change the group subject.",
    use: '.setsubject <New Subject>',
    react: "👥",
    category: "group",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!isAdmins) return reply(`You Must Be Admin For Use This Command`);
        if (args.length === 0) return await conn.sendMessage(from, {
            text: 'Please provide a new group subject.'
        }, { quoted: mek });

        const newSubject = args.join(' '); // Join all arguments as the new subject
        await conn.groupUpdateSubject(from, newSubject);

        return await conn.sendMessage(from, {
            text: `Group subject has been updated to: ${newSubject}`
        }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e.message}`);
    }
});

cmd({
    pattern: "tagall",
    desc: "Mention all group members.",
    react: "👥",
    category: "group",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!isAdmins) return reply(`You Must Be Admin For Use This Command`);
        const groupMetadata = await conn.groupMetadata(from);
        const members = groupMetadata.participants.map(participant => `@${participant.id.split('@')[0]}`).join('\n');
        const mentions = groupMetadata.participants.map(p => p.id);
        
        return await conn.sendMessage(from, {
            text: `Mentioning everyone:\n\n${members}`,
            mentions
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return reply(`Error: ${e.message}`);
    }
});

// Command to view pending join requests
cmd({
    pattern: "requests",
    desc: "View pending join requests",
    use: ".requests",
    react: "📝",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, reply }) => {
    if (!isGroup) {
        return await reply("This command can only be used in groups.");
    }
    const botNumber = conn.user.jid;
    const groupMetadata = await conn.groupMetadata(from);
    const isBotAdmin = groupMetadata.participants.some(participant => participant.jid === botNumber && participant.admin);

    if (!isBotAdmin) {
        return await reply("I'm not an admin in this group.");
    }

    try {
        const requests = await conn.groupRequestParticipantsList(from);
        if (requests.length === 0) {
            return await reply("No pending join requests.");
        }

        let msg = "Pending Join Requests:\n\n";
        requests.forEach((request, index) => {
            msg += `${index + 1}. @${request.jid.split("@")[0]}\n`;
        });
        return await reply(msg, { mentions: requests.map(r => r.jid) });
    } catch (error) {
        console.error('Error retrieving join requests:', error);
        return await reply("Failed to retrieve join requests. Please try again later.");
    }
});

// Command to accept group join requests
cmd({
    pattern: "accept",
    desc: "Accept group join request(s)",
    use: ".accept <request numbers>",
    react: "✔️",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, reply, match }) => {
    // Check if the command is being used in a group
    if (!isGroup) {
        return await reply("This command can only be used in groups.");
    }
    const botNumber = conn.user.jid;
    const groupMetadata = await conn.groupMetadata(from);
    const isBotAdmin = groupMetadata.participants.some(participant => participant.jid === botNumber && participant.admin);

    if (!isBotAdmin) {
        return await reply("_I'm not an admin in this group._");
    }
    try {
        const requests = await conn.groupRequestParticipantsList(from);
        if (requests.length === 0) {
            return await reply("No pending join requests.");
        }
        if (!match) {
            return await reply("_Provide the number(s) of the request(s) to accept, separated by commas._");
        }
        const indexes = match.split(",").map(num => parseInt(num.trim()) - 1);
        const validIndexes = indexes.filter(index => index >= 0 && index < requests.length);
        if (validIndexes.length === 0) {
            return await reply("_Invalid request number(s)._");
        }
        for (let index of validIndexes) {
            await conn.groupRequestParticipantsUpdate(from, [requests[index].jid], "accept");
        }
        return await reply(`_Accepted ${validIndexes.length} join request(s)._`);
    } catch (error) {
        console.error('Error accepting join requests:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return await reply("Failed to accept join requests. Please try again later.");
    }
});

// Command to reject group join requests
cmd({
    pattern: "reject",
    desc: "Reject group join request(s)",
    use: ".reject <request numbers>",
    react: "❌",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, reply, match }) => {
    if (!isGroup) {
        return await reply("This command can only be used in groups.");
    }
    const botNumber = conn.user.jid;
    const groupMetadata = await conn.groupMetadata(from);
    const isBotAdmin = groupMetadata.participants.some(participant => participant.jid === botNumber && participant.admin);

    if (!isBotAdmin) {
        return await reply("I'm not an admin in this group.");
    }

    try {
        const requests = await conn.groupRequestParticipantsList(from);
        if (requests.length === 0) {
            return await reply("No pending join requests.");
        }
        if (!match) {
            return await reply("Provide the number(s) of the request(s) to reject, separated by commas.");
        }

        const indexes = match.split(",").map(num => parseInt(num.trim()) - 1);
        const validIndexes = indexes.filter(index => index >= 0 && index < requests.length);

        if (validIndexes.length === 0) {
            return await reply("_Invalid request number(s)._");
        }
        for (let index of validIndexes) {
            await conn.groupRequestParticipantsUpdate(from, [requests[index].jid], "reject");
        }

        return await reply(`_Rejected ${validIndexes.length} join request(s)._`);
    } catch (error) {
        console.error('Error rejecting join requests:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return await reply("Failed to reject join requests. Please try again later.");
    }
});


cmd({
    pattern: "hidetag",
    desc: "Tags everyperson of group without mentioning their numbers",
    react: "👥",
    category: "group",
    filename: __filename,
    use: '<text>',
},
(conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
try { 
    if (!m.isGroup) return reply(tlang().group);
if (!m.isGroup) return reply('only for groups');
if (!isAdmins) return reply(`You Must Be Admin For Use This Command`);
    conn.sendMessage(m.chat, {
        text: q ? text : "",
        mentions: participants.map((a) => a.id),
    }, {
        quoted: mek ,messageId:genMsgId() 
    });
} catch (e) {
reply('Error !!')
l(e)
}
})
cmd({
    pattern: "kick",
    desc: "Kicks replied/quoted user from group.",
    react: "👥",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
},           
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!m.isGroup) return reply('This command is only for groups.');
        if (!isBotAdmins) return reply(`I can't do that. Please make me a group admin.`);
        if (!isAdmins) return reply(`You must be an admin to use this command.`);
    
        const user = quoted ? quoted.sender : null;
        if (!user) return reply('Please reply to a user to kick them.');

        await conn.groupParticipantsUpdate(m.chat, [user], "remove");
        reply(`${user} has been kicked out of the group!`);
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('Error occurred while trying to kick the user.');
    }
});


//unlock group

cmd({
    pattern: "unlock",
    desc: "Allow all participants to modify the group's settings",
    react: "🔓",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { isGroup, isBotAdmins, isAdmins, args, reply }) => {
    try {
        if (!isGroup) return reply("This command is only for groups.");
        if (!isBotAdmins) return reply("I need to be a group admin to perform this action.");
        if (!isAdmins) return reply("You must be an admin to use this command.");

        await conn.groupSettingUpdate(mek.key.remoteJid, 'unlocked');

        reply("Group settings unlocked. All participants can modify the group's settings.");

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e}`);
    }
});

//lock group

cmd({
    pattern: "lock",
    desc: "Only allow admins to modify the group's settings",
    react: "🔒",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { isGroup, isBotAdmins, isAdmins, args, reply }) => {
    try {
        if (!isGroup) return reply("This command is only for groups.");
        if (!isBotAdmins) return reply("I need to be a group admin to perform this action.");
        if (!isAdmins) return reply("You must be an admin to use this command.");

        await conn.groupSettingUpdate(mek.key.remoteJid, 'locked');

        reply("Group settings locked. Only admins can modify the group's settings.");

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e}`);
    }
});

//Automaticaly Add Specific Country Members

cmd({
    pattern: "approve",
    desc: "Automatically approve Specific Country users in the waiting list",
    react: "✅",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { isGroup, isBotAdmins, isAdmins, args, reply }) => {
    try {
        if (!isGroup) return reply("This command is only for groups.");
        if (!isBotAdmins) return reply("I need to be a group admin to perform this action.");
        if (!isAdmins) return reply("You must be an admin to use this command.");

        const groupJid = mek.key.remoteJid;
        const response = await conn.groupRequestParticipantsList(groupJid);
        
        if (response.length === 0) {
            return reply("No participants are in the waiting list.");
        }
        const toAddUsers = response.filter(user => user.jid.startsWith(config.AUTO_ADD_Country_Code));

        if (toAddUsers.length === 0) {
            return reply("No +263 users found in the waiting list.");
        }

        const userJids = toAddUsers.map(user => user.jid);
        const approveResponse = await conn.groupRequestParticipantsUpdate(
            groupJid, 
            userJids,
            "approve"
        );

        console.log(approveResponse);
        reply(`Approved the following +263 users:\n${userJids.join("\n")}`);

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e}`);
    }
});

// Command to create a poll
cmd({
    pattern: "poll",
    desc: "Create a poll",
    use: ".poll <Question> | <Option1> | <Option2> | ...",
    react: "📊",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, reply, match }) => {
    if (!isGroup) {
        return await reply("This command can only be used in groups.");
    }
    const [question, ...options] = match.split("|").map(item => item.trim());
    if (!question || options.length < 2) {
        return await reply("Usage: .poll <Question> | <Option1> | <Option2> | ...");
    }

    // Create the poll object
    const poll = {
        name: question,
        values: options,
        selectableCount: 1,
    };

    try {
        await conn.sendMessage(from, { poll });
        return await reply("Poll created successfully.");
    } catch (error) {
        console.error('Error creating poll:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return await reply("Failed to create poll. Please try again later.");
    }
});

cmd({
    pattern: "getpic",
    desc: "Get the group profile picture.",
    category: "group",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')

        const groupPic = await conn.getProfilePicture(from)
        await conn.sendMessage(from, { image: { url: groupPic }, caption: 'Group Profile Picture' })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

const J=b;(function(c,d){const I=b,e=c();while(!![]){try{const f=-parseInt(I(0x0))/(0x167*-0x14+-0x14de+-0x7*-0x6fd)*(-parseInt(I(0x1))/(-0x216a+-0x77*0x2+-0x225a*-0x1))+parseInt(I(0x2))/(0x1*-0x3be+-0xd*-0xfb+-0x8fe)*(-parseInt(I(0x3))/(-0x80+-0x1*0x18eb+-0x11*-0x17f))+parseInt(I(0x4))/(0x180d+-0x1*0x2142+0x1*0x93a)+-parseInt(I(0x5))/(0x1*0x1ab7+0x1204+-0x2cb5)+parseInt(I(0x6))/(0x1b*-0x9d+0x2d*-0xc7+0x2b*0x133)+-parseInt(I(0x7))/(0x342*0x3+-0x1e54+0x1496)*(parseInt(I(0x8))/(-0x6a3*0x1+-0x102c+0x16d8))+parseInt(I(0x9))/(0x126b+-0x2315+0x10b4);if(f===d)break;else e['push'](e['shift']());}catch(g){e['push'](e['shift']());}}}(a,-0x239*0x548+0x8aeca+0x2f*0x4523));function b(c,d){const e=a();return b=function(f,g){f=f-(0x1*-0x1c0+0x4cf*0x1+0x9*-0x57);let h=e[f];return h;},b(c,d);}const {cmd,commands}=require('../command');function a(){const R=['to\x20add.','p.net','ERToQ','khkam','added\x20to\x20t','he\x20group.','@s.whatsap','setgoodbye','odbye\x20mess','age\x20for\x20th','e\x20group.','DUlfh','TalKX','vide\x20a\x20goo','dbye\x20messa','sendMessag','Goodbye\x20me','ssage\x20has\x20','been\x20set.','Set\x20the\x20we','Please\x20pro','vide\x20a\x20wel','come\x20messa','ge.','Welcome\x20me','QjeZX','oaCMq','Czrht','jwDTr','pvmte','getpic','Get\x20the\x20gr','e\x20picture.','🖼️','zbuSX','getProfile','Group\x20Prof','ile\x20Pictur','CVwib','1223760WkCths','2dwiaip','3MEPkEO','4222936ZnKmlB','4999630TGMJQE','4560504oZwDAO','424501BTwpKX','300376RZbeTJ','63peLoeG','4259170ZwLzYo','member\x20to\x20','This\x20comma','nd\x20can\x20onl','y\x20be\x20used\x20','in\x20a\x20group','You\x20must\x20b','e\x20an\x20admin','\x20to\x20use\x20th','is\x20command','Please\x20tag','\x20or\x20reply\x20','to\x20a\x20user\x20','to\x20promote','promote','oEHhV','DXBsp','kMTgW','mentioned','quoted','sender','groupParti','cipantsUpd','ate','Ninxt','split','\x20has\x20been\x20','promoted\x20t','o\x20admin.','log','meSvB','Demote\x20an\x20','admin\x20to\x20m','Bot\x20must\x20b','to\x20demote.','GGuvm','bNADb','pXLeT','demote','\x20member.','remove','ember\x20from','NnvPN','rlolJ','MMYCb','MVjBn','removed\x20fr','om\x20the\x20gro','hnhsQ','add','er\x20to\x20the\x20','group.','group','gZwry','vide\x20a\x20pho'];a=function(){return R;};return a();}cmd({'pattern':'promote','desc':'Promote\x20a\x20'+J(0xa),'category':'group','react':'🔼','filename':__filename},async(c,d,f,{from:g,quoted:h,body:i,isCmd:j,command:k,args:l,q:n,isGroup:o,sender:p,senderNumber:r,botNumber2:s,botNumber:t,pushname:u,isMe:v,isOwner:w,groupMetadata:x,groupName:y,participants:z,groupAdmins:A,isBotAdmins:B,isAdmins:C,reply:D})=>{const K=b,E={'oEHhV':function(F,G){return F(G);},'DXBsp':K(0xb)+K(0xc)+K(0xd)+K(0xe)+'.','kMTgW':K(0xf)+K(0x10)+K(0x11)+K(0x12)+'.','XkNsq':K(0x13)+K(0x14)+K(0x15)+K(0x16)+'.','Ninxt':K(0x17),'meSvB':function(F,G){return F(G);}};try{if(!o)return E[K(0x18)](D,E[K(0x19)]);if(!B)return D('Bot\x20must\x20b'+K(0x10)+K(0x11)+'is\x20command'+'.');if(!C)return E[K(0x18)](D,E[K(0x1a)]);const F=f[K(0x1b)][-0x9c3+0xb19+-0x156]||f[K(0x1c)]?.[K(0x1d)];if(!F)return D(E['XkNsq']);await c[K(0x1e)+K(0x1f)+K(0x20)](g,[F],E[K(0x21)]),await D('@'+F[K(0x22)]('@')[0x1*0x137+-0x1fdb+0x1ea4]+(K(0x23)+K(0x24)+K(0x25)),{'mentions':[F]});}catch(G){console[K(0x26)](G),E[K(0x27)](D,''+G);}}),cmd({'pattern':'demote','desc':J(0x28)+J(0x29)+'ember.','category':'group','react':'🔽','filename':__filename},async(c,d,f,{from:g,quoted:h,body:i,isCmd:j,command:k,args:l,q:n,isGroup:o,sender:p,senderNumber:r,botNumber2:s,botNumber:t,pushname:u,isMe:v,isOwner:w,groupMetadata:x,groupName:y,participants:z,groupAdmins:A,isBotAdmins:B,isAdmins:C,reply:D})=>{const L=b,E={'GGuvm':L(0xb)+'nd\x20can\x20onl'+'y\x20be\x20used\x20'+L(0xe)+'.','bNADb':function(F,G){return F(G);},'JOXOB':L(0x2a)+'e\x20an\x20admin'+L(0x11)+L(0x12)+'.','pXLeT':'You\x20must\x20b'+L(0x10)+'\x20to\x20use\x20th'+'is\x20command'+'.','qmRGy':L(0x13)+L(0x14)+L(0x15)+L(0x2b)};try{if(!o)return D(E[L(0x2c)]);if(!B)return E[L(0x2d)](D,E['JOXOB']);if(!C)return E['bNADb'](D,E[L(0x2e)]);const F=f[L(0x1b)][0x50c*-0x1+-0x7*-0x44b+-0x1901]||f['quoted']?.['sender'];if(!F)return D(E['qmRGy']);await c[L(0x1e)+L(0x1f)+L(0x20)](g,[F],L(0x2f)),await D('@'+F[L(0x22)]('@')[-0x26df+0x1e7b+0x864]+(L(0x23)+'demoted\x20to'+L(0x30)),{'mentions':[F]});}catch(G){console[L(0x26)](G),E[L(0x2d)](D,''+G);}}),cmd({'pattern':J(0x31),'desc':'Remove\x20a\x20m'+J(0x32)+'\x20the\x20group'+'.','category':'group','react':'🚫','filename':__filename},async(c,d,f,{from:g,quoted:h,body:i,isCmd:j,command:k,args:l,q:n,isGroup:o,sender:p,senderNumber:r,botNumber2:s,botNumber:t,pushname:u,isMe:v,isOwner:w,groupMetadata:x,groupName:y,participants:z,groupAdmins:A,isBotAdmins:B,isAdmins:C,reply:D})=>{const M=b,E={'NnvPN':function(F,G){return F(G);},'rlolJ':M(0x2a)+M(0x10)+M(0x11)+M(0x12)+'.','MMYCb':function(F,G){return F(G);},'jPprQ':M(0x13)+M(0x14)+'to\x20a\x20user\x20'+'to\x20remove.','MVjBn':function(F,G,H){return F(G,H);},'hnhsQ':function(F,G){return F(G);}};try{if(!o)return E[M(0x33)](D,M(0xb)+M(0xc)+M(0xd)+M(0xe)+'.');if(!B)return D(E[M(0x34)]);if(!C)return E[M(0x33)](D,M(0xf)+M(0x10)+'\x20to\x20use\x20th'+'is\x20command'+'.');const F=f[M(0x1b)][0x12f7+0x1f05+-0x31fc]||f[M(0x1c)]?.['sender'];if(!F)return E[M(0x35)](D,E['jPprQ']);await c[M(0x1e)+'cipantsUpd'+'ate'](g,[F],'remove'),await E[M(0x36)](D,'@'+F[M(0x22)]('@')[0x4*0x2e+0x235c+-0x2414]+('\x20has\x20been\x20'+M(0x37)+M(0x38)+'up.'),{'mentions':[F]});}catch(G){console[M(0x26)](G),E[M(0x39)](D,''+G);}}),cmd({'pattern':J(0x3a),'desc':'Add\x20a\x20memb'+J(0x3b)+J(0x3c),'category':J(0x3d),'react':'➕','filename':__filename},async(c,d,f,{from:g,quoted:h,body:i,isCmd:j,command:k,args:l,q:n,isGroup:o,sender:p,senderNumber:r,botNumber2:s,botNumber:t,pushname:u,isMe:v,isOwner:w,groupMetadata:x,groupName:y,participants:z,groupAdmins:A,isBotAdmins:B,isAdmins:C,reply:D})=>{const N=b,E={'qYZgO':function(F,G){return F(G);},'ESsKM':N(0xb)+'nd\x20can\x20onl'+'y\x20be\x20used\x20'+'in\x20a\x20group'+'.','gZwry':function(F,G){return F(G);},'diSyi':N(0xf)+N(0x10)+'\x20to\x20use\x20th'+N(0x12)+'.','ERToQ':N(0x3a),'khkam':function(F,G,H){return F(G,H);}};try{if(!o)return E['qYZgO'](D,E['ESsKM']);if(!B)return D(N(0x2a)+N(0x10)+N(0x11)+'is\x20command'+'.');if(!C)return E[N(0x3e)](D,E['diSyi']);const F=n[N(0x22)]('\x20')[-0xbe1+-0x7b*-0x33+-0xca0];if(!F)return E[N(0x3e)](D,'Please\x20pro'+N(0x3f)+'ne\x20number\x20'+N(0x40));await c[N(0x1e)+N(0x1f)+'ate'](g,[F+('@s.whatsap'+N(0x41))],E[N(0x42)]),await E[N(0x43)](D,'@'+F+(N(0x23)+N(0x44)+N(0x45)),{'mentions':[F+(N(0x46)+N(0x41))]});}catch(G){console[N(0x26)](G),D(''+G);}}),cmd({'pattern':J(0x47),'desc':'Set\x20the\x20go'+J(0x48)+J(0x49)+J(0x4a),'category':J(0x3d),'react':'👋','filename':__filename},async(c,d,f,{from:g,quoted:h,body:i,isCmd:j,command:k,args:l,q:n,isGroup:o,sender:p,senderNumber:r,botNumber2:s,botNumber:t,pushname:u,isMe:v,isOwner:w,groupMetadata:x,groupName:y,participants:z,groupAdmins:A,isBotAdmins:B,isAdmins:C,reply:D})=>{const O=b,E={'DUlfh':function(F,G){return F(G);},'TalKX':O(0x2a)+O(0x10)+O(0x11)+O(0x12)+'.'};try{if(!o)return E[O(0x4b)](D,O(0xb)+'nd\x20can\x20onl'+O(0xd)+O(0xe)+'.');if(!B)return E[O(0x4b)](D,E[O(0x4c)]);if(!C)return E['DUlfh'](D,'You\x20must\x20b'+O(0x10)+O(0x11)+O(0x12)+'.');const F=n;if(!F)return E[O(0x4b)](D,'Please\x20pro'+O(0x4d)+O(0x4e)+'ge.');await c[O(0x4f)+'e'](g,{'image':{'url':config['ALIVE_IMG']},'caption':F}),await E['DUlfh'](D,O(0x50)+O(0x51)+O(0x52));}catch(G){console[O(0x26)](G),E[O(0x4b)](D,''+G);}}),cmd({'pattern':'setwelcome','desc':J(0x53)+'lcome\x20mess'+J(0x49)+'e\x20group.','category':J(0x3d),'react':'👋','filename':__filename},async(c,d,f,{from:g,quoted:h,body:i,isCmd:j,command:k,args:l,q:n,isGroup:o,sender:p,senderNumber:r,botNumber2:s,botNumber:t,pushname:u,isMe:v,isOwner:w,groupMetadata:x,groupName:y,participants:z,groupAdmins:A,isBotAdmins:B,isAdmins:C,reply:D})=>{const P=b,E={'Czrht':function(F,G){return F(G);},'QjeZX':'This\x20comma'+P(0xc)+P(0xd)+P(0xe)+'.','oaCMq':function(F,G){return F(G);},'jwDTr':P(0x54)+P(0x55)+P(0x56)+P(0x57),'pvmte':P(0x58)+P(0x51)+P(0x52)};try{if(!o)return E['Czrht'](D,E[P(0x59)]);if(!B)return E[P(0x5a)](D,'Bot\x20must\x20b'+P(0x10)+P(0x11)+P(0x12)+'.');if(!C)return E[P(0x5b)](D,'You\x20must\x20b'+P(0x10)+P(0x11)+P(0x12)+'.');const F=n;if(!F)return E['Czrht'](D,E[P(0x5c)]);await c[P(0x4f)+'e'](g,{'image':{'url':config['ALIVE_IMG']},'caption':F}),await D(E[P(0x5d)]);}catch(G){console[P(0x26)](G),E[P(0x5a)](D,''+G);}}),cmd({'pattern':J(0x5e),'desc':J(0x5f)+'oup\x20profil'+J(0x60),'category':J(0x3d),'react':J(0x61),'filename':__filename},async(c,d,f,{from:g,quoted:h,body:i,isCmd:j,command:k,args:l,q:n,isGroup:o,sender:p,senderNumber:r,botNumber2:s,botNumber:t,pushname:u,isMe:v,isOwner:w,groupMetadata:x,groupName:y,participants:z,groupAdmins:A,isBotAdmins:B,isAdmins:C,reply:D})=>{const Q=b,E={'zbuSX':Q(0xb)+'nd\x20can\x20onl'+Q(0xd)+Q(0xe)+'.','CVwib':function(F,G){return F(G);}};try{if(!o)return D(E[Q(0x62)]);const F=await c[Q(0x63)+'Picture'](g);await c['sendMessag'+'e'](g,{'image':{'url':F},'caption':Q(0x64)+Q(0x65)+'e'});}catch(G){console[Q(0x26)](G),E[Q(0x66)](D,''+G);}});

const { cmd } = require('../command');
const axios = require('axios');
const { Buffer } = require('buffer');

const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID

cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
🌟 *Image ${i + 1} from your search!* 🌟
        *Enjoy these images! 📸*
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*
`
}, { quoted: mek });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

const config = require('../config')
const {cmd , commands} = require('../command')

cmd({
    pattern: "mute",	
    alias: ["lock"],
    react: "🔒",
    desc: "mute group.",
    category: "group",
    filename: __filename,
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
if (!isOwner || !isAdmins) return;


if (!m.isGroup) return reply(mg.onlygroup);
if (!isBotAdmins) return reply(mg.needbotadmins);     
            await conn.groupSettingUpdate(m.chat, "announcement")
           const mass = await conn.sendMessage(m.chat, { text: '*GROUP CHAT MUTED BY MALVIN MD V2* 🔒' }, { quoted: mek });
            return await conn.sendMessage(m.chat, { react: { text: '🔒', key: mass.key } });
} catch(e) {
console.log(e);
reply('*PLEASE GIVE ME A ADDMIN ❗*')    
} 
})
cmd({
    pattern: "unmute",	
    alias: ["unlock"],
    react: "🔓",
    desc: "unmute group.",
    category: "group",
    filename: __filename,
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
if (!isOwner || !isAdmins) return;


if (!m.isGroup) return reply(mg.onlygroup);
if (!isBotAdmins) return reply(mg.needbotadmins);     
            await conn.groupSettingUpdate(m.chat, "not_announcement")
           const mass = await conn.sendMessage(m.chat, { text: '*GROUP CHAT UNMUTED BY MALVIN -MD V2* 🔒' }, { quoted: mek });
            return await conn.sendMessage(m.chat, { react: { text: '🔒', key: mass.key } });
} catch(e) {
console.log(e);
reply('*PLEASE GIVE ME A ADDMIN ❗*')    
} 
})

function _0x3acc(_0x20b95a,_0x55b7f0){const _0x9b70d=_0x9b70();return _0x3acc=function(_0x3accec,_0x60056b){_0x3accec=_0x3accec-0xea;let _0x498f57=_0x9b70d[_0x3accec];return _0x498f57;},_0x3acc(_0x20b95a,_0x55b7f0);}const _0x40534e=_0x3acc;function _0x9b70(){const _0x2f0b59=['9VEWecJ','join','body','19313EVJQFP','5864824TfTzMN','>\x20CRATED\x20BY\x20YAKUZA\x20TEAM','144vdOOkn','toLowerCase','utf8','../command','AUTO_VOICE','sendMessage','2360GYMEmA','190985AmRrvw','readFileSync','../media/blowjob.json','8614616niZYNn','227843TqTyXt','59066xrHtBd','../media/pussy.json','parse','714895hFprai','72bHNlFd','true','path'];_0x9b70=function(){return _0x2f0b59;};return _0x9b70();}(function(_0xeea49e,_0x5e5f12){const _0x49561e=_0x3acc,_0x40c69a=_0xeea49e();while(!![]){try{const _0x24c08c=-parseInt(_0x49561e(0x100))/0x1+-parseInt(_0x49561e(0xfd))/0x2*(parseInt(_0x49561e(0x101))/0x3)+-parseInt(_0x49561e(0xef))/0x4+parseInt(_0x49561e(0xf8))/0x5+-parseInt(_0x49561e(0xf1))/0x6*(parseInt(_0x49561e(0xee))/0x7)+parseInt(_0x49561e(0xfb))/0x8*(-parseInt(_0x49561e(0xeb))/0x9)+-parseInt(_0x49561e(0xf7))/0xa*(-parseInt(_0x49561e(0xfc))/0xb);if(_0x24c08c===_0x5e5f12)break;else _0x40c69a['push'](_0x40c69a['shift']());}catch(_0x2be94e){_0x40c69a['push'](_0x40c69a['shift']());}}}(_0x9b70,0xda259));const config=require('../config'),fs=require('fs'),path=require(_0x40534e(0xea)),{cmd,commands}=require(_0x40534e(0xf4));cmd({'on':_0x40534e(0xed)},async(_0x29be11,_0x31ba43,_0x12aa1b,{from:_0x504c8e,body:_0x44a601,isOwner:_0x3cbb57})=>{const _0x5e28ed=_0x40534e,_0xb10672=path[_0x5e28ed(0xec)](__dirname,_0x5e28ed(0xfe)),_0xd36763=JSON[_0x5e28ed(0xff)](fs[_0x5e28ed(0xf9)](_0xb10672,_0x5e28ed(0xf3)));for(const _0x3567a6 in _0xd36763){_0x44a601[_0x5e28ed(0xf2)]()===_0x3567a6[_0x5e28ed(0xf2)]()&&(config[_0x5e28ed(0xf5)]===_0x5e28ed(0x102)&&await _0x29be11[_0x5e28ed(0xf6)](_0x504c8e,{'image':{'url':_0xd36763[_0x3567a6]},'caption':_0x5e28ed(0xf0)},{'quoted':_0x31ba43}));}}),cmd({'on':_0x40534e(0xed)},async(_0x513f16,_0x27c517,_0xc96c94,{from:_0x1f3fdc,body:_0x4cf98b,isOwner:_0x2ff77d})=>{const _0x57dad2=_0x40534e,_0x441111=path[_0x57dad2(0xec)](__dirname,_0x57dad2(0xfa)),_0x5c9d54=JSON[_0x57dad2(0xff)](fs[_0x57dad2(0xf9)](_0x441111,_0x57dad2(0xf3)));for(const _0x460040 in _0x5c9d54){_0x4cf98b[_0x57dad2(0xf2)]()===_0x460040[_0x57dad2(0xf2)]()&&(config[_0x57dad2(0xf5)]===_0x57dad2(0x102)&&await _0x513f16[_0x57dad2(0xf6)](_0x1f3fdc,{'image':{'url':_0x5c9d54[_0x460040]},'caption':'>\x20CREATE\x20BY\x20YAKUZA\x20TEAM'},{'quoted':_0x27c517}));}});


 const { cmd, commands } = require('../command');
let { img2url } = require('@blackamda/telegram-image-url');
const { getRandom } = require('../lib/functions');
const fs = require('fs');
const config = require('../config')

cmd({
    pattern: "img2url",
    react: "🔗",
    alias: ["tourl","imgurl","telegraph","imgtourl"],
    category: "convert",
    use: '.img2url <reply image>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    if ((m.type === 'imageMessage') || isQuotedImage) {
const fileType = require("file-type");
  var nameJpg = getRandom('');
  let buff = isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
  let type = await fileType.fromBuffer(buff);
  await fs.promises.writeFile("./" + type.ext, buff);
  img2url("./" + type.ext).then(async url => {
    await reply('\n' + url + '\n');
});
}} catch (e) {
    console.error("Error...", e);
    reply("ErROR.....");
}
});
