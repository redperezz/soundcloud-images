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
  try {
    writer.pipe(fs.createWriteStream(`./csv/data.csv`));
      for (let i = 1; i <= 10000000; i++) {
        await writer.write({
          band_id: i,
          song_id: i,
          song_name: getUniqueSongName(),
          band_name: getUniqueBandName(),
          followers: getRandomNum(10000000),
          tracks: getRandomNum(2500000),
          band_image_url: bands.bandImages[getRandomNum(150)],
        })
      }
      writer.end();
      console.log('Done writing data to csv file');
    } catch(err) {
    console.log(err);
  }
};

writeCsvFile();

// const writeCsvFile = async (fileCount) => {
//   try {
//     let fileOneStart = 1;
//     let fileOneEnd = 1000000;
//     let fileTwoStart = 1000001;
//     let fileTwoEnd = 2000000;
//     let fileThreeStart = 2000001;
//     let fileThreeEnd = 3000000;
//     let fileFourStart = 3000001;
//     let fileFourEnd = 4000000;
//     let fileFiveStart = 4000001;
//     let fileFiveEnd = 5000000;
//     let fileSixStart = 5000001;
//     let fileSixEnd = 6000000;
//     let fileSevenStart = 6000001;
//     let fileSevenEnd = 7000000;
//     let fileEightStart = 7000001;
//     let fileEightEnd = 8000000;
//     let fileNineStart = 8000001;
//     let fileNineEnd = 9000000;
//     let fileTenStart = 9000001;
//     let fileTenEnd = 10000000;
//     if (fileCount > 10) {
//       writer.end();
//       console.log('Done writing data to csv file');
//     } else {
//       writer.pipe(fs.createWriteStream(`./csv/data${fileCount}.csv`));
//       let fileStart;
//       let fileEnd;
//       if (fileCount === 1) {
//         fileStart = fileOneStart;
//         fileEnd = fileOneEnd;
//       } else if (fileCount === 2) {
//         fileStart = fileTwoStart;
//         fileEnd = fileTwoEnd;
//       } else if (fileCount === 3) {
//         fileStart = fileThreeStart;
//         fileEnd = fileThreeEnd;
//       } else if (fileCount === 4) {
//         fileStart = fileFourStart;
//         fileEnd = fileFourEnd;
//       } else if (fileCount === 5) {
//         fileStart = fileFiveStart;
//         fileEnd = fileFiveEnd;
//       } else if (fileCount === 6) {
//         fileStart = fileSixStart;
//         fileEnd = fileSixEnd;
//       } else if (fileCount === 7) {
//         fileStart = fileSevenStart;
//         fileEnd = fileSevenEnd;
//       } else if (fileCount === 8) {
//         fileStart = fileEightStart;
//         fileEnd = fileEightEnd;
//       } else if (fileCount === 9) {
//         fileStart = fileNineStart;
//         fileEnd = fileNineEnd;
//       } else if (fileCount === 10) {
//         fileStart = fileTenStart;
//         fileEnd = fileTenEnd;
//       }
//       for (let i = fileStart; i <= fileEnd; i++) {
//         await writer.write({
//           band_id: i,
//           song_id: i,
//           song_name: getUniqueSongName(),
//           band_name: getUniqueBandName(),
//           followers: getRandomNum(10000000),
//           tracks: getRandomNum(2500000),
//           band_image_url: bands.bandImages[getRandomNum(150)],
//         })
//       } writeCsvFile(fileCount + 1);
//     }
//   } catch(err) {
//     console.log(err);
//   }
// };

// writeCsvFile(1);
