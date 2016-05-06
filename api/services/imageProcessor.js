/**
 * Created by Kos on 21.03.16.
 */

var Jimp = require('jimp'),
    fs = require('fs'),
    fsHelper = require('./fsHelper'),
    path = require('path'),
    ServerSettings = require('./serverSettings');

var ImageProcessor = {

    prepareResizedImages: function(imagePath) {

        var photosDir = ServerSettings.photosDir;
        var self = this;
        var imageName = path.basename(imagePath);
        var resizeResults = [];

        return this.imageSizes.reduce(function(promiseChain, imageSize) { //reduce(previousVal, currentVal)
            return promiseChain.then(function(){

                return new Promise(function(resolve) {
                    var sizeDirName = imageSize.name;
                    console.log("");

                    fsHelper.ensureDirectoryExists(photosDir + sizeDirName)
                        .then(function(sizeDirPath){
                            console.log("Size dir path:", sizeDirPath);
                            resizeResults.push({name: sizeDirName, path: sizeDirPath+imageName});
                            return new Promise(function(resolve){resolve();});
                        })
                        .catch(function(err){
                            console.log("Ensure existence failed:", err);
                            resolve(resizeResults);
                        })

                        //Process image
                        .then(function LoadPhotoToProcess(){
                            console.log("Processing image to",imageSize.name);
                            return Jimp.read(imagePath);
                        })
                        .then(function ResizePhoto(photo){
                            var pathToSave = resizeResults[resizeResults.length-1].path;

                            var isLandscape = photo.bitmap.width >= photo.bitmap.height;
                            console.log("Resizing", isLandscape ? "landscape": "portrait","image and writing to", pathToSave);

                            var suitableImgSize = isLandscape ? imageSize.landscape : imageSize.portrait;
                            return photo.resize(suitableImgSize.width, suitableImgSize.height).write(pathToSave);
                        })
                        .then(function ResizedResult(imageData){
                            console.log(imageSize.name,"size created for file:", imagePath);
                            resolve(resizeResults);
                        })
                        .catch(function PhotoProcessingFailed(err){
                            console.log("Photo processing failed for", fileName,"photo:", err);
                            resolve(resizeResults);
                        });
                });
            });
        },
            Promise.resolve()
        );
    },

    imageSizes: [
        {
            name: 'thumbnails',
            landscape: {
                width: 250,
                height: Jimp.AUTO
            },
            portrait: {
                width: Jimp.AUTO,
                height: 250
            }
        },
        {
            name: 'previews',
            landscape: {
                width: 500,
                height: Jimp.AUTO
            },
            portrait: {
                width: Jimp.AUTO,
                height: 500
            }
        }
    ]

};

module.exports = ImageProcessor;