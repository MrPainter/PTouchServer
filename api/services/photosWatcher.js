/**
 * Created by Kos on 21.03.16.
 */

var chokidar = require('chokidar');
var ServerSettings = require('./serverSettings'),
    path = require('path');

function PhotosWatcher() {

        this.watchDir = ServerSettings.photosDir;
        this.targetDir = ServerSettings.originalDir;

        console.log('Dir to watch: ', this.watchDir);

        var watcherOptions = {
            ignored: /^\./,
            persistent: true,
            ignoreInitial: true,
            awaitWriteFinish: true
            //,stabilityThreshold: 2000   default for awaitWriteFinish
            //,pollInterval: 100          default for awaitWriteFinish
        };

        var watcher = chokidar.watch(process.cwd() + this.watchDir, watcherOptions);

        watcher
            .on('add', function (filePath) {
                console.log('File', filePath, 'has been added');
                var fileName = path.basename(filePath);

                var p = Counter.getNextSequence(Photo.sequenceId)
                    .then(function CreatePhotoRecord(seqId) {
                        return Photo.create({id: seqId, name: fileName});
                    }, function(err) {
                        console.log("Error to obtain next sequence Id");
                    })
                    .catch(function PhotoRecordFailed(err) {
                        console.log("Photo record creation failed");
                    })
                    .then(function ResizePhoto(photoEntity){
                        console.log("Created record for photo with name " + photoEntity.name);
                        //TODO: Process thumbnails
                    })
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