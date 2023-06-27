const { query } = require('./index.js');

let tracks;

const initTracks = async () => {
    const result = await query('SELECT * FROM tracks;');
    console.log("Tracks",result.rows.map((r)=>r.name));
    tracks = result.rows;
}

const getTracks = () => {
    return tracks;
}

const getTrack = (id) => {
    // console.log(id);
    return tracks.find(t => t.trackid === id);
}


module.exports = { getTracks, initTracks, getTrack }