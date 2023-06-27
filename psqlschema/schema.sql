DROP TABLE IF EXISTS Features CASCADE;

DROP TABLE IF EXISTS Tracks CASCADE;

DROP TABLE IF EXISTS Albums CASCADE;

DROP TABLE IF EXISTS Artists CASCADE ;

DROP TABLE IF EXISTS guesses CASCADE ;

DROP TABLE IF EXISTS Users CASCADE ;

DROP TABLE IF EXISTS lyrics CASCADE ;



CREATE TABLE Artists
(
    ID   SERIAL PRIMARY KEY,
    name varchar(40)
);


CREATE TABLE Albums
(
    ID   SERIAL PRIMARY KEY,
    name varchar(40)
);


CREATE TABLE Tracks
(
    trackID  SERIAL PRIMARY KEY,
    artistID INT         NOT NULL,
    albumID  INT         NULL,
    name     varchar(40) NOT NULL,
    lyrics   TEXT        NOT NULL,
    FOREIGN KEY (artistID) REFERENCES Artists (ID),
    FOREIGN KEY (albumID) REFERENCES Albums (ID)
);


CREATE TABLE Features
(
    artistID INT,
    albumID  INT,
    PRIMARY KEY (artistID,
                 albumID),
    FOREIGN KEY (artistID) REFERENCES Artists (ID),
    FOREIGN KEY (albumID) REFERENCES Albums (ID)
);


CREATE TABLE Users
(
    discordID        INT PRIMARY KEY,
    name             varchar(34) NOT NULL,
    correctGuesses   INT DEFAULT 0,
    incorrectGuesses INT DEFAULT 0
);

CREATE TABLE lyrics
(
    lyricID SERIAL PRIMARY KEY,
    time    timestamp UNIQUE,
    trackID INT  NOT NULL,
    lyric   text NOT NULL,
    FOREIGN KEY (trackID) REFERENCES tracks (trackID)

);


CREATE TABLE guesses
(
    lyricID INT,
    userID  INT,
    time    date NOT NULL,
    correct bool,
    FOREIGN KEY (userID) REFERENCES Users (discordID),
    FOREIGN KEY (lyricID) REFERENCES lyrics (lyricID)
);


