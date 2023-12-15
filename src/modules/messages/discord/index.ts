import {
  Client,
  Collection,
  GuildMember,
  TextChannel,
  Channel,
} from 'discord.js'
import { config } from 'dotenv'
import BadRequest from '@/utils/errors/BadRequest'
import fetchGIF from '../tenor'

config()

const TENOR_URL = `
https://g.tenor.com/v2/search?q=celebrate&key=${process.env.TENOR_KEY}&limit=1&random=true`

export async function setupDiscord(client: Client, user: string) {
  const guild = await client.guilds.fetch(process.env.SERVER_ID as string) // creates guild object(server)
  const channel = await client.channels.fetch(process.env.CHANNEL_ID as string)
  const members = await guild.members.fetch()
  const member = members.find((m) => m.user.username === user)
  if (!channel)
    throw new Error('Failure connecting to discord server or channel')
  if (!member)
    throw new BadRequest('This user cannot be found on the discord server')
  return { member, channel }
}

export async function postToDiscord(
  message: string,
  member: GuildMember,
  channel: Channel
) {
  postMessage(channel as TextChannel, member, message)
  postGIF(channel as TextChannel)
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

export async function postGIF(channel: TextChannel) {
  const gif = await fetchGIF(TENOR_URL)
  if (!gif) {
    throw new Error(`Failed to fetch GIF`)
  }
  await channel.send(gif)
}

export function findUser(
  members: Collection<string, GuildMember>,
  user: string
) {
  return members.find((member) => member.user.username === user)
}
