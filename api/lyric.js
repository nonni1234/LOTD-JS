const { query } = require('./index.js');
const { getTracks, getTrack } = require('./tracks.js');

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
    if (res.rowCount === 0) {
        return {undefined,undefined}
    }
    const { trackid, lyric } = res.rows[0];
    // console.log("TRACKID: " + trackid);
    return { trackid, lyric };
}


const newLOTD = async () => {
    let { track, lyric} = generateLyric();
    // uncomment line below to remove linebreaks from lyric
    // lyric = lyric.replace("\n", " ");
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

const newLOTDWithMessage = async () => {
    const { trackid } = await getLOTD(); 
    const lyric = await newLOTD();

    if (trackid === undefined) {
        return `**The Lyric Of The Day**\n\n♪ ${lyric} ♪\n\nMake your guess in #bot-spam using /guess`
    } else {
        const prevtrack = getTrack(trackid);
        return `The answer to the **last** LOTD was: ||${prevtrack.name}||\n**The Lyric Of The Day**\n\n♪ ${lyric} ♪\n\nMake your guess in <#${process.env.botspamid}> using /guess`
    }
}

module.exports = { newLOTDWithMessage, generateLyric, getLOTD }