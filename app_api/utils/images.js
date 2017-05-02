const sharp = require('sharp');

//let exports = module.exports = {};

exports.saveImage1500x350 = (filename, path) => {
    const imageFile = `images/cropped/${filename}`;
    console.log('creating 768 720!');
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

exports.saveThumbnail = (filename, path) => {
    const thumbnailFile = `images/thumbnail/${filename}`;
    sharp(path)
        .resize(320, 300)
        .toFile('public/' + thumbnailFile)
        .then(() => {
            //console.log('saved image in 320x300 resolution');
        }).catch((err) => {
            console.log(err);
        });
    return thumbnailFile;
};