DROP TABLE IF EXISTS Features;


DROP TABLE IF EXISTS Albums;


DROP TABLE IF EXISTS Tracks;


DROP TABLE IF EXISTS Artists;


DROP TABLE IF EXISTS Users;


CREATE TABLE Artists ( ID SERIAL PRIMARY KEY,
                                         name varchar(40));


CREATE TABLE Albums ( ID SERIAL PRIMARY KEY,
                                        name varchar(40),);


CREATE TABLE Tracks ( ID SERIAL PRIMARY KEY,
                                        artistID INT, albumID INT NULL,
                                                                  name varchar(40),
                                                                       lyrics TEXT,
                     FOREIGN KEY (artistID) REFERENCES Artists(ID),
                     FOREIGN KEY (albumID) REFERENCES Albums(ID));


CREATE TABLE Features ( artistID INT, albumID INT, PRIMARY KEY (artistID,
                                                                albumID),
                       FOREIGN KEY (artistID) REFERENCES Artists(ID),
                       FOREIGN KEY (albumID) REFERENCES Albums(ID));


CREATE TABLE Users ( discordID INT PRIMARY KEY,
                                           name varchar(34),
                                                correctGuesses INT 0,
                                                                   incorrectGuesses INT 0);

