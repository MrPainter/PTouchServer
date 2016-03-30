/**
 * Created by Kos on 21.03.16.
 */

var chokidar = require('chokidar');
var ServerSettings = require('./serverSettings'),
    ImageProcessor = require('./imageProcessor');
    Jimp = require('jimp'),
    path = require('path');

function PhotosWatcher() {

        this.watchDir = ServerSettings.photosDir.replace('.', ''); //TODO: Make more smart replacement
        this.targetDir = ServerSettings.originalDir;
        this.thumbnailsDir = ServerSettings.thumbnailsDir;

        console.log('Dir to watch: ', this.watchDir);

        var watcherOptions = {
            ignored: /^\./,
            persistent: true,
            ignoreInitial: true,
            awaitWriteFinish: true,
            depth: 0
            //,stabilityThreshold: 2000   default for awaitWriteFinish
            //,pollInterval: 100          default for awaitWriteFinish
        };

        var watcher = chokidar.watch(process.cwd() + this.watchDir, watcherOptions);

        var self = this;
        watcher
            .on('add', function (filePath) {
                console.log('File', filePath, 'has been added');
                var fileName = path.basename(filePath);

                    Photo.create({name: fileName})
                    //Photo processing
                    .then(function(photoEntity){
                        return ImageProcessor.prepareResizedImages(filePath);
                    })
                    .then(function(resizedImagesInfo) {
                        console.log("Images resized:", resizedImagesInfo);
                    })
                    .catch(function Fail(err) {
                        console.log("Incoming photo processing failed:", err);
                    });
            })
            .on('change', function (filePath) {
                console.log('File', filePath, 'has been changed');
            })
            .on('unlink', function (filePath) {
                console.log('File', filePath, 'has been removed');
            })
            .on('error', function (error) {
                console.error('Error happened', error);
            });

    var watchedPaths = watcher.getWatched();

    console.log('PhotosWatcher service initialized!');

    console.log('Watched paths: ', watchedPaths);

    function resizeImage(width, height) {

    }
};

module.exports = new PhotosWatcher();