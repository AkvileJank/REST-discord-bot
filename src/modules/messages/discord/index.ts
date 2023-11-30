import { Channel } from 'diagnostics_channel'
import {
  Client,
  GatewayIntentBits,
  Events,
  Collection,
  GuildMember,
  TextChannel,
} from 'discord.js'
import { config } from 'dotenv'
import fetch from 'node-fetch'

config()

const SERVER_ID = '1179042239016603658'
const CHANNEL_ID = '1179042239624781926'
const TENOR_URL = `
https://g.tenor.com/v2/search?q=celebrate&key=${process.env.TENOR_KEY}&limit=1&random=true`

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
})

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(process.env.BOT_TOKEN)

export async function postToDiscord(user: string, message: string) {
  const guild = await client.guilds.fetch(SERVER_ID) // creates guild object(server)
  const members = await guild.members.fetch()
  const channel = await client.channels.fetch(CHANNEL_ID)
  const member = await findUser(members, user)
  if (member) {
    postMessage(channel as TextChannel, member, message)
    postGIF(channel as TextChannel)
  }
}

async function postMessage(
  channel: TextChannel,
  member: GuildMember,
  message: string
) {
  const fullMessage = `${member} ${message}`
  await channel.send(fullMessage)
}

async function postGIF(channel: TextChannel) {
  const response = await fetch(TENOR_URL)
  const jsonRes = await response.json()
  await channel.send(jsonRes.results[0].url)
}

function findUser(
  members: Collection<string, GuildMember>,
  user: string
) {
  return members.find((member) => member.user.username === user)
}
