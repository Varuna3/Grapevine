import { GiphyFetch } from '@giphy/js-fetch-api'
import dotenv from 'dotenv'
dotenv.config()


const gf = new GiphyFetch(process.env.GIPHY_KEY)

export default async function randomGifs(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    const { data: gifs } = await gf.trending({ limit: 10 })
    res.json( gifs )
}