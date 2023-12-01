import { Client, GatewayIntentBits, Events } from 'discord.js'

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
})

client.once(Events.ClientReady, async (readyClient) => {
  // eslint-disable-next-line no-console
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(process.env.BOT_TOKEN)

export default client
