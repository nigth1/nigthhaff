
const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
ModalBuilder,
TextInputBuilder,
TextInputStyle,
Events
} = require("discord.js")

const TOKEN = process.env.TOKEN;
const VERIFY_ROLE = "1374387609597513848"
const ADMIN_CHANNEL = "1481308698067337216"

const client = new Client({
intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers
]
})

client.once("clientReady",()=>{
console.log(`Bot online: ${client.user.tag}`)
})

client.on(Events.InteractionCreate, async interaction => {

if(interaction.isChatInputCommand()){

if(interaction.commandName === "apply"){

const modal = new ModalBuilder()
.setCustomId("applyForm")
.setTitle("สมัครสมาชิก")

const name = new TextInputBuilder()
.setCustomId("name")
.setLabel("ชื่อ")
.setStyle(TextInputStyle.Short)

const age = new TextInputBuilder()
.setCustomId("age")
.setLabel("อายุ")
.setStyle(TextInputStyle.Short)

const friend = new TextInputBuilder()
.setCustomId("friend")
.setLabel("คุณรู้จักใครในดิสนี้?")
.setStyle(TextInputStyle.Short)

const reason = new TextInputBuilder()
.setCustomId("reason")
.setLabel("เหตุผลที่เข้าร่วม")
.setStyle(TextInputStyle.Paragraph)

const row1 = new ActionRowBuilder().addComponents(name)
const row2 = new ActionRowBuilder().addComponents(age)
const row3 = new ActionRowBuilder().addComponents(friend)
const row4 = new ActionRowBuilder().addComponents(reason)

modal.addComponents(row1,row2,row3,row4)

await interaction.showModal(modal)

}

}

if(interaction.isModalSubmit()){

if(interaction.customId === "applyForm"){

const name = interaction.fields.getTextInputValue("name")
const age = interaction.fields.getTextInputValue("age")
const friend = interaction.fields.getTextInputValue("friend")
const reason = interaction.fields.getTextInputValue("reason")

const embed = new EmbedBuilder()
.setTitle("📋 คำขอสมัครสมาชิก")
.setDescription(`
ผู้ใช้: ${interaction.user}

ชื่อ: ${name}
อายุ: ${age}
เหตุผล: ${reason}
คุณรู้จักใครในดิสนี้?: ${friend}
`)
.setColor("Blue")

const row = new ActionRowBuilder().addComponents(

new ButtonBuilder()
.setCustomId(`accept_${interaction.user.id}`)
.setLabel("อนุมัติ")
.setStyle(ButtonStyle.Success),

new ButtonBuilder()
.setCustomId(`deny_${interaction.user.id}`)
.setLabel("ปฏิเสธ")
.setStyle(ButtonStyle.Danger)

)

const channel = interaction.guild.channels.cache.get(ADMIN_CHANNEL)

await channel.send({
embeds:[embed],
components:[row]
})

await interaction.reply({
content:"✅ ส่งคำขอแล้ว รอแอดมินตรวจสอบ",
ephemeral:true
})

}

}

if(interaction.isButton()){

const id = interaction.customId

if(id.startsWith("accept_")){

const userId = id.split("_")[1]

const member = await interaction.guild.members.fetch(userId)

const role = interaction.guild.roles.cache.get(VERIFY_ROLE)

await member.roles.add(role)

await interaction.reply("✅ อนุมัติแล้ว แจก Role เรียบร้อย")

}

if(id.startsWith("deny_")){

await interaction.reply("❌ ปฏิเสธคำขอ")

}

}

})

client.login(TOKEN)