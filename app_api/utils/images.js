const sharp = require('sharp');

//let exports = module.exports = {};

exports.saveImageEventHeader = (filename, path) => {
    const imageFile = `images/header/${filename}`;
    //console.log('creating 768 720!');
    sharp(path)
        .resize(1500, 350)
        .crop(sharp.gravity.center)
        .toFile('public/' + imageFile)
        .then(() => {
            //console.log('saved image in 768x720 resolution');
        }).catch((err) => {
            console.log(err);
        });
    return imageFile;
};

exports.saveImageEventSlider = (filename, path) => {
    const imageFile = `images/slider/${filename}`;
    sharp(path)
        .resize(486, 300)
        .crop(sharp.gravity.center)
        .toFile('public/' + imageFile)
        .then(() => {
            //console.log('saved image in 768x720 resolution');
        }).catch((err) => {
            console.log(err);
        });
    return imageFile;
};

exports.saveImageProfileMedium = (filename, path) => {
    const thumbnailFile = `images/medium/${filename}`;
    sharp(path)
        .resize(200, 200)
        .toFile('public/' + thumbnailFile)
        .then(() => {
            //console.log('saved image in medium profile pricture resolution');
        }).catch((err) => {
            console.log(err);
        });
    return thumbnailFile;
};

exports.saveImageProfileSmall = (filename, path) => {
    const thumbnailFile = `images/small/${filename}`;
    sharp(path)
        .resize(50, 50)
        .toFile('public/' + thumbnailFile)
        .then(() => {
            //console.log('saved image in small profile pricture resolution');
        }).catch((err) => {
            console.log(err);
        });
    return thumbnailFile;
};