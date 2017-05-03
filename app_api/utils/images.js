const sharp = require('sharp');

//let exports = module.exports = {};

exports.saveImage1500x350 = (filename, path) => {
    const imageFile = `images/cropped/${filename}`;
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

exports.saveImage486x300 = (filename, path) => {
    const imageFile = `images/slide/${filename}`;
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

exports.saveImageProfile = (filename, path, id) => {
    const thumbnailFile = `images/profile/${id}`;
    console.log("creating profile picture");
    sharp(path)
        .resize(50, 50)
        .toFile('public/' + thumbnailFile)
        .then(() => {
            console.log('saved image in profile pricture resolution');
        }).catch((err) => {
            console.log(err);
        });
    return thumbnailFile;
};