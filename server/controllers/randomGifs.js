export default async function randomGifs(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    const { data: gifs } = await gf.trending({ limit: 10 })
    res.json( gifs )
}