import { GiphyFetch } from '@giphy/js-fetch-api'
import dotenv from 'dotenv'
dotenv.config()


const gf = new GiphyFetch(process.env.GIPHY_KEY)


export default async function getGiphy(req, res) {
    let searchterm = req.params
    console.log('HIT GIPHY', searchterm)
    const { data: gifs } = await gf.search(searchterm, { sort: 'relevant', lang: 'es', limit: 10, type: 'stickers' })
    console.log('DATA in GIPHY', data)
    
    res.json(data)
}
