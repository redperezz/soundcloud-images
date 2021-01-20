const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const bands = require('./bandData.js');

const getRandomNum = max => Math.floor(Math.random() * Math.floor(max));
const getUniqueSongName = () => {
  let uniqueSongs = [];
  const getSongName = faker.lorem.words();
  const splitSongName = getSongName.split(' ');
  const capFirstLetters = splitSongName.map(word => word = word.charAt(0).toUpperCase() + word.substr(1));
  const joinSongName = capFirstLetters.join(' ');
  if (uniqueSongs.indexOf(joinSongName) === -1) {
    uniqueSongs.push(joinSongName);
    return joinSongName;
  } else {
    getUniqueSongName();
  }
};
const getUniqueBandName = () => {
  let uniqueBandNames = [];
  const uniqueBand = faker.vehicle.vehicle();
  if (uniqueBandNames.indexOf(uniqueBand) === -1) {
    uniqueBandNames.push(uniqueBand);
    return uniqueBand;
  } else {
    getUniqueBandName();
  }
};

const writeCsvFile = async (fileCount) => {
  if (fileCount <= 10) {
    try {
      console.log(`Writing csv file ${fileCount}.`);
      writer.pipe(fs.createWriteStream(`./csv/data${fileCount}.csv`));
      let bandIds = [];
      let bandNames =[];
      for (let i = 0; i < 1000000; i++) {
       await writer.write({
          band_id: i + 1,
          song_id: i + 1,
          song_name: getUniqueSongName(),
          band_name: getUniqueBandName(),
          followers: getRandomNum(10000000),
          tracks: getRandomNum(2500000),
          band_image_url: bands.bandImages[getRandomNum(150)],
        })
      }
      console.log(`Done writing data to csv file ${fileCount}.`);
      if (fileCount <= 10) {
        writeCsvFile(fileCount + 1);
      }
    } catch(err) {
      console.log(err);
    }
  } else {
    writer.end();
  }
};

writeCsvFile(1);
