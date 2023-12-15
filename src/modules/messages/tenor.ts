import fetch from 'node-fetch'

export default async function fetchGIF (gifUrl: string){
  const response = await fetch(gifUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch GIF: ${response.status}`)
  }
  const jsonRes = await response.json()
  return jsonRes.results[0].url
}
