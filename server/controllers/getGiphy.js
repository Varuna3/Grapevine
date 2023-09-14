import { GiphyFetch } from '@giphy/js-fetch-api'
import dotenv from 'dotenv'
dotenv.config()


const gf = new GiphyFetch(process.env.GIPHY_KEY)

console.log('GF', gf)


export default async function getGiphy(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    let { searchterm } = req.params

    const { data: gifs } = await gf.search(`${searchterm}`, { limit: 10 })

    res.json( gifs )
}
