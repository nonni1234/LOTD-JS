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


const newLOTD = async () => {
    const { track, lyric} = generateLyric();
    console.log(lyric);
    query(`INSERT INTO lyrics (time, trackid, lyric)
    VALUES (CURRENT_TIMESTAMP, ${track.trackid}, $$${lyric}$$);`).then(res => {
        return lyric
    }).catch(err => {
        console.error("Something went wrong during insert " + err.message)
    })
    
}
module.exports = { newLOTD, generateLyric }