import NotFound from '@/utils/errors/NotFound'
import {
  Client,
  Collection,
  GuildMember,
  TextChannel,
  Channel,
} from 'discord.js'
import { config } from 'dotenv'
import fetch from 'node-fetch'

config()

const TENOR_URL = `
https://g.tenor.com/v2/search?q=celebrate&key=${process.env.TENOR_KEY}&limit=1&random=true`

export async function setupDiscord(client: Client) {
  const guild = await client.guilds.fetch(process.env.SERVER_ID as string) // creates guild object(server)
  const members = await guild.members.fetch()
  const channel = await client.channels.fetch(process.env.CHANNEL_ID as string)

  return { members, channel }
}

export async function postToDiscord(
  user: string,
  message: string,
  members: Collection<string, GuildMember>,
  channel: Channel
) {
  const member = findUser(members, user)
  if (member) {
    postMessage(channel as TextChannel, member, message)
    postGIF(channel as TextChannel)
    return
  }
  throw new NotFound(`User ${user} was not found in discord server`)
}

async function postMessage(
  channel: TextChannel,
  member: GuildMember,
  message: string
) {
  try {
    const fullMessage = `${member} ${message}`
    await channel.send(fullMessage)
  } catch {
    throw new Error('Message was not posted')
  }
}

async function postGIF(channel: TextChannel) {
  const response = await fetch(TENOR_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch GIF: ${response.status}`)
  }

  const jsonRes = await response.json()

  await channel.send(jsonRes.results[0].url)
}

export function findUser(
  members: Collection<string, GuildMember>,
  user: string
) {
  return members.find((member) => member.user.username === user)
}
