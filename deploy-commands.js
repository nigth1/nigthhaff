const { REST, Routes, SlashCommandBuilder } = require("discord.js")

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1481296648071155915"
const GUILD_ID = "1374380656586526850"

const commands = [

new SlashCommandBuilder()
.setName("apply")
.setDescription("สมัครสมาชิก")

].map(command=>command.toJSON())

const rest = new REST({version:"10"}).setToken(TOKEN)

;(async()=>{

await rest.put(
Routes.applicationGuildCommands(CLIENT_ID,GUILD_ID),
{body:commands}
)

console.log("สร้างคำสั่งสำเร็จ")

})()