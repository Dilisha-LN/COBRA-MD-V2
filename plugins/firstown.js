
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
//==

//===
const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
cmd({
    pattern: "alive",
    react: "👋",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: config.ALIVE_MSG},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})

//============ping=======
cmd({
    pattern: "ping",
    react: "🦚",
    alias: ["speed"],
    desc: "Check bot\'s ping",
    category: "main",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: '```Pinging To index.js!!!```'  }, { quoted: mek } )
var final = new Date().getTime();
return await conn.edit(ping, '*Pong*\n *' + (final - inital) + ' ms* ' )
} catch (e) {
reply(`${e}`)
console.log(e)
}
})

//===========menu========
cmd({
    pattern: "menu2",
    desc: "To get the menu.",
    react: "📜",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
ai: '',
tools: '',
search: '',
fun: '',
voice: '',
other: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `.${commands[i].pattern}\n`;
 }
}

let madeMenu = `
👋 𝐇𝐄𝐋𝐋𝐎, ${pushname}!

✨ 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 C͜͡OBRA-MD ๛ ✨ 
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ яυηтιмє * ${runtime(process.uptime())}
│◈ σωηєя ηαмє * your name
│◈ σωηєя ηυмвєя * your number 
╰──────────●●►
╭──────────●●►
 📥 *𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.download}
╰───────────●●►
╭──────────●●►
 👾 *𝐀𝐢 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.ai}
╰───────────●●►
╭──────────●●►
 🔧 *𝐌𝐚𝐢𝐧 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.main}
╰───────────●●►
╭──────────●●►
 🎉 *𝐅𝐮𝐧 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.fun}
╰───────────●●►
╭──────────●●►
 🔄 *𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.convert}
╰───────────●●►
╭──────────●●►
 🔍 *𝐒𝐞𝐚𝐫𝐜𝐡 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.search}
╰───────────●●►
╭──────────●●►
 👥 *𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.group}
╰───────────●●►
╭──────────●●►
 🔒 *𝐎𝐰𝐧𝐞𝐫 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.owner}
╰───────────●●►
╭──────────●●►
 ⚙️ *𝐎𝐭𝐡𝐞𝐫 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.other}
╰───────────●●►
╭──────────●●►
 🛠️ *𝐓𝐨𝐨𝐥𝐬 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.tools}
╰───────────●●►

> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ C͜͡OBRA-MD ๛*`

return await conn.sendMessage(from,{image: {url: `https://i.ibb.co/0q2BTZY/1374.jpg`},caption:madeMenu},{quoted: mek})
}catch(e){
console.log(e)
reply(`𝔼𝕣𝕣𝕣𝕠𝕣`)
}
})

//==
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fs = require('fs');
const axios = require('axios')
var imgmsg = "*Give me a anime name !*"
var descgs = "It gives details of given anime name."
var cants = "I cant find this anime."

cmd({
    pattern: "loli",
    alias: ["imgloli"],
    react: '🧧',
    desc: "Download anime loli images.",
    category: "anime",
    use: '.loli',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let res = await axios.get('https://api.lolicon.app/setu/v2?num=1&r18=0&tag=lolicon')
let wm = `🧧 Random loli image

> *@CREATE-C͜͡OBRA-MD ๛..*`
await conn.sendMessage(from, { image: { url: res.data.data[0].urls.original }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

cmd({
    pattern: "waifu",
    alias: ["imgwaifu"],
    react: '🧧',
    desc: "Download anime waifu images.",
    category: "anime",
    use: '.waifu',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/waifu')
let wm = `🧧 Random Waifu image

> *©@CREATE-C͜͡OBRA-MD ๛..*`
await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

cmd({
    pattern: "neko",
    alias: ["imgneko"],
    react: '🧧',
    desc: "Download anime neko images.",
    category: "anime",
    use: '.neko',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/neko')
let wm = `🧧 Random neko image

> *©@CREATE-C͜͡OBRA-MD ๛*`
await conn.sendMessage(from, { image: { url: res.data.url  }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})
  
cmd({
    pattern: "megumin",
    alias: ["imgmegumin"],
    react: '🧧',
    desc: "Download anime megumin images.",
    category: "anime",
    use: '.megumin',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/megumin')
let wm = `🧧 Random megumin image

> *©CREATE-C͜͡OBRA-MD ๛...*`
await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

cmd({
    pattern: "maid",
    alias: ["imgmaid"],
    react: '🧧',
    desc: "Download anime maid images.",
    category: "anime",
    use: '.maid',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.im/search/?included_tags=maid')
let wm = `🧧 Random maid image

> *©CARATE BY C͜͡OBRA-MD ๛*`
await conn.sendMessage(from, { image: { url: res.data.images[0].url  }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

cmd({
    pattern: "awoo",
    alias: ["imgawoo"],
    react: '🧧',
    desc: "Download anime awoo images.",
    category: "anime",
    use: '.awoo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/awoo')
let wm = `🧧 Random awoo image

> *@CREATE-BY-C͜͡OBRA-MD ๛*`
await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})
  
//=========
const _0x4522e6=_0x4acc;function _0x511f(){const _0x1aca24=['name','2553132MfWDRA','https://bk9.fun/download/apk?id=','2044404UpSUQA','apk','sendMessage','Download\x20apk\x20sever\x202','1796VyZege','5665SOLbYT','774057zJOlJt','287UwSRnV','log','152050tEpvMd','reply','BK9','120808ZUWRQW','../command','1449ZCQdTq','../lib/functions','1639906UqBGIw'];_0x511f=function(){return _0x1aca24;};return _0x511f();}(function(_0x484c69,_0x306b58){const _0x15f8c8=_0x4acc,_0xc6daba=_0x484c69();while(!![]){try{const _0x508e5f=-parseInt(_0x15f8c8(0x1ae))/0x1+-parseInt(_0x15f8c8(0x1b8))/0x2+-parseInt(_0x15f8c8(0x1ba))/0x3+-parseInt(_0x15f8c8(0x1ac))/0x4*(parseInt(_0x15f8c8(0x1ad))/0x5)+parseInt(_0x15f8c8(0x1bc))/0x6+parseInt(_0x15f8c8(0x1af))/0x7*(parseInt(_0x15f8c8(0x1b4))/0x8)+-parseInt(_0x15f8c8(0x1b6))/0x9*(-parseInt(_0x15f8c8(0x1b1))/0xa);if(_0x508e5f===_0x306b58)break;else _0xc6daba['push'](_0xc6daba['shift']());}catch(_0x1746b2){_0xc6daba['push'](_0xc6daba['shift']());}}}(_0x511f,0x6eddd));const {cmd,commands}=require(_0x4522e6(0x1b5)),{fetchJson}=require(_0x4522e6(0x1b7));function _0x4acc(_0x3f6064,_0x56899c){const _0x511f84=_0x511f();return _0x4acc=function(_0x4accf7,_0x281ae2){_0x4accf7=_0x4accf7-0x1ac;let _0x26ef4f=_0x511f84[_0x4accf7];return _0x26ef4f;},_0x4acc(_0x3f6064,_0x56899c);}cmd({'pattern':_0x4522e6(0x1bd),'desc':_0x4522e6(0x1bf),'category':'download','filename':__filename},async(_0x56c54f,_0x5d95e6,_0x33c882,{from:_0x31983a,quoted:_0x28825a,body:_0x3a6929,isCmd:_0x55a9be,command:_0x5e9179,args:_0x2b7181,q:_0x6a560b,isGroup:_0x566d65,sender:_0x28313c,senderNumber:_0x2328b5,botNumber2:_0x3fca87,botNumber:_0x4e38fd,pushname:_0x127ae6,isMe:_0x41a91d,isOwner:_0x4ee8fa,groupMetadata:_0x1cda80,groupName:_0x1af5b8,participants:_0x44a8e9,groupAdmins:_0x17d8ae,isBotAdmins:_0x504599,isAdmins:_0x4262f6,reply:_0x2fa578})=>{const _0x4fe3b7=_0x4522e6;try{if(!_0x6a560b)return _0x33c882[_0x4fe3b7(0x1b2)]('*Provide\x20an\x20app\x20name*');let _0x557a36=await fetchJson('https://bk9.fun/search/apk?q='+_0x6a560b),_0x20f390=await fetchJson(_0x4fe3b7(0x1bb)+_0x557a36[_0x4fe3b7(0x1b3)][0x0]['id']);_0x2fa578('> *©DOWNLOADING YOU APK PLEASE WAIT 🦚.*\x0a>\x20COBRA-MD'),await _0x56c54f[_0x4fe3b7(0x1be)](_0x31983a,{'document':{'url':_0x20f390[_0x4fe3b7(0x1b3)]['dllink']},'fileName':_0x20f390[_0x4fe3b7(0x1b3)][_0x4fe3b7(0x1b9)],'mimetype':'application/vnd.android.package-archive','caption':'*©\x20CREATED\x20BY\x20COBRA-MD\x20·\x20·\x20·*\x20💛'},{'quoted':_0x5d95e6});}catch(_0x28a23b){console[_0x4fe3b7(0x1b0)](_0x28a23b),_0x2fa578(''+_0x28a23b);}});
//=========
const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

// API LINK
const apilink = 'https://dizer-adaderana-news-api.vercel.app/news'; 

cmd({
    pattern: "derananews",
    alias: ["derana", "news3"],
    react: "🏛",
    desc: "",
    category: "news",
    use: '.derana',
    filename: __filename
},
async (conn, mek, m, { from, quoted }) => {
    try {
        // Fetch news data from the API
        const response = await axios.get(apilink);
        const news = response.data[0]; // Access the first item of the array

        // Construct the message
        const msg = `
           📑 *DERANA NEWS* 📑

• *Title* - ${news.title || 'Not available'}
• *News* - ${news.description || 'Not available'}
• *Date* - ${news.time || 'Not available'}
• *Link* - ${news.new_url || 'Not available'}

⚡ *Powered By ${news.powered_by || 'Unknown'}*
        `;

        // Send the news as a message
        await conn.sendMessage(from, { 
            image: { url: news.image || '' }, 
            caption: msg 
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply('⚠️ දෝෂයක් සිදු විය. API එකෙන් දත්ත ලබා ගැනීමට නොහැකි විය!');
    }
});
//==========
function _0x4433(_0xc53051,_0x6b3048){const _0xfd50c4=_0xfd50();return _0x4433=function(_0x443377,_0x1d0145){_0x443377=_0x443377-0xe0;let _0xaf4626=_0xfd50c4[_0x443377];return _0xaf4626;},_0x4433(_0xc53051,_0x6b3048);}const _0x1ac327=_0x4433;(function(_0x4f4ede,_0xbb8250){const _0x6fc053=_0x4433,_0x3b995b=_0x4f4ede();while(!![]){try{const _0x3c532c=-parseInt(_0x6fc053(0x16c))/0x1+parseInt(_0x6fc053(0x145))/0x2+parseInt(_0x6fc053(0x107))/0x3*(parseInt(_0x6fc053(0x120))/0x4)+parseInt(_0x6fc053(0xf6))/0x5*(-parseInt(_0x6fc053(0x161))/0x6)+-parseInt(_0x6fc053(0x13e))/0x7+parseInt(_0x6fc053(0x11c))/0x8+parseInt(_0x6fc053(0x13a))/0x9*(parseInt(_0x6fc053(0xe9))/0xa);if(_0x3c532c===_0xbb8250)break;else _0x3b995b['push'](_0x3b995b['shift']());}catch(_0x39981b){_0x3b995b['push'](_0x3b995b['shift']());}}}(_0xfd50,0xab22b));function _0xfd50(){const _0x5eef8d=['xnxxdown','\x0a┏━┫*⚬C͜͡OBRA-MD๛-ᴍꜰɪʀᴇ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a*ꜰɪʟᴇ\x20ɴᴀᴍᴇ\x20:*\x20','content','contextInfo','meta[property=\x22og:image\x22]','\x0a\x0a*🔢\x20ʀᴇᴘʟʏ\x20ʙᴇʟᴏᴡ\x20ᴛʜᴇ\x20ɴᴜᴍʙᴇʀ*\x0a\x0a*ᴠɪᴅᴇᴏ\x20ꜰɪʟᴇ*\x20🎬\x0a\x0a*1*\x20\x20\x20\x20\x20┃\x20\x20*ꜱᴅ\x20Qᴜᴀʟɪᴛʏ*\x0a*2*\x20\x20\x20\x20\x20┃\x20\x20*ʜᴅ\x20Qᴜᴀʟɪᴛʏ*\x0a\x0a*ᴀᴜᴅɪᴏ\x20ꜰɪʟᴇ*🎧\x0a\x0a*3*\x20\x20\x20\x20\x20┃\x20\x20*ᴀᴜᴅɪᴏ*\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a\x20\x20\x20\x20\x20','facebook','nsfw','https://www.dark-yasiya-api.site/download/twitter?url=','html5player.setVideoHLS\x5c(\x27(.*?)\x27\x5c);','ʟᴀʀᴀ-ᴍᴅ/TWDL.mp3','title','https://','*©\x20ᴄʀᴇᴀᴛᴇᴅ\x20ʙʏ\x20KING\x20DILISHA\x20·\x20·\x20·*','45348cbRzXi','thumbnail','An\x20error\x20occurred:\x20','120363192254044294@newsletter','catch','COBRA-MD/FBDL.mp3','https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/20241214_204755.jpg','Download\x20apk.','meta[property=\x22og:video:height\x22]','../command','load','957594dShWPN','twdl','download_mp3','duration','message','views','updated','ruhend-scraper','html5player.setThumbUrl169\x5c(\x27(.*?)\x27\x5c);','\x0a\x0a*📦\x20Sɪᴢᴇ\x20:*\x20','sendMessage','To\x20download\x20instagram\x20videos.','*Please\x20give\x20me\x20url\x20!!*','Failed\x20to\x20fetch\x20MediaFire\x20download\x20link.\x20Ensure\x20the\x20link\x20is\x20valid\x20and\x20public.','@mrnima/tiktok-downloader','6123190ZOvUFJ','https://github.com/sadiyamin','\x0a\x0a•\x20*Views*\x20-\x20','like','Please\x20Give\x20Me\x20a\x20vaild\x20Link...','*Error\x20!!*','94779062397@s.whatsapp.net','startsWith','To\x20download\x20Gdrive\x20files.','*`Need\x20URL`*','COBRA\x20MD','datalist','\x0a\x0a>\x20C͜͡OBRA-MD ๛\x20✻\x0a\x20\x20\x20\x20\x20\x20\x20\x20','360GDxIWd','https://www.dark-yasiya-api.site/download/mfire?url=','Download\x20Facebook\x20videos','xvdown','\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a','fileType','files','Download\x20xnxx\x20videos','react','list','stanzaId','result','mediafire','match','meta[property=\x22og:video:type\x22]','messages','name','3GRGVxd','html','text','links','download\x20tt\x20videos','extendedTextMessage','html5player.setThumbSlide\x5c(\x27(.*?)\x27\x5c);','meta[property=\x22og:duration\x22]','span.metadata','key','mimetype','path_alt','Download\x20Twitter\x20videos','html5player.setVideoUrlHigh\x5c(\x27(.*?)\x27\x5c);','apk','html5player.setThumbUrl\x5c(\x27(.*?)\x27\x5c);','\x0a\x0a•\x20*Size*\x20-\x20','\x0a\x0a*📆\x20Lᴀꜱᴛ\x20Uᴘᴅᴀᴛᴇ\x20:*\x20','axios','\x0a\x0a•\x20*Deslike*\x20-\x20','https://www.dark-yasiya-api.site/download/xvideo?url=','3238280zuYaUp','fileName','**©\x20ᴄʀᴇᴀᴛᴇᴅ\x20ʙʏ\x20KING\x20DILISHA\x20·\x20·\x20·**','attr','3498884PzMynV','\x0a\x0a•\x20*Like*\x20-\x20','xnxxdl','C͜͡OBRA-MD ๛\x20✻','download','participant','2.3','*`Need\x20url`*','audio/mpeg','\x0a\x0a*👤\x20Dᴇᴠᴇʟᴏᴘᴇʀꜱ\x20:*\x20','&apikey=mnp3grlZ','*©\x20ᴄʀᴇᴀᴛᴇᴅ\x20ʙʏ\x20DILISHA\x20KING\x20·\x20·\x20·*\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻','dlxnxx','error','size','\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴀᴘᴋ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a*🏷️\x20Nᴀᴍᴇ\x20:*\x20','meta[property=\x22og:video:width\x22]','deslike','developer','dl_link','video/mp4','high','\x0a\x20\x20\x20🔞\x20*XVIDEO\x20DOWNLOADER*\x20🔞\x0a\x0a\x20\x20\x20\x20\x20\x0a•\x20*Title*\x20-\x20','get','1.2','status','18ufoIqJ','\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴛᴡɪᴛᴇʀ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a*🔢\x20ʀᴇᴘʟʏ\x20ʙᴇʟᴏᴡ\x20ᴛʜᴇ\x20ɴᴜᴍʙᴇʀ*\x0a\x0a*ᴠɪᴅᴇᴏ\x20ᴅᴏᴡɴʟᴏᴀᴅ\x20🎬*\x0a\x0a*1.1*\x20\x20\x20\x20\x20┃\x20\x20*ꜱᴅ\x20Qᴜᴀʟɪᴛʏ*\x0a*1.2*\x20\x20\x20\x20\x20┃\x20\x20*ʜᴅ\x20Qᴜᴀʟɪᴛʏ*\x0a\x0a*ᴀᴜᴅɪᴏ\x20ᴅᴏᴡɴʟᴏᴀᴅ\x20🎧*\x0a\x0a*2.1*\x20\x20\x20\x20\x20┃\x20\x20*ᴀᴜᴅɪᴏ*\x0a*2.2*\x20\x20\x20\x20\x20┃\x20\x20*ᴅᴏᴄᴜᴍᴇɴᴛ*\x0a*2.3*\x20\x20\x20\x20\x20┃\x20\x20*ᴠᴏɪᴄᴇ*\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a','reply','KING\x20DILISHA','7218351sRBhVb','then','conversation','data','log','Please\x20provide\x20a\x20valid\x20MediaFire\x20link.','application/vnd.android.package-archive','1459580jExLka','audio/mp4','Download\x20xvideos\x20videos','tweet','@mrnima/facebook-downloader','messages.upsert','2.1','cheerio','html5player.setThumbSlideBig\x5c(\x27(.*?)\x27\x5c);','https://api.fgmods.xyz/api/downloader/gdrive?url=','1.1','2.2','remoteJid','MB\x0a\x0a*🔖\x20Pᴀᴄᴋᴀɢᴇ\x20:*\x20'];_0xfd50=function(){return _0x5eef8d;};return _0xfd50();}const {fetchJson}=require('../lib/functions'),{downloadTiktok}=require(_0x1ac327(0xe8)),{facebook}=require(_0x1ac327(0x149)),cheerio=require(_0x1ac327(0x14c)),{igdl}=require(_0x1ac327(0xe1)),axios=require(_0x1ac327(0x119)),{cmd,commands}=require(_0x1ac327(0x16a));cmd({'pattern':'tiktok','alias':['tt'],'react':'🎥','desc':_0x1ac327(0x10b),'category':_0x1ac327(0x124),'filename':__filename},async(_0x29bd6f,_0x7a8d02,_0x236587,{from:_0x1e41c0,quoted:_0x5962f0,body:_0x2e4298,isCmd:_0x2d1506,command:_0x485ca1,args:_0x26ee92,q:_0x45d8fe,isGroup:_0x5630bd,sender:_0xc0e8f3,senderNumber:_0x8d1319,botNumber2:_0x48d1db,botNumber:_0xbae04,pushname:_0x4c17e3,isMe:_0x1b9a78,isOwner:_0x275c02,groupMetadata:_0x309c5a,groupName:_0x3e93f9,participants:_0x58557b,groupAdmins:_0x868db8,isBotAdmins:_0x23e710,isAdmins:_0x2ea035,reply:_0x37b263})=>{const _0x1f6710=_0x1ac327;try{if(!_0x45d8fe&&!_0x45d8fe[_0x1f6710(0xf0)](_0x1f6710(0x15f)))return _0x37b263(_0x1f6710(0x127));_0x236587[_0x1f6710(0xfe)]('⬇️');let _0x4118f3=await downloadTiktok(_0x45d8fe),_0x14189e='\x0a┏━┫*⚬Lααɾα-ᴍᴅ-ᴛɪᴋᴛᴏᴋ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a*ᴛɪᴛʟᴇ*:\x20\x20'+_0x4118f3['result'][_0x1f6710(0x15e)]+_0x1f6710(0x158);const _0xcd2d03=await _0x29bd6f[_0x1f6710(0xe4)](_0x1e41c0,{'image':{'url':_0x4118f3[_0x1f6710(0x101)]['image']},'caption':_0x14189e,'contextInfo':{'mentionedJid':['94771098429@s.whatsapp.net'],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x1f6710(0x164),'newsletterName':_0x1f6710(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x1f6710(0xf3),'body':_0x1f6710(0x13d),'mediaType':0x1,'sourceUrl':_0x1f6710(0xea),'thumbnailUrl':_0x1f6710(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x7a8d02}),_0x1f8f50=_0xcd2d03[_0x1f6710(0x110)]['id'];_0x29bd6f['ev']['on'](_0x1f6710(0x14a),async _0x3dc9b0=>{const _0x224b59=_0x1f6710,_0x8c4899=_0x3dc9b0[_0x224b59(0x105)][0x0];if(!_0x8c4899[_0x224b59(0x170)])return;const _0x28fd23=_0x8c4899['message'][_0x224b59(0x140)]||_0x8c4899[_0x224b59(0x170)][_0x224b59(0x10c)]?.['text'],_0xb537b=_0x8c4899[_0x224b59(0x110)]['remoteJid'],_0x356368=_0x8c4899['key'][_0x224b59(0x125)]||_0x8c4899[_0x224b59(0x110)][_0x224b59(0x151)],_0x10addd=_0x8c4899['message']['extendedTextMessage']&&_0x8c4899[_0x224b59(0x170)][_0x224b59(0x10c)][_0x224b59(0x156)][_0x224b59(0x100)]===_0x1f8f50;if(_0x10addd){await _0x29bd6f[_0x224b59(0xe4)](_0xb537b,{'react':{'text':'⬇️','key':_0x8c4899[_0x224b59(0x110)]}});let _0x50617e=_0x4118f3[_0x224b59(0x101)];await _0x29bd6f[_0x224b59(0xe4)](_0xb537b,{'react':{'text':'⬆️','key':_0x8c4899['key']}});if(_0x28fd23==='1')await _0x29bd6f[_0x224b59(0xe4)](_0xb537b,{'video':{'url':_0x50617e[_0x224b59(0x133)]['download_mp4_1']},'caption':_0x224b59(0x160),'contextInfo':{'mentionedJid':[_0x224b59(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':'120363192254044294@newsletter','newsletterName':_0x224b59(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x224b59(0xf3),'body':_0x224b59(0x13d),'mediaType':0x1,'sourceUrl':'https://github.com/sadiyamin','thumbnailUrl':_0x224b59(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x8c4899});else{if(_0x28fd23==='2')await _0x29bd6f[_0x224b59(0xe4)](_0xb537b,{'video':{'url':_0x50617e[_0x224b59(0x133)]['download_mp4_2']},'caption':_0x224b59(0x160),'contextInfo':{'mentionedJid':[_0x224b59(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':'120363192254044294@newsletter','newsletterName':_0x224b59(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x224b59(0xf3),'body':_0x224b59(0x13d),'mediaType':0x1,'sourceUrl':_0x224b59(0xea),'thumbnailUrl':_0x224b59(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x8c4899});else _0x28fd23==='3'&&await _0x29bd6f[_0x224b59(0xe4)](_0xb537b,{'audio':{'url':_0x50617e[_0x224b59(0x133)][_0x224b59(0x16e)]},'mimetype':_0x224b59(0x128)},{'quoted':_0x8c4899});}}});}catch(_0x347969){console[_0x1f6710(0x142)](_0x347969),_0x37b263(''+_0x347969);}}),cmd({'pattern':'fb','alias':[_0x1ac327(0x159)],'desc':_0x1ac327(0xf8),'category':_0x1ac327(0x124),'filename':__filename},async(_0x3a191b,_0x492873,_0x4a2db5,{from:_0x9f3274,quoted:_0x527579,body:_0x4d4c92,isCmd:_0x3a3ab3,command:_0x264eb1,args:_0x544630,q:_0xdb06d2,isGroup:_0x6acfde,sender:_0x3a4b5c,senderNumber:_0x356bd8,botNumber2:_0x4e23b7,botNumber:_0x33dc06,pushname:_0x3e0bfb,isMe:_0x136a11,isOwner:_0x25bd4e,groupMetadata:_0x2aa9c3,groupName:_0x3470da,participants:_0x446b8c,groupAdmins:_0x23dbc0,isBotAdmins:_0x2a640c,isAdmins:_0x3b238e,reply:_0x412d09})=>{const _0x521283=_0x1ac327;try{if(!_0xdb06d2||!_0xdb06d2['startsWith'](_0x521283(0x15f)))return _0x3a191b['sendMessage'](_0x9f3274,{'text':_0x521283(0xf2)},{'quoted':_0x492873});await _0x3a191b[_0x521283(0xe4)](_0x9f3274,{'react':{'text':'⏳','key':_0x492873['key']}});const _0x593464=await facebook(_0xdb06d2),_0x5aa00c='\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ꜰʙ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a*⌛ᴅᴜʀᴀᴛɪᴏɴ*\x20:\x20'+_0x593464['result'][_0x521283(0x16f)]+'\x0a\x0a*🔢\x20ʀᴇᴘʟʏ\x20ʙᴇʟᴏᴡ\x20ᴛʜᴇ\x20ɴᴜᴍʙᴇʀ*\x0a\x0a*ᴠɪᴅᴇᴏ\x20ᴅᴏᴡɴʟᴏᴀᴅ\x20🎬*\x0a\x0a*1.1*\x20\x20\x20\x20\x20┃\x20\x20*ꜱᴅ\x20Qᴜᴀʟɪᴛʏ*\x0a*1.2*\x20\x20\x20\x20\x20┃\x20\x20*ʜᴅ\x20Qᴜᴀʟɪᴛʏ*\x0a\x0a*ᴀᴜᴅɪᴏ\x20ᴅᴏᴡɴʟᴏᴀᴅ\x20🎧*\x0a\x0a*2.1*\x20\x20\x20\x20\x20┃\x20\x20*ᴀᴜᴅɪᴏ*\x0a*2.2*\x20\x20\x20\x20\x20┃\x20\x20*ᴅᴏᴄᴜᴍᴇɴᴛ*\x0a*2.3*\x20\x20\x20\x20\x20┃\x20\x20*ᴠᴏɪᴄᴇ*\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a',_0x2ea0ab=await _0x3a191b[_0x521283(0xe4)](_0x9f3274,{'image':{'url':_0x593464[_0x521283(0x101)][_0x521283(0x162)]},'caption':_0x5aa00c,'contextInfo':{'mentionedJid':[_0x521283(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x521283(0x164),'newsletterName':'Lααɾα-ᴍᴅ\x20✻','serverMessageId':0x3e7},'externalAdReply':{'title':_0x521283(0xf3),'body':_0x521283(0x13d),'mediaType':0x1,'sourceUrl':_0x521283(0xea),'thumbnailUrl':_0x521283(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x492873}),_0x3a516a=_0x2ea0ab['key']['id'];_0x3a191b['ev']['on'](_0x521283(0x14a),async _0x2e0760=>{const _0x5eec06=_0x521283,_0x15826f=_0x2e0760[_0x5eec06(0x105)][0x0];if(!_0x15826f[_0x5eec06(0x170)])return;const _0x450970=_0x15826f[_0x5eec06(0x170)][_0x5eec06(0x140)]||_0x15826f[_0x5eec06(0x170)][_0x5eec06(0x10c)]?.[_0x5eec06(0x109)],_0x3d4f58=_0x15826f[_0x5eec06(0x110)][_0x5eec06(0x151)],_0x34f35c=_0x15826f[_0x5eec06(0x110)][_0x5eec06(0x125)]||_0x15826f['key'][_0x5eec06(0x151)],_0x41cfbe=_0x15826f[_0x5eec06(0x170)][_0x5eec06(0x10c)]&&_0x15826f['message'][_0x5eec06(0x10c)][_0x5eec06(0x156)][_0x5eec06(0x100)]===_0x3a516a;if(_0x41cfbe){await _0x3a191b[_0x5eec06(0xe4)](_0x3d4f58,{'react':{'text':'⬇️','key':_0x15826f[_0x5eec06(0x110)]}});let _0x367840=_0x593464[_0x5eec06(0x101)];await _0x3a191b[_0x5eec06(0xe4)](_0x3d4f58,{'react':{'text':'⬆️','key':_0x15826f[_0x5eec06(0x110)]}});if(_0x450970===_0x5eec06(0x14f))await _0x3a191b['sendMessage'](_0x3d4f58,{'video':{'url':_0x367840['links']['SD']},'caption':_0x5eec06(0x160),'contextInfo':{'mentionedJid':[_0x5eec06(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x5eec06(0x164),'newsletterName':_0x5eec06(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x5eec06(0xf3),'body':_0x5eec06(0x13d),'mediaType':0x1,'sourceUrl':_0x5eec06(0xea),'thumbnailUrl':_0x5eec06(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x15826f});else{if(_0x450970===_0x5eec06(0x138))await _0x3a191b['sendMessage'](_0x3d4f58,{'video':{'url':_0x367840[_0x5eec06(0x10a)]['HD']},'caption':_0x5eec06(0x160),'contextInfo':{'mentionedJid':[_0x5eec06(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x5eec06(0x164),'newsletterName':_0x5eec06(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':'LARA\x20MD','body':_0x5eec06(0x13d),'mediaType':0x1,'sourceUrl':_0x5eec06(0xea),'thumbnailUrl':_0x5eec06(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x15826f});else{if(_0x450970===_0x5eec06(0x14b))await _0x3a191b[_0x5eec06(0xe4)](_0x3d4f58,{'audio':{'url':_0x367840['links']['SD']},'mimetype':_0x5eec06(0x128)},{'quoted':_0x15826f});else{if(_0x450970===_0x5eec06(0x150))await _0x3a191b[_0x5eec06(0xe4)](_0x3d4f58,{'document':{'url':_0x367840[_0x5eec06(0x10a)]['SD']},'mimetype':_0x5eec06(0x128),'fileName':_0x5eec06(0x166),'caption':_0x5eec06(0x11e),'contextInfo':{'mentionedJid':['94779062397@s.whatsapp.net'],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':'120363192254044294@newsletter','newsletterName':'Lααɾα-ᴍᴅ\x20✻','serverMessageId':0x3e7},'externalAdReply':{'title':_0x5eec06(0xf3),'body':_0x5eec06(0x13d),'mediaType':0x1,'sourceUrl':_0x5eec06(0xea),'thumbnailUrl':_0x5eec06(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x15826f});else _0x450970===_0x5eec06(0x126)&&await _0x3a191b[_0x5eec06(0xe4)](_0x3d4f58,{'audio':{'url':_0x367840[_0x5eec06(0x10a)]['SD']},'mimetype':'audio/mp4','ptt':!![]},{'quoted':_0x15826f});}}}}});}catch(_0x44a996){console[_0x521283(0x142)](_0x44a996),_0x412d09(''+_0x44a996);}}),cmd({'pattern':'twitter','alias':[_0x1ac327(0x148),_0x1ac327(0x16d)],'desc':_0x1ac327(0x113),'category':'download','filename':__filename},async(_0x2115f2,_0x2e7b7c,_0x35e75e,{from:_0x21fbc2,quoted:_0x7ed43c,body:_0x1074ab,isCmd:_0x7ac63e,command:_0x2632d4,args:_0x24a22e,q:_0x45e793,isGroup:_0x1f4ee7,sender:_0x3a35f3,senderNumber:_0x588460,botNumber2:_0x234f63,botNumber:_0x219fea,pushname:_0x3ef225,isMe:_0x48cd79,isOwner:_0x20dade,groupMetadata:_0x167f0f,groupName:_0x376e36,participants:_0x3d6c39,groupAdmins:_0x217551,isBotAdmins:_0x5985ab,isAdmins:_0x471d26,reply:_0x3e21f6})=>{const _0x298145=_0x1ac327;try{if(!_0x45e793||!_0x45e793[_0x298145(0xf0)](_0x298145(0x15f)))return _0x2115f2[_0x298145(0xe4)](_0x21fbc2,{'text':'❌\x20Please\x20provide\x20a\x20valid\x20Twitter\x20URL.'},{'quoted':_0x2e7b7c});await _0x2115f2[_0x298145(0xe4)](_0x21fbc2,{'react':{'text':'⏳','key':_0x2e7b7c['key']}});const _0x1881af=await axios[_0x298145(0x137)](_0x298145(0x15b)+_0x45e793),_0x32a365=_0x1881af[_0x298145(0x141)];if(!_0x32a365||!_0x32a365[_0x298145(0x139)]||!_0x32a365[_0x298145(0x101)])return _0x35e75e[_0x298145(0x13c)]('Failed\x20to\x20retrieve\x20Twitter\x20video.\x20Please\x20check\x20the\x20link\x20and\x20try\x20again.');const {desc:_0x2506cb,thumb:_0x5e9601,video_sd:_0x1aa0aa,video_hd:_0x2ff751}=_0x32a365[_0x298145(0x101)],_0x21eb95=_0x298145(0x13b),_0xecfab=await _0x2115f2[_0x298145(0xe4)](_0x21fbc2,{'image':{'url':_0x5e9601},'caption':_0x21eb95,'contextInfo':{'mentionedJid':['94771098429@s.whatsapp.net'],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x298145(0x164),'newsletterName':'Lααɾα-ᴍᴅ\x20✻','serverMessageId':0x3e7},'externalAdReply':{'title':_0x298145(0xf3),'body':'KING\x20DILISHA','mediaType':0x1,'sourceUrl':_0x298145(0xea),'thumbnailUrl':_0x298145(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x2e7b7c}),_0x4176ab=_0xecfab[_0x298145(0x110)]['id'];_0x2115f2['ev']['on'](_0x298145(0x14a),async _0x17515b=>{const _0x1bf0ab=_0x298145,_0x340b80=_0x17515b['messages'][0x0];if(!_0x340b80['message'])return;const _0x169212=_0x340b80[_0x1bf0ab(0x170)][_0x1bf0ab(0x140)]||_0x340b80[_0x1bf0ab(0x170)][_0x1bf0ab(0x10c)]?.[_0x1bf0ab(0x109)],_0x270a8c=_0x340b80[_0x1bf0ab(0x110)][_0x1bf0ab(0x151)],_0xe869d6=_0x340b80['message']['extendedTextMessage']&&_0x340b80[_0x1bf0ab(0x170)]['extendedTextMessage']['contextInfo'][_0x1bf0ab(0x100)]===_0x4176ab;if(_0xe869d6){await _0x2115f2['sendMessage'](_0x270a8c,{'react':{'text':'⬇️','key':_0x340b80['key']}});if(_0x169212===_0x1bf0ab(0x14f))await _0x2115f2[_0x1bf0ab(0xe4)](_0x270a8c,{'video':{'url':_0x1aa0aa},'caption':_0x1bf0ab(0x160)},{'quoted':_0x340b80});else{if(_0x169212==='1.2')await _0x2115f2[_0x1bf0ab(0xe4)](_0x270a8c,{'video':{'url':_0x2ff751},'caption':_0x1bf0ab(0x160)},{'quoted':_0x340b80});else{if(_0x169212===_0x1bf0ab(0x14b))await _0x2115f2[_0x1bf0ab(0xe4)](_0x270a8c,{'audio':{'url':_0x1aa0aa},'mimetype':_0x1bf0ab(0x128)},{'quoted':_0x340b80});else{if(_0x169212===_0x1bf0ab(0x150))await _0x2115f2['sendMessage'](_0x270a8c,{'document':{'url':_0x1aa0aa},'mimetype':'audio/mpeg','fileName':_0x1bf0ab(0x15d),'caption':_0x1bf0ab(0x160),'contextInfo':{'mentionedJid':[_0x1bf0ab(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':'120363192254044294@newsletter','newsletterName':_0x1bf0ab(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x1bf0ab(0xf3),'body':'ꜱᴀᴅᴇᴇꜱʜᴀ\x20ᴛʜᴀʀᴜᴍɪɴ','mediaType':0x1,'sourceUrl':_0x1bf0ab(0xea),'thumbnailUrl':'https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/20241214_204755.jpg','renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x340b80});else _0x169212===_0x1bf0ab(0x126)&&await _0x2115f2[_0x1bf0ab(0xe4)](_0x270a8c,{'audio':{'url':_0x1aa0aa},'mimetype':_0x1bf0ab(0x146),'ptt':!![]},{'quoted':_0x340b80});}}}}});}catch(_0x38bbba){console[_0x298145(0x142)](_0x38bbba),_0x3e21f6('An\x20error\x20occurred:\x20'+_0x38bbba);}}),cmd({'pattern':_0x1ac327(0x102),'desc':'To\x20download\x20MediaFire\x20files.','react':'🎥','category':_0x1ac327(0x124),'filename':__filename},async(_0x4fb709,_0x59defa,_0x151856,{from:_0x125094,quoted:_0x4dd329,body:_0x38a7c9,isCmd:_0x5036a0,command:_0x715ece,args:_0x97fbe4,q:_0x2da1d3,isGroup:_0x53341a,sender:_0x810150,senderNumber:_0x341eff,botNumber2:_0x386489,botNumber:_0x146d22,pushname:_0x5d55e9,isMe:_0x40f174,isOwner:_0x4147ee,groupMetadata:_0x3c8a81,groupName:_0x33d5fb,participants:_0x3a47b1,groupAdmins:_0x4bbb23,isBotAdmins:_0x4f5913,isAdmins:_0x27bfbc,reply:_0x4463de})=>{const _0x48192a=_0x1ac327;try{if(!_0x2da1d3)return _0x151856[_0x48192a(0x13c)](_0x48192a(0x143));_0x151856['react']('⬇️');const _0x527270=await axios['get'](_0x48192a(0xf7)+_0x2da1d3),_0x54b6a3=_0x527270[_0x48192a(0x141)];if(!_0x54b6a3||!_0x54b6a3['status']||!_0x54b6a3['result']||!_0x54b6a3['result'][_0x48192a(0x133)])return _0x151856[_0x48192a(0x13c)](_0x48192a(0xe7));const _0x5d9bda=_0x54b6a3['result'][_0x48192a(0x133)],_0x143e71=_0x54b6a3[_0x48192a(0x101)][_0x48192a(0x11d)]||'mediafire_download',_0x26a0dc=_0x54b6a3[_0x48192a(0x101)][_0x48192a(0xfb)]||'application/octet-stream';_0x151856[_0x48192a(0xfe)]('⬆️');let _0x12e5f0=_0x48192a(0x154)+_0x143e71+'\x0a\x0a*ꜰɪʟᴇ\x20ᴛʏᴘᴇ\x20:*\x20'+_0x26a0dc+_0x48192a(0xf5);await _0x4fb709[_0x48192a(0xe4)](_0x125094,{'document':{'url':_0x5d9bda},'mimetype':_0x26a0dc,'fileName':_0x143e71,'caption':_0x12e5f0,'contextInfo':{'mentionedJid':[_0x48192a(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x48192a(0x164),'newsletterName':_0x48192a(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x48192a(0xf3),'body':_0x48192a(0x13d),'mediaType':0x1,'sourceUrl':_0x48192a(0xea),'thumbnailUrl':_0x48192a(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x59defa});}catch(_0x3da7b2){console[_0x48192a(0x12d)](_0x3da7b2),_0x4463de(_0x48192a(0x163)+_0x3da7b2[_0x48192a(0x170)]);}}),cmd({'pattern':'ig','desc':_0x1ac327(0xe5),'react':'🎥','category':'download','filename':__filename},async(_0x45ee96,_0x3b593e,_0x357e54,{from:_0x224efc,quoted:_0x47a508,body:_0x3f473f,isCmd:_0xf8af90,command:_0x2d0e7a,args:_0xd835a5,q:_0xd209ae,isGroup:_0x47468b,sender:_0x2dc92b,senderNumber:_0x1adf48,botNumber2:_0x262cde,botNumber:_0xdc273c,pushname:_0x475357,isMe:_0x324e0d,isOwner:_0x59653d,groupMetadata:_0x445146,groupName:_0x31d8cd,participants:_0x435b4a,groupAdmins:_0x4d0f13,isBotAdmins:_0x4272d2,isAdmins:_0x337cd5,reply:_0x27ecd1})=>{const _0x310412=_0x1ac327;try{if(!_0xd209ae)return _0x357e54['reply'](_0x310412(0xed));_0x357e54[_0x310412(0xfe)]('⬇️');let _0x856d33=await igdl(_0xd209ae),_0x30dac8=await _0x856d33[_0x310412(0x141)];for(let _0x1b693a=0x0;_0x1b693a<0x14;_0x1b693a++){let _0x119f1a=_0x30dac8[_0x1b693a],_0x3a53f0=_0x119f1a['url'];_0x357e54[_0x310412(0xfe)]('⬆️'),await _0x45ee96['sendMessage'](_0x224efc,{'video':{'url':_0x3a53f0},'mimetype':_0x310412(0x134),'caption':_0x310412(0x160),'contextInfo':{'mentionedJid':[_0x310412(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':'120363192254044294@newsletter','newsletterName':_0x310412(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x310412(0xf3),'body':_0x310412(0x13d),'mediaType':0x1,'sourceUrl':_0x310412(0xea),'thumbnailUrl':'https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/20241214_204755.jpg','renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x3b593e}),_0x357e54[_0x310412(0xfe)]('✅');}}catch(_0x2fba0e){console[_0x310412(0x142)](_0x2fba0e);}});async function xdl(_0x35ccff){return new Promise((_0x478bf7,_0x740975)=>{const _0x103e62=_0x4433;fetch(''+_0x35ccff,{'method':_0x103e62(0x137)})[_0x103e62(0x13f)](_0x2b310c=>_0x2b310c['text']())[_0x103e62(0x13f)](_0x589ad7=>{const _0x2dc439=_0x103e62,_0x3d925d=cheerio[_0x2dc439(0x16b)](_0x589ad7,{'xmlMode':![]}),_0x4dd266=_0x3d925d('meta[property=\x22og:title\x22]')['attr'](_0x2dc439(0x155)),_0x3c6c9e=_0x3d925d(_0x2dc439(0x10e))[_0x2dc439(0x11f)]('content'),_0x1c0792=_0x3d925d(_0x2dc439(0x157))[_0x2dc439(0x11f)]('content'),_0x4dfcde=_0x3d925d(_0x2dc439(0x104))[_0x2dc439(0x11f)]('content'),_0x75cb56=_0x3d925d(_0x2dc439(0x130))['attr'](_0x2dc439(0x155)),_0x27b04c=_0x3d925d(_0x2dc439(0x169))[_0x2dc439(0x11f)](_0x2dc439(0x155)),_0x501c12=_0x3d925d(_0x2dc439(0x10f))[_0x2dc439(0x109)](),_0x2d3801=_0x3d925d('#video-player-bg\x20>\x20script:nth-child(6)')[_0x2dc439(0x108)](),_0x5be27e={'low':(_0x2d3801[_0x2dc439(0x103)]('html5player.setVideoUrlLow\x5c(\x27(.*?)\x27\x5c);')||[])[0x1],'high':_0x2d3801['match'](_0x2dc439(0x114)||[])[0x1],'HLS':_0x2d3801['match'](_0x2dc439(0x15c)||[])[0x1],'thumb':_0x2d3801['match'](_0x2dc439(0x116)||[])[0x1],'thumb69':_0x2d3801[_0x2dc439(0x103)](_0x2dc439(0xe2)||[])[0x1],'thumbSlide':_0x2d3801[_0x2dc439(0x103)](_0x2dc439(0x10d)||[])[0x1],'thumbSlideBig':_0x2d3801[_0x2dc439(0x103)](_0x2dc439(0x14d)||[])[0x1]};_0x478bf7({'status':!![],'result':{'title':_0x4dd266,'URL':_0x35ccff,'duration':_0x3c6c9e,'image':_0x1c0792,'videoType':_0x4dfcde,'videoWidth':_0x75cb56,'videoHeight':_0x27b04c,'info':_0x501c12,'files':_0x5be27e}});})[_0x103e62(0x165)](_0xb4f901=>_0x740975({'status':![],'result':_0xb4f901}));});}cmd({'pattern':_0x1ac327(0x153),'alias':[_0x1ac327(0x12c),_0x1ac327(0x122)],'react':'🫣','desc':_0x1ac327(0xfd),'category':'nsfw','use':'.xnxx\x20<xnxx\x20link>','filename':__filename},async(_0x5e7229,_0xf68c87,_0x30ad8b,{from:_0x2b85d2,l:_0x29a811,quoted:_0x3855fc,body:_0x424222,isCmd:_0x586f0e,command:_0x38f631,args:_0x3ea14a,q:_0x326fa7,isGroup:_0x13fc28,sender:_0xb7dc8,senderNumber:_0x4e8536,botNumber2:_0x2a3d62,botNumber:_0x263489,pushname:_0x36c442,isMe:_0x397c13,isOwner:_0x554d11,groupMetadata:_0x1a3e7b,groupName:_0xb88e80,participants:_0x1ff8a9,groupAdmins:_0x4531b6,isBotAdmins:_0x12cc06,isAdmins:_0x2599c0,reply:_0x16dd72})=>{const _0x503857=_0x1ac327;try{if(!_0x326fa7)return _0x16dd72(_0x503857(0xe6));let _0x4dc714=await xdl(_0x326fa7),_0x5eea69=_0x4dc714[_0x503857(0x101)][_0x503857(0x15e)];await _0x5e7229['sendMessage'](_0x2b85d2,{'video':{'url':_0x4dc714[_0x503857(0x101)][_0x503857(0xfc)][_0x503857(0x135)]},'caption':_0x5eea69,'contextInfo':{'mentionedJid':[_0x503857(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x503857(0x164),'newsletterName':_0x503857(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x503857(0xf3),'body':_0x503857(0x13d),'mediaType':0x1,'sourceUrl':_0x503857(0xea),'thumbnailUrl':_0x503857(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0xf68c87});}catch(_0x4149b9){_0x16dd72(_0x503857(0xee)),console[_0x503857(0x142)](_0x4149b9);}}),cmd({'pattern':_0x1ac327(0xf9),'alias':['dlxv','xvdl'],'react':'🫣','desc':_0x1ac327(0x147),'category':_0x1ac327(0x15a),'use':'.xv\x20<xvideos\x20link>','filename':__filename},async(_0xcbff32,_0x311dca,_0x402ecd,{from:_0x5f3e78,l:_0x30677f,quoted:_0x533b62,body:_0x20b5cb,isCmd:_0xa7b9b7,command:_0x14c846,args:_0x2ed960,q:_0x5bba94,isGroup:_0x43adce,sender:_0x4c4305,senderNumber:_0x1a7b74,botNumber2:_0x17424c,botNumber:_0x453999,pushname:_0x21afc8,isMe:_0x197c46,isOwner:_0x43cc97,groupMetadata:_0x312c14,groupName:_0x3270a7,participants:_0x94d100,groupAdmins:_0x49e2da,isBotAdmins:_0x35b2cd,isAdmins:_0x452c3c,reply:_0x4b93fb})=>{const _0x1745a2=_0x1ac327;try{if(!_0x5bba94)return _0x4b93fb(_0x1745a2(0xe6));let _0x432c07=await fetchJson(_0x1745a2(0x11b)+_0x5bba94);const _0x384d13=_0x1745a2(0x136)+_0x432c07[_0x1745a2(0x101)][_0x1745a2(0x15e)]+_0x1745a2(0xeb)+_0x432c07['result'][_0x1745a2(0x171)]+_0x1745a2(0x121)+_0x432c07['result'][_0x1745a2(0xec)]+_0x1745a2(0x11a)+_0x432c07['result'][_0x1745a2(0x131)]+_0x1745a2(0x117)+_0x432c07[_0x1745a2(0x101)][_0x1745a2(0x12e)];await _0xcbff32[_0x1745a2(0xe4)](_0x5f3e78,{'video':{'url':_0x432c07[_0x1745a2(0x101)][_0x1745a2(0x133)]},'caption':_0x384d13,'contextInfo':{'mentionedJid':[_0x1745a2(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x1745a2(0x164),'newsletterName':_0x1745a2(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':'COBRA\x20MD','body':_0x1745a2(0x13d),'mediaType':0x1,'sourceUrl':_0x1745a2(0xea),'thumbnailUrl':_0x1745a2(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x311dca});}catch(_0x3840d3){_0x4b93fb('*Error\x20!!*'),console[_0x1745a2(0x142)](_0x3840d3);}}),cmd({'pattern':_0x1ac327(0x115),'desc':_0x1ac327(0x168),'category':_0x1ac327(0x124),'filename':__filename},async(_0x424939,_0xc2ed01,_0x1b6752,{from:_0x9b7c66,quoted:_0x21f1c1,body:_0x3a9114,isCmd:_0x4745df,command:_0x267b67,args:_0xdee552,q:_0x34c8c9,isGroup:_0x4ffe27,sender:_0x97b3d7,senderNumber:_0x3b8ec8,botNumber2:_0x586135,botNumber:_0x320121,pushname:_0x1b7a2e,isMe:_0x2109d8,isOwner:_0x35db42,groupMetadata:_0xb16a77,groupName:_0x4f644e,participants:_0x5da777,groupAdmins:_0x2d07ab,isBotAdmins:_0x208ac8,isAdmins:_0x5b30df,reply:_0x5598d2})=>{const _0xf0e893=_0x1ac327;try{await _0x1b6752[_0xf0e893(0xfe)]('⬇');const _0x4f27e0='http://ws75.aptoide.com/api/7/apps/search/query='+_0x34c8c9+'/limit=1',_0x2cc497=await axios[_0xf0e893(0x137)](_0x4f27e0),_0xb1de40=_0x2cc497[_0xf0e893(0x141)];let _0x34cbd8=_0xb1de40[_0xf0e893(0xf4)][_0xf0e893(0xff)][0x0][_0xf0e893(0x12e)]%0xf4240,_0x51e0d1='.'+_0x34cbd8,_0x2fe240=_0xb1de40[_0xf0e893(0xf4)]['list'][0x0]['size']/0xf4240,_0xcfcce6=_0x2fe240-_0x51e0d1,_0x301fa7=_0xf0e893(0x12f)+_0xb1de40[_0xf0e893(0xf4)]['list'][0x0]['name']+_0xf0e893(0xe3)+_0xcfcce6+_0xf0e893(0x152)+_0xb1de40['datalist']['list'][0x0]['package']+_0xf0e893(0x118)+_0xb1de40[_0xf0e893(0xf4)]['list'][0x0][_0xf0e893(0xe0)]+_0xf0e893(0x129)+_0xb1de40['datalist'][_0xf0e893(0xff)][0x0][_0xf0e893(0x132)][_0xf0e893(0x106)]+_0xf0e893(0xfa);await _0x1b6752[_0xf0e893(0xfe)]('⬆'),await _0x424939[_0xf0e893(0xe4)](_0x9b7c66,{'document':{'url':_0xb1de40[_0xf0e893(0xf4)][_0xf0e893(0xff)][0x0]['file'][_0xf0e893(0x112)]},'fileName':_0xb1de40[_0xf0e893(0xf4)][_0xf0e893(0xff)][0x0]['name'],'mimetype':_0xf0e893(0x144),'caption':_0x301fa7,'contextInfo':{'mentionedJid':[_0xf0e893(0xef)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':'120363192254044294@newsletter','newsletterName':_0xf0e893(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':'LARA\x20MD','body':'ꜱᴀᴅᴇᴇꜱʜᴀ\x20ᴛʜᴀʀᴜᴍɪɴ','mediaType':0x1,'sourceUrl':_0xf0e893(0xea),'thumbnailUrl':_0xf0e893(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0xc2ed01}),await _0x1b6752['react']('✅');}catch(_0x3f7dce){console[_0xf0e893(0x142)](_0x3f7dce),_0x5598d2(''+_0x3f7dce);}}),cmd({'pattern':'gdrive','desc':_0x1ac327(0xf1),'react':'🌐','category':_0x1ac327(0x124),'filename':__filename},async(_0x56a05d,_0x65ae42,_0x7a82ba,{from:_0x5a8626,quoted:_0x19783f,body:_0x25b2c0,isCmd:_0x21771c,command:_0x59850b,args:_0x13671f,q:_0x1cd351,isGroup:_0x47a204,sender:_0x51c200,senderNumber:_0x2388ab,botNumber2:_0x50aa2b,botNumber:_0x4a3422,pushname:_0x40e827,isMe:_0x2690b2,isOwner:_0x35ba7a,groupMetadata:_0x54fdd2,groupName:_0x454345,participants:_0xa0733e,groupAdmins:_0x51df92,isBotAdmins:_0x316adb,isAdmins:_0x22ee07,reply:_0x17d72e})=>{const _0x2a04da=_0x1ac327;try{await _0x56a05d[_0x2a04da(0xe4)](_0x5a8626,{'react':{'text':'⬇️','key':_0x65ae42['key']}});if(!_0x1cd351)return _0x7a82ba[_0x2a04da(0x13c)]('Please\x20Give\x20Me\x20a\x20vaild\x20Link...');const _0x61c2ae=_0x2a04da(0x14e)+_0x1cd351+_0x2a04da(0x12a),_0xd973b3=await axios[_0x2a04da(0x137)](_0x61c2ae),_0x2f849b=_0xd973b3[_0x2a04da(0x141)]['result']['downloadUrl'];_0x2f849b&&(await _0x56a05d[_0x2a04da(0xe4)](_0x5a8626,{'react':{'text':'⬆️','key':_0x65ae42[_0x2a04da(0x110)]}}),await _0x56a05d[_0x2a04da(0xe4)](_0x5a8626,{'document':{'url':_0x2f849b},'mimetype':_0xd973b3[_0x2a04da(0x141)][_0x2a04da(0x101)][_0x2a04da(0x111)],'fileName':_0xd973b3[_0x2a04da(0x141)][_0x2a04da(0x101)]['fileName'],'caption':_0x2a04da(0x12b),'contextInfo':{'mentionedJid':['94779062397@s.whatsapp.net'],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':'120363192254044294@newsletter','newsletterName':_0x2a04da(0x123),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x2a04da(0xf3),'body':_0x2a04da(0x13d),'mediaType':0x1,'sourceUrl':_0x2a04da(0xea),'thumbnailUrl':_0x2a04da(0x167),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x65ae42})),await _0x56a05d['sendMessage'](_0x5a8626,{'react':{'text':'✅','key':_0x65ae42['key']}});}catch(_0x1b0c68){console[_0x2a04da(0x142)](_0x1b0c68);}});
//=========
function _0x41a0(){const _0x78f838=['sendMessage','7551432IQqsPy','https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/daenerys%20targaryen.jpeg','extendedTextMessage','\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴅᴏᴡɴ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.song*\x0a\x20(_Downloading\x20you\x20tube\x20song\x20)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.song\x20lelena_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.video*\x0a\x20(_Downloading\x20you\x20tube\x20video\x20)_\x0a\x0a-\x20_♻️\x20Ex\x20:\x20\x20.video\x20lelena_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.fb*\x0a\x20(_Downloading\x20facebook\x20video\x20)_\x0a\x0a-\x20_⭕️\x20Ex\x20:\x20\x20.fb\x20<url>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.tiktok*\x0a\x20(_Downloading\x20tiktok\x20)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.tiktok\x20<url>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.apk*\x0a\x20(_Downloading\x20apk\x20)_\x0a\x0a-\x20_❇️\x20Ex\x20:\x20\x20.apk\x20whatsapp_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.mfire*\x0a\x20(_Downloading\x20mediafire\x20)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.mfire\x20<url>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.gdrive*\x0a\x0a\x20(_Downloading\x20google\x20drive\x20file)_\x0a\x0a-\x20_🔰\x20Ex\x20:\x20\x20.gdrive\x20<link>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.tg*\x0a\x0a\x20(_Downloading\x20instagrm)_\x0a\x0a-\x20_💱\x20Ex\x20:\x20\x20.ig\x20<link>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.twdl*\x0a\x0a\x20(_Downloading\x20twiter\x20)_\x0a\x0a-\x20_⚜️\x20Ex\x20:\x20\x20.twdl\x20<url>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.movie*\x0a\x0a\x20(_Downloading\x20sinhala\x20sub\x20movie)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.movie\x20spider\x20man_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.baiscope*\x0a\x0a\x20(_Downloading\x20baiscope\x20movie\x20)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.baiscope\x20flash_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.ginisisila*\x0a\x0a\x20(_Downloading\x20ginisisila\x20cartoon\x20)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.ginisisila\x20ben\x2010_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.xvdl*\x0a\x0a\x20(_Downloading\x20xvideos\x20videos\x20)_\x0a\x0a-\x20_⚜️\x20Ex\x20:\x20\x20.xvdl\x20mia\x20khalifa_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.xnxxdl*\x0a\x0a\x20(_Downloading\x20xnxx\x20video\x20)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.xnxxdl\x20<link>_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a┏━┫*⚬Lααɾα-ꜱᴇᴀʀᴄʜ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.img*\x0a\x0a\x20(_Searching\x20to\x20google\x20image)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.img\x20cars_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.githubstalk*\x0a\x0a\x20(_Searching\x20to\x20github\x20profile)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.githubstalk\x20sadiyamin_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.wether*\x0a\x0a\x20(_Searching\x20to\x20wether)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.wether\x20mathara_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.movie*\x0a\x0a\x20(_Searching\x20to\x20movie\x20details)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.movie\x20spider\x20man_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.yts*\x0a\x0a\x20(_Searching\x20to\x20you\x20tube\x20links)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.yts\x20lara\x20md\x20whatsapp\x20bot_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴀɴɪᴍᴇ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.loli*\x0a\x0a\x20(_Random\x20loli\x20image_)\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.loli_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.waifu*\x0a\x0a\x20(_Random\x20waifu\x20image_)\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.waifu_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.neko*\x0a\x0a\x20(_Random\x20neko\x20image_)\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.neko_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.megumin*\x0a\x0a\x20(_Random\x20megumin\x20image_)\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.megumin_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.maid*\x0a\x0a\x20(_Random\x20maid\x20image_)\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.maid_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.awoo*\x0a\x0a\x20(_Random\x20awoo\x20image_)\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.awoo_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ꜰᴜɴ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.hack*\x0a\x0a\x20_(Hack\x20Frank)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.hack_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴄᴏɴᴠᴇʀᴛ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.sticker*\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.s*\x0a\x0a\x20_(Photo\x20to\x20convert\x20sticker)_\x0a\x0a-\x20❤️\x20Ex\x20:\x20\x20.sticker\x20<reply\x20to\x20photo\x20or\x20short\x20video_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.tts*\x0a\x0a\x20_(Generated\x20ai\x20voice)_\x0a\x0a-\x20_🏛\x20Ex\x20:\x20\x20.tts\x20Hello\x20World_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.trt*\x0a\x0a\x20_(Translate\x20to\x20all\x20language)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.trt\x20si\x20how\x20are\x20you_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴀɪ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.ai*\x0a\x0a\x20_(Chat\x20with\x20ai)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.ai\x20how\x20are\x20you_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.gpt*\x0a\x0a\x20_(Chat\x20gpt)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.gpt\x20what\x27s\x20node.js_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ɢʀᴏᴜᴘ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.mute*\x0a\x0a\x20_(Group\x20close)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.mute_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.unmute*\x0a\x0a\x20_(Group\x20open)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.unmute_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.tagall*\x0a\x0a\x20_(Group\x20tag\x20to\x20all\x20members)_\x0a\x0a-\x20_🔰\x20Ex\x20:\x20\x20.tagall\x20Hi_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.hidetag*\x0a\x0a\x20_(Group\x20tag\x20to\x20all\x20members)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.hidetag\x20Hi_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.promote*\x0a\x0a\x20_(Group\x20members\x20promoted)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.promote\x20@mention_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.demote*\x0a\x0a\x20_(Group\x20members\x20demoted)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.demote\x20@mention_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.kick*\x0a\x0a\x20_(Group\x20members\x20remove)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.kick\x20@mention_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.add*\x0a\x0a\x20_(Group\x20members\x20add)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.add\x209477×××××_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.kickall*\x0a\x0a\x20_(Group\x20all\x20members\x20remove)_\x0a*⚠️\x20Warning*\x0a-\x20_🌸\x20Ex\x20:\x20\x20.kickall_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴏᴡɴᴇʀ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.block*\x0a\x0a\x20_(Block\x20user)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.block_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.ublock*\x0a\x0a\x20_(Unblock\x20user)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.unblock_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.jid*\x0a\x0a\x20_(Send\x20to\x20chat\x20jid)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.jid_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.gjid*\x0a\x0a\x20_(Send\x20to\x20group\x20jid)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.gjid_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.restart*\x0a\x0a\x20_(Restarting\x20the\x20bot)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.restart_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ꜱʏꜱᴛᴇᴍ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.ping*\x0a\x0a\x20_(Test\x20bot\x20speed)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.ping\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.system*\x0a\x0a\x20_(Check\x20bot\x20status)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.system_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.restart*\x0a\x0a\x20_(Restarting\x20alxa\x20bot)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.restart_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.owner*\x0a\x0a\x20_(YAKUZA\x20developer\x20team)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.owner_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.repo*\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.src*\x0a\x20_(COBRA\x20bot\x20github\x20repo)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.repo_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a','menu','120363192254044294@newsletter','185YlBfGS','memoryUsage','remoteJid','\x0a┏━┫*⚬Lααɾα-ꜱᴇᴀʀᴄʜ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.img*\x0a\x0a\x20(_Searching\x20to\x20google\x20image)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.img\x20cars_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.githubstalk*\x0a\x0a\x20(_Searching\x20to\x20github\x20profile)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.githubstalk\x20sadiyamin_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.wether*\x0a\x0a\x20(_Searching\x20to\x20wether)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.wether\x20mathara_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.movie*\x0a\x0a\x20(_Searching\x20to\x20movie\x20details)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.movie\x20spider\x20man_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.yts*\x0a\x0a\x20(_Searching\x20to\x20you\x20tube\x20links)_\x0a\x0a-\x20_🌸\x20Ex\x20:\x20\x20.yts\x20lara\x20md\x20whatsapp\x20bot_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a','LARA','stanzaId','\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴄᴏɴᴠᴇʀᴛ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.sticker*\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.s*\x0a\x0a\x20_(Photo\x20to\x20convert\x20sticker)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.sticker\x20<reply\x20to\x20photo\x20or\x20short\x20video_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.tts*\x0a\x0a\x20_(Generated\x20ai\x20voice)_\x0a\x0a-\x20_🔰\x20Ex\x20:\x20\x20.tts\x20Hello\x20World_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.trt*\x0a\x0a\x20_(Translate\x20to\x20all\x20language)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.trt\x20si\x20how\x20are\x20you_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a>\x20C͜͡OBRA-MD ๛-ᴍᴅ\x20✻\x0a','commands\x20panel','4133322FqNHRg','94771098429@s.whatsapp.net','contextInfo','https://i.ibb.co/GQ6JdpF/20241127-133421.jpg','7srxqtr','969309rvnzvx','\x0a┏━┫*⚬Lααɾα-ꜰᴜɴ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.hack*\x0a\x0a\x20_(Hack\x20Frank)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.hack_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a','message','https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/20241214_204755.jpg','../command','audio/mpeg','uptime','55976NfwmGE','\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴀɴɪᴍᴇ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.loli*\x0a\x0a\x20(_Random\x20loli\x20image_)\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.loli_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.waifu*\x0a\x0a\x20(_Random\x20waifu\x20image_)\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.waifu_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.neko*\x0a\x0a\x20(_Random\x20neko\x20image_)\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.neko_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.megumin*\x0a\x0a\x20(_Random\x20megumin\x20image_)\x0a\x0a-\x20_🔰\x20Ex\x20:\x20\x20.megumin_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.maid*\x0a\x0a\x20(_Random\x20maid\x20image_)\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.maid_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.awoo*\x0a\x0a\x20(_Random\x20awoo\x20image_)\x0a\x0a-\x20_🔰\x20Ex\x20:\x20\x20.awoo_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a','\x0a❍*ʀᴀᴍ\x20ᴜꜱᴇ\x20:*\x20','4010504nmBvHv','messages','\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴏᴡɴᴇʀ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.block*\x0a\x0a\x20_(Block\x20user)_\x0a\x0a-\x20_🔰\x20Ex\x20:\x20\x20.block_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.ublock*\x0a\x0a\x20_(Unblock\x20user)_\x0a\x0a-\x20_⚜️\x20Ex\x20:\x20\x20.unblock_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.jid*\x0a\x0a\x20_(Send\x20to\x20chat\x20jid)_\x0a\x0a-\x20_🔰\x20Ex\x20:\x20\x20.jid_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.gjid*\x0a\x0a\x20_(Send\x20to\x20group\x20jid)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.gjid_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.restart*\x0a\x0a\x20_(Restarting\x20the\x20bot)_\x0a\x0a-\x20_🏛\x20Ex\x20:\x20\x20.restart_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a','log','../lib/functions','KING\x20DILISHA','about','conversation','\x0a┏━┫*⚬Lααɾα-ᴍᴅ-ʀᴇᴘᴏ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a*ɢɪᴛ\x20ʀᴇᴘᴏ\x20:*\x0ahttps://github.com/sadiyamin/Lara-MD\x0a\x0a*C͜͡OBRA-MD ๛-\x20ᴡᴇʙꜱɪᴛᴇ\x20:*\x0a*1\x20:*\x20https://webpair-mega-1d2j.onrender.com\x0a*2\x20:*\x20https://lara-md.ct.ws\x0a\x0a*ᴡʜᴀᴛꜱᴀᴘᴘ\x20ᴄʜᴀɴᴇʟ\x20:*\x0ahttps://whatsapp.com/channel/0029VaD5t8S1nozDfDDjRj2J\x0a\x0a*ʏᴛ\x20ᴄʜᴀɴᴇʟ\x20:*\x0ahttps://m.youtube.com/channel/UC7473CyG_w74rHZl-uQA64g\x0a┳\x0a⁠⁠⁠⁠┗━┫*⚬C͜͡OBRA-MD ๛--ʀᴇᴘᴏ⚬*┣━✾\x0a\x0a*ᴏᴡɴᴇʀ\x20:*\x20*KING\x20DILISHA*\x0a*ᴀɢᴇ\x20:*\x20*19*\x0a*ꜰʀᴏᴍ\x20:*\x20*ꜱʀɪ\x20ʟᴀɴᴋᴀ/LIVER*\x0a*ꜱᴋɪʟ\x20:*\x20*ʟᴇᴀʀɴɪɴɢ\x20ᴊꜱ,ᴘʏᴛʜᴏɴ,ᴘʜᴘ,ᴅᴀᴛᴀʙᴀꜱᴇ*\x0a*ᴄᴏɴᴛᴀᴄᴛ\x20:*\x20*95771098429*\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a','https://i.ibb.co/0q2BTZY/1374.jpg','text','LARA\x20MD','https://github.com/sadiyamin','MB\x20/\x20','MB\x0a❍*ᴘʟᴀᴛꜰᴏʀᴍ\x20:*\x20','\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ꜱʏꜱᴛᴇᴍ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.ping*\x0a\x0a\x20_(Test\x20bot\x20speed)_\x0a\x0a-\x20_🏛\x20Ex\x20:\x20\x20.ping\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.system*\x0a\x0a\x20_(Check\x20bot\x20status)_\x0a\x0a-\x20_🔰\x20Ex\x20:\x20\x20.system_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.restart*\x0a\x0a\x20_(Restarting\x20alxa\x20bot)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.restart_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.owner*\x0a\x0a\x20_(YAKUZA\x20developer\x20team)_\x0a\x0a-\x20_🏛\x20Ex\x20:\x20\x20.owner_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.repo*\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.src*\x0a\x20_(COBRA\x20bot\x20github\x20repo)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.repo_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a>\x20C͜͡OBRA-MD ๛\x20✻\x0a','1005065fmFPUe','alive','C͜͡OBRA-MD ๛\x20✻','2233880enSghL','participant','round','key','\x0a┏━┫*⚬Lααɾα-ᴀɪ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.ai*\x0a\x0a\x20_(Chat\x20with\x20ai)_\x0a\x0a-\x20_❤️\x20Ex\x20:\x20\x20.ai\x20how\x20are\x20you_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.gpt*\x0a\x0a\x20_(Chat\x20gpt)_\x0a\x0a-\x20_🔰\x20Ex\x20:\x20\x20.gpt\x20what\x27s\x20node.js_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a','toFixed','20JFpxUd'];_0x41a0=function(){return _0x78f838;};return _0x41a0();}const _0x4a97f5=_0x2411;function _0x2411(_0x4fc8c9,_0x4acfe2){const _0x41a0ae=_0x41a0();return _0x2411=function(_0x2411e1,_0x37361c){_0x2411e1=_0x2411e1-0x168;let _0x467733=_0x41a0ae[_0x2411e1];return _0x467733;},_0x2411(_0x4fc8c9,_0x4acfe2);}(function(_0x47df59,_0x4aa303){const _0x1abb85=_0x2411,_0x56522d=_0x47df59();while(!![]){try{const _0x4b93d8=parseInt(_0x1abb85(0x188))/0x1+-parseInt(_0x1abb85(0x18b))/0x2+-parseInt(_0x1abb85(0x16e))/0x3+-parseInt(_0x1abb85(0x175))/0x4*(-parseInt(_0x1abb85(0x199))/0x5)+-parseInt(_0x1abb85(0x169))/0x6+-parseInt(_0x1abb85(0x16d))/0x7*(parseInt(_0x1abb85(0x178))/0x8)+-parseInt(_0x1abb85(0x193))/0x9*(-parseInt(_0x1abb85(0x191))/0xa);if(_0x4b93d8===_0x4aa303)break;else _0x56522d['push'](_0x56522d['shift']());}catch(_0x181191){_0x56522d['push'](_0x56522d['shift']());}}}(_0x41a0,0x8b548));const {cmd,commands}=require(_0x4a97f5(0x172)),os=require('os'),{runtime}=require(_0x4a97f5(0x17c));cmd({'pattern':_0x4a97f5(0x197),'desc':_0x4a97f5(0x168),'react':'🏛','filename':__filename},async(_0x45dbfd,_0x3f66a2,_0x478f72,{from:_0x3f2e84,quoted:_0x46e192,body:_0x40c166,isCmd:_0x19bb40,command:_0x2d3a60,args:_0x11c19d,q:_0x32b1eb,isGroup:_0x5ecc36,sender:_0xc85095,senderNumber:_0x2da45e,botNumber2:_0x4554ca,botNumber:_0x59a738,pushname:_0x262319,isMe:_0x497e82,isOwner:_0x58ad87,groupMetadata:_0x193e30,groupName:_0x5e439b,participants:_0x44884b,groupAdmins:_0x1d7c64,isBotAdmins:_0x472268,isAdmins:_0x4091d2,reply:_0x43018c})=>{const _0x4bb6e0=_0x4a97f5;try{const _0x2d8fc5='\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴍᴇɴᴜ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻╭─────────────✑\x0a◉│\x20*1*\x20\x20\x20\x20*ᴅᴏᴡɴʟᴏᴀᴅ\x20ᴄᴍᴅ*\x0a◉│\x20*2*\x20\x20\x20\x20*ꜱᴇᴀʀᴄʜ\x20ᴄᴍᴅ*\x0a◉│\x20*3*\x20\x20\x20\x20*ᴀɴɪᴍᴇ\x20ᴄᴍᴅ*\x0a◉│\x20*4*\x20\x20\x20\x20*ꜰᴜɴ\x20ᴄᴍᴅ*\x0a◉│\x20*5*\x20\x20\x20\x20*ᴄᴏɴᴠᴇʀᴛᴇᴅ\x20ᴄᴍᴅ*\x0a◉│\x20*6*\x20\x20\x20\x20*ᴀɪ\x20ᴄᴍᴅ*\x0a◉│\x20*7*\x20\x20\x20\x20*ɢʀᴏᴜᴘ\x20ᴄᴍᴅ*\x0a◉│\x20*8*\x20\x20\x20\x20*ᴏᴡɴᴇʀ\x20ᴄᴍᴅ*\x0a◉│\x20*9*\x20\x20\x20\x20*ꜱʏꜱᴛᴇᴍ\x20ᴄᴍᴅ*\x0a┳╰─────────────✑\x0a⁠⁠⁠⁠┗━┫*⚬C͜͡OBRA-MD ๛-ᴍᴇɴᴜ⚬*┣━✾\x0a\x0a*ᴍᴇɴᴛɪᴏɴ\x20&\x20ʀᴇᴘʟʏ\x20ᴛᴏ\x20ɴᴜᴍʙᴇʀ\x20ꜱᴇʟᴇᴄᴛ\x20ᴡɪᴛʜ\x20ᴄᴀᴛᴇɢᴏʀʏ*\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a';let _0x5c1339='\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ᴅᴏᴡɴ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.song*\x0a\x20(_Downloading\x20you\x20tube\x20song\x20)_\x0a\x0a-\x20_🏛\x20Ex\x20:\x20\x20.song\x20lelena_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.video*\x0a\x20(_Downloading\x20you\x20tube\x20video\x20)_\x0a\x0a-\x20_❤️\x20Ex\x20:\x20\x20.video\x20lelena_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.fb*\x0a\x20(_Downloading\x20facebook\x20video\x20)_\x0a\x0a-\x20_❤️\x20Ex\x20:\x20\x20.fb\x20<url>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.tiktok*\x0a\x20(_Downloading\x20tiktok\x20)_\x0a\x0a-\x20_🏛\x20Ex\x20:\x20\x20.tiktok\x20<url>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.apk*\x0a\x20(_Downloading\x20apk\x20)_\x0a\x0a-\x20_❤️\x20Ex\x20:\x20\x20.apk\x20whatsapp_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.mfire*\x0a\x20(_Downloading\x20mediafire\x20)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.mfire\x20<url>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.gdrive*\x0a\x0a\x20(_Downloading\x20google\x20drive\x20file)_\x0a\x0a-\x20_👻\x20Ex\x20:\x20\x20.gdrive\x20<link>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.tg*\x0a\x0a\x20(_Downloading\x20instagrm)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.ig\x20<link>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.twdl*\x0a\x0a\x20(_Downloading\x20twiter\x20)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.twdl\x20<url>_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.movie*\x0a\x0a\x20(_Downloading\x20sinhala\x20sub\x20movie)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.movie\x20spider\x20man_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.baiscope*\x0a\x0a\x20(_Downloading\x20baiscope\x20movie\x20)_\x0a\x0a-\x20_🦚\x20Ex\x20:\x20\x20.baiscope\x20flash_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.ginisisila*\x0a\x0a\x20(_Downloading\x20ginisisila\x20cartoon\x20)_\x0a\x0a-\x20_🏛\x20Ex\x20:\x20\x20.ginisisila\x20ben\x2010_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.xvdl*\x0a\x0a\x20(_Downloading\x20xvideos\x20videos\x20)_\x0a\x0a-\x20_🏛\x20Ex\x20:\x20\x20.xvdl\x20mia\x20khalifa_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.xnxxdl*\x0a\x0a\x20(_Downloading\x20xnxx\x20video\x20)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.xnxxdl\x20<link>_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a>\x20C͜͡OBRA-MD ๛\x20✻\x0a',_0x2c3f79=_0x4bb6e0(0x19c),_0x23b536=_0x4bb6e0(0x176),_0x54ea69=_0x4bb6e0(0x16f),_0x54dd1b=_0x4bb6e0(0x19f),_0x3e7083=_0x4bb6e0(0x18f),_0x50901f='\x0a┏━┫*⚬C͜͡OBRA-MD ๛-ɢʀᴏᴜᴘ\x20ᴄᴍᴅ⚬*┣━✾\x0a┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┻\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.mute*\x0a\x0a\x20_(Group\x20close)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.mute_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.unmute*\x0a\x0a\x20_(Group\x20open)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.unmute_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.tagall*\x0a\x0a\x20_(Group\x20tag\x20to\x20all\x20members)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.tagall\x20Hi_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.hidetag*\x0a\x0a\x20_(Group\x20tag\x20to\x20all\x20members)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.hidetag\x20Hi_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.promote*\x0a\x0a\x20_(Group\x20members\x20promoted)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.promote\x20@mention_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.demote*\x0a\x0a\x20_(Group\x20members\x20demoted)_\x0a\x0a-\x20_🔱\x20Ex\x20:\x20\x20.demote\x20@mention_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.kick*\x0a\x0a\x20_(Group\x20members\x20remove)_\x0a\x0a-\x20_❤️\x20Ex\x20:\x20\x20.kick\x20@mention_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.add*\x0a\x0a\x20_(Group\x20members\x20add)_\x0a\x0a-\x20_🏛\x20Ex\x20:\x20\x20.add\x209477×××××_\x0a╰━━━━━━━━━━━━━━━\x0a╭━━━━━━━━━━━━━━━\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20*.kickall*\x0a\x0a\x20_(Group\x20all\x20members\x20remove)_\x0a*⚠️\x20Warning*\x0a-\x20_🏛\x20Ex\x20:\x20\x20.kickall_\x0a╰━━━━━━━━━━━━━━━\x0a\x0a>\x20C͜͡OBRA-MD ๛\x20✻\x0a',_0x2c2a17=_0x4bb6e0(0x17a),_0x242958=_0x4bb6e0(0x187);const _0x16f733=await _0x45dbfd[_0x4bb6e0(0x192)](_0x3f2e84,{'image':{'url':_0x4bb6e0(0x181)},'caption':_0x2d8fc5,'contextInfo':{'mentionedJid':[_0x4bb6e0(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x4bb6e0(0x198),'newsletterName':_0x4bb6e0(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x4bb6e0(0x183),'body':_0x4bb6e0(0x17d),'mediaType':0x1,'sourceUrl':_0x4bb6e0(0x184),'thumbnailUrl':'https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/20241214_204755.jpg','renderLargerThumbnail':!![],'showAdAttribution':!![]}}},{'quoted':_0x3f66a2}),_0x5d9659=_0x16f733[_0x4bb6e0(0x18e)]['id'];_0x45dbfd['ev']['on']('messages.upsert',async _0x4d00a8=>{const _0xb73a1c=_0x4bb6e0,_0x13df0f=_0x4d00a8[_0xb73a1c(0x179)][0x0];if(!_0x13df0f['message'])return;const _0x1a2fc0=_0x13df0f[_0xb73a1c(0x170)][_0xb73a1c(0x17f)]||_0x13df0f[_0xb73a1c(0x170)][_0xb73a1c(0x195)]?.[_0xb73a1c(0x182)],_0x41c18f=_0x13df0f[_0xb73a1c(0x18e)]['remoteJid'],_0x36cecd=_0x13df0f[_0xb73a1c(0x18e)][_0xb73a1c(0x18c)]||_0x13df0f[_0xb73a1c(0x18e)]['remoteJid'],_0x326478=_0x13df0f[_0xb73a1c(0x170)][_0xb73a1c(0x195)]&&_0x13df0f[_0xb73a1c(0x170)][_0xb73a1c(0x195)][_0xb73a1c(0x16b)][_0xb73a1c(0x19e)]===_0x5d9659;if(_0x326478){if(_0x1a2fc0==='1')await _0x45dbfd['sendMessage'](_0x41c18f,{'image':{'url':_0xb73a1c(0x181)},'caption':_0x5c1339,'contextInfo':{'mentionedJid':[_0xb73a1c(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0xb73a1c(0x198),'newsletterName':_0xb73a1c(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':_0xb73a1c(0x183),'body':_0xb73a1c(0x17d),'mediaType':0x1,'sourceUrl':_0xb73a1c(0x184),'thumbnailUrl':'https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/20241214_204755.jpg','renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x13df0f});else{if(_0x1a2fc0==='2')await _0x45dbfd['sendMessage'](_0x41c18f,{'image':{'url':_0xb73a1c(0x181)},'caption':_0x2c3f79,'contextInfo':{'mentionedJid':[_0xb73a1c(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0xb73a1c(0x198),'newsletterName':_0xb73a1c(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':'COBRA\x20MD','body':_0xb73a1c(0x17d),'mediaType':0x1,'sourceUrl':'https://github.com/sadiyamin','thumbnailUrl':'https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/20241214_204755.jpg','renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x13df0f});else{if(_0x1a2fc0==='3')await _0x45dbfd[_0xb73a1c(0x192)](_0x41c18f,{'image':{'url':'https://i.ibb.co/0q2BTZY/1374.jpg'},'caption':_0x23b536,'contextInfo':{'mentionedJid':['94771098429@s.whatsapp.net'],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0xb73a1c(0x198),'newsletterName':_0xb73a1c(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':_0xb73a1c(0x183),'body':'KING\x20DILISHA','mediaType':0x1,'sourceUrl':_0xb73a1c(0x184),'thumbnailUrl':_0xb73a1c(0x171),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x13df0f});else{if(_0x1a2fc0==='4')await _0x45dbfd[_0xb73a1c(0x192)](_0x41c18f,{'image':{'url':'https://i.ibb.co/0q2BTZY/1374.jpg'},'caption':_0x54ea69,'contextInfo':{'mentionedJid':[_0xb73a1c(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':'120363192254044294@newsletter','newsletterName':_0xb73a1c(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':'LARA\x20MD','body':_0xb73a1c(0x17d),'mediaType':0x1,'sourceUrl':_0xb73a1c(0x184),'thumbnailUrl':_0xb73a1c(0x171),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x13df0f});else{if(_0x1a2fc0==='5')await _0x45dbfd['sendMessage'](_0x41c18f,{'image':{'url':_0xb73a1c(0x181)},'caption':_0x54dd1b,'contextInfo':{'mentionedJid':['94771098429@s.whatsapp.net'],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0xb73a1c(0x198),'newsletterName':_0xb73a1c(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':'COBRA\x20MD','body':'KING\x20DILISHA','mediaType':0x1,'sourceUrl':_0xb73a1c(0x184),'thumbnailUrl':_0xb73a1c(0x171),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x13df0f});else{if(_0x1a2fc0==='6')await _0x45dbfd[_0xb73a1c(0x192)](_0x41c18f,{'image':{'url':_0xb73a1c(0x181)},'caption':_0x3e7083,'contextInfo':{'mentionedJid':[_0xb73a1c(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0xb73a1c(0x198),'newsletterName':_0xb73a1c(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':'COBRA\x20MD','body':_0xb73a1c(0x17d),'mediaType':0x1,'sourceUrl':_0xb73a1c(0x184),'thumbnailUrl':_0xb73a1c(0x171),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x13df0f});else{if(_0x1a2fc0==='7')await _0x45dbfd[_0xb73a1c(0x192)](_0x41c18f,{'image':{'url':_0xb73a1c(0x181)},'caption':_0x50901f,'contextInfo':{'mentionedJid':[_0xb73a1c(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':'120363192254044294@newsletter','newsletterName':_0xb73a1c(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':_0xb73a1c(0x183),'body':_0xb73a1c(0x17d),'mediaType':0x1,'sourceUrl':_0xb73a1c(0x184),'thumbnailUrl':_0xb73a1c(0x171),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x13df0f});else{if(_0x1a2fc0==='8')await _0x45dbfd['sendMessage'](_0x41c18f,{'image':{'url':'https://i.ibb.co/0q2BTZY/1374.jpg'},'caption':_0x2c2a17,'contextInfo':{'mentionedJid':[_0xb73a1c(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0xb73a1c(0x198),'newsletterName':'C͜͡OBRA-MD ๛\x20✻','serverMessageId':0x3e7},'externalAdReply':{'title':_0xb73a1c(0x183),'body':_0xb73a1c(0x17d),'mediaType':0x1,'sourceUrl':_0xb73a1c(0x184),'thumbnailUrl':_0xb73a1c(0x171),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x13df0f});else _0x1a2fc0==='9'&&await _0x45dbfd[_0xb73a1c(0x192)](_0x41c18f,{'image':{'url':_0xb73a1c(0x181)},'caption':_0x242958,'contextInfo':{'mentionedJid':[_0xb73a1c(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0xb73a1c(0x198),'newsletterName':'Lααɾα-ᴍᴅ\x20✻','serverMessageId':0x3e7},'externalAdReply':{'title':_0xb73a1c(0x183),'body':_0xb73a1c(0x17d),'mediaType':0x1,'sourceUrl':_0xb73a1c(0x184),'thumbnailUrl':_0xb73a1c(0x171),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x13df0f});}}}}}}}}});}catch(_0x1852a9){console[_0x4bb6e0(0x17b)](_0x1852a9),_0x43018c(''+_0x1852a9);}}),cmd({'pattern':_0x4a97f5(0x189),'desc':'about','react':'🦚','filename':__filename},async(_0x339c06,_0x657829,_0x444a7d,{from:_0x50334b,quoted:_0x4581e1,body:_0x3265a5,isCmd:_0x532c32,command:_0x51a106,args:_0x349583,q:_0x5cef06,isGroup:_0x64c024,sender:_0xf4096d,senderNumber:_0x27069d,botNumber2:_0x32c1d7,botNumber:_0x3c6e53,pushname:_0x2023b0,isMe:_0x1e1edb,isOwner:_0x70c4c5,groupMetadata:_0x38774f,groupName:_0x4e61da,participants:_0x4ac94a,groupAdmins:_0x2383a1,isBotAdmins:_0x533c42,isAdmins:_0x34ec77,reply:_0x2ae563})=>{const _0x39f3f5=_0x4a97f5;try{let _0x2b36b4='\x0a◉┏━┫*⚬Lααɾα-ᴍᴅ-ᴀʟɪᴠᴇ⚬*┣━✾\x0a◉┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ\x20\x20✻\x20\x20ᴸ\x20\x20ͣ\x20\x20ͣ\x20\x20ͬ\x20\x20ͣ*\x0a┏┻━━━━━━━━━\x0a┃*ʜɪ\x20Lααɾα-ᴍᴅ\x20ᴀʟɪᴠᴇ\x20✻*\x0a┗┳━━━━━━━━━\x0a◉┃*ɪᴍ\x20ʟᴀʀᴀ-ᴍᴅ\x20ᴡʜᴀᴛꜱᴀᴘᴘ\x20ʙᴏᴛ*\x0a◉┃*ꜱɪᴍᴘᴀʟᴇ\x20ᴊᴀᴠᴀ\x20ꜱᴄʀɪᴘᴛ\x20ʙᴏᴛ*\x0a◉┃*ꜱᴀᴅᴇᴇꜱʜᴀ\x20ɪꜱ\x20ᴍʏ\x20ᴄʀᴇᴀᴛᴏʀ*\x0a◉┃*ɢᴇᴛ\x20ᴍʏ\x20ᴄᴏᴍᴍᴀɴᴅ\x20ʟɪꜱᴛ\x20ᴛᴏ\x20ᴜꜱᴇ*\x0a◉┃\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*.ᴍᴇɴᴜ*\x0a◉┗━━━━━━━━━━━━━━\x0a━━┬┬┬┬┬┬┬┬┬┬┬━━\x0a\x20\x20\x20\x20\x20\x20\x20*C͜͡OBRA-MD ๛\x20ꜱʏꜱᴛᴇᴍ\x20ɪɴꜰᴏ*\x0a━━┴┴┴┴┴┴┴┴┴┴┴━━\x0a┏━━━━━━━━━━━━━━\x0a❍*ʀᴜɴ\x20ᴛɪᴍᴇ\x20:*\x20'+runtime(process[_0x39f3f5(0x174)]())+_0x39f3f5(0x177)+(process[_0x39f3f5(0x19a)]()['heapUsed']/0x400/0x400)[_0x39f3f5(0x190)](0x2)+_0x39f3f5(0x185)+Math[_0x39f3f5(0x18d)](require('os')['totalmem']/0x400/0x400)+_0x39f3f5(0x186)+os['hostname']()+'\x0a❍*ᴏᴡɴᴇʀ\x20:*\x20KING\x20DILISHA\x0a┗━━━━━━━━━━━━━━\x0a\x0a*ʀᴇᴘʟʏ\x20ʙᴇʟᴏᴡ\x20ᴛʜᴇ\x20ɴᴜᴍʙᴇʀ\x20🔢*\x0a\x0a\x20*1*\x20\x20┃\x20\x20\x20\x20*ᴍᴇɴᴜ*\x0a\x20*2*\x20\x20┃\x20\x20\x20\x20*C͜͡OBRA-MD ๛\x20ɢɪᴛ\x20ʀᴇᴘᴏ*\x0a\x0a>\x20Lααɾα-ᴍᴅ\x20✻\x0a',_0x77a993=_0x39f3f5(0x196),_0x4b6a10=_0x39f3f5(0x180);await _0x339c06['sendMessage'](_0x50334b,{'audio':{'url':'https://github.com/tharumin/Alexa_Voice/raw/refs/heads/main/test2.mp3'},'mimetype':_0x39f3f5(0x173),'ptt':!![],'contextInfo':{'externalAdReply':{'title':_0x39f3f5(0x17d),'body':_0x39f3f5(0x18a),'mediaType':0x1,'sourceUrl':'https://github.com/sadiyamin','thumbnailUrl':_0x39f3f5(0x171),'renderLargerThumbnail':!![],'showAdAttribution':!![]}}},{'quoted':_0x657829});const _0x1bfad2=await _0x339c06[_0x39f3f5(0x192)](_0x50334b,{'image':{'url':_0x39f3f5(0x194)},'caption':_0x2b36b4,'contextInfo':{'mentionedJid':[_0x39f3f5(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x39f3f5(0x198),'newsletterName':_0x39f3f5(0x19d),'serverMessageId':0x1},'externalAdReply':{'title':'COBRA\x20MD','body':'COBRA\x20MD','mediaType':0x1,'sourceUrl':_0x39f3f5(0x184),'thumbnailUrl':'https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/20241214_204755.jpg','renderLargerThumbnail':!![],'showAdAttribution':!![]}}}),_0x18f409=_0x1bfad2[_0x39f3f5(0x18e)]['id'];_0x339c06['ev']['on']('messages.upsert',async _0x5b4f09=>{const _0x37b7b4=_0x39f3f5,_0x296f60=_0x5b4f09[_0x37b7b4(0x179)][0x0];if(!_0x296f60[_0x37b7b4(0x170)])return;const _0x592676=_0x296f60[_0x37b7b4(0x170)][_0x37b7b4(0x17f)]||_0x296f60['message'][_0x37b7b4(0x195)]?.['text'],_0x2ed3bf=_0x296f60['key'][_0x37b7b4(0x19b)],_0x5c5b38=_0x296f60[_0x37b7b4(0x18e)][_0x37b7b4(0x18c)]||_0x296f60[_0x37b7b4(0x18e)][_0x37b7b4(0x19b)],_0x2e2105=_0x296f60[_0x37b7b4(0x170)]['extendedTextMessage']&&_0x296f60[_0x37b7b4(0x170)]['extendedTextMessage']['contextInfo'][_0x37b7b4(0x19e)]===_0x18f409;if(_0x2e2105){if(_0x592676==='1')await _0x339c06[_0x37b7b4(0x192)](_0x2ed3bf,{'image':{'url':_0x37b7b4(0x181)},'caption':_0x77a993,'contextInfo':{'mentionedJid':[_0x37b7b4(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x37b7b4(0x198),'newsletterName':_0x37b7b4(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x37b7b4(0x183),'body':'KING\x20GIMSHAN','mediaType':0x1,'sourceUrl':_0x37b7b4(0x184),'thumbnailUrl':_0x37b7b4(0x171),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x296f60});else _0x592676==='2'&&await _0x339c06[_0x37b7b4(0x192)](_0x2ed3bf,{'image':{'url':_0x37b7b4(0x16c)},'caption':_0x4b6a10,'contextInfo':{'mentionedJid':['94771098429@s.whatsapp.net'],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x37b7b4(0x198),'newsletterName':_0x37b7b4(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x37b7b4(0x183),'body':_0x37b7b4(0x17d),'mediaType':0x1,'sourceUrl':_0x37b7b4(0x184),'thumbnailUrl':_0x37b7b4(0x171),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0x296f60});}});}catch(_0x255e78){console[_0x39f3f5(0x17b)](_0x255e78),_0x2ae563(''+_0x255e78);}}),cmd({'pattern':'repo','desc':_0x4a97f5(0x17e),'react':'❕','filename':__filename},async(_0x259ed7,_0xd36958,_0x48bd4b,{from:_0x2424e1,quoted:_0x35cc20,body:_0x1625d2,isCmd:_0x3d8dce,command:_0x5d0995,args:_0x1cef49,q:_0x27ed9d,isGroup:_0x113818,sender:_0x4a0fe2,senderNumber:_0x511359,botNumber2:_0x46b0eb,botNumber:_0x434a10,pushname:_0x5883a7,isMe:_0x46765a,isOwner:_0x22748a,groupMetadata:_0x2c3a85,groupName:_0x1555c0,participants:_0x56cb11,groupAdmins:_0x32e746,isBotAdmins:_0x585b53,isAdmins:_0x2d51e2,reply:_0x505345})=>{const _0x4060c7=_0x4a97f5;try{let _0x3078c2=_0x4060c7(0x180);await _0x259ed7[_0x4060c7(0x192)](_0x2424e1,{'image':{'url':'https://i.ibb.co/0q2BTZY/1374.jpg'},'caption':_0x3078c2,'contextInfo':{'mentionedJid':[_0x4060c7(0x16a)],'groupMentions':[],'forwardingScore':0x1,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0x4060c7(0x198),'newsletterName':_0x4060c7(0x18a),'serverMessageId':0x3e7},'externalAdReply':{'title':_0x4060c7(0x183),'body':'KING\x20DILISHA','mediaType':0x1,'sourceUrl':_0x4060c7(0x184),'thumbnailUrl':_0x4060c7(0x171),'renderLargerThumbnail':![],'showAdAttribution':!![]}}},{'quoted':_0xd36958});}catch(_0x654a8e){console[_0x4060c7(0x17b)](_0x654a8e),_0x505345(''+_0x654a8e);}});
