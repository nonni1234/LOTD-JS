const { query } = require('./index.js')

let tracks

const initTracks = async () => {
    const result = await query('SELECT * FROM tracks;');
    console.log("Tracks",result.rows.map((r)=>r.name));
    tracks = result.rows;
}

initTracks();

const getTracks = () => {
    return tracks
}


module.exports = { getTracks }