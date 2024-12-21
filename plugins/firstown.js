
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
const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')
cmd({
    pattern: "ai",
    react: "✨",
    desc: "ai chat",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${q}`)
return reply(`${data.data}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})

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
