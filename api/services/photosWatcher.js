/**
 * Created by Kos on 21.03.16.
 */

var chokidar = require('chokidar');
var ServerSettings = require('./serverSettings'),
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

                Counter.getNextSequence(Photo.sequenceId)
                    .then(function CreatePhotoRecord(seqId) {
                        return Photo.create({id: seqId, name: fileName});
                    }, function(err) {
                        console.log("Error to obtain next sequence Id");
                    })
                    .catch(function PhotoRecordFailed(err) {
                        console.log("Photo record creation failed");
                    })

                    //Photo processing
                    .then(function LoadPhotoToProcess(photoEntity){
                        console.log("Created record for photo with name " + photoEntity.name);
                        return Jimp.read(filePath);
                    })
                    .then(function ResizePhoto(photo){
                        return photo.resize(250, Jimp.AUTO).write(self.thumbnailsDir + fileName);
                    })
                    .then(function ResizedResult(imageData){
                        console.log("Thumbnail created for file:", fileName);
                    })
                    .catch(function PhotoProcessingFailed(err){
                        console.log("Photo processing failed for", fileName,"photo:", err);
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
};

module.exports = new PhotosWatcher();