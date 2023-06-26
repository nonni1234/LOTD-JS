const { query } = require('./index.js');
const { getTracks } = require('./tracks.js');

const randint = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const generateLyric = () => {
    // Select a track at random
    const tracks = getTracks();
    const selectedTrack = tracks[randint(0,tracks.length)]

    // Filter the lyrics into a list of lines
    let lines = selectedTrack.lyrics.split("\n");
    lines = lines.map(x => x.trim());
    lines = lines.filter(x => x !== '');

    // Pick two random lines
    let i = randint(0,lines.length-1); 
    const lyric = lines.slice(i,i+2).join("\n")   

    return {
        "track": selectedTrack,
        "lyric": lyric
    }
}


const getLOTD = async () => {
    const res = await query(`SELECT trackid, lyric FROM lyrics ORDER BY time DESC LIMIT 1;`);
    const { trackid, lyric } = res.rows[0];
    console.log("TRACKID: " + trackid);
    return { trackid, lyric };
}


const newLOTD = async () => {
    const { track, lyric} = generateLyric();
    lyric.replace("\n", "");
    try {
        const res = await query(`INSERT INTO lyrics (time, trackid, lyric) VALUES (CURRENT_TIMESTAMP, ${track.trackid}, $$${lyric}$$);`);
        if (res.rowCount > 0) console.log("LOTD Updated Successfully");
        else throw Error("Insert Failed");
        return lyric
    } catch (error) {
        console.error("Unexpected Error: " + error.message);
        return undefined
    }

}
module.exports = { newLOTD, generateLyric, getLOTD }