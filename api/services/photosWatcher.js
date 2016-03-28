/**
 * Created by Kos on 21.03.16.
 */

var chokidar = require('chokidar');
var ServerSettings = require('./serverSettings');

//var Photo = require('../models/Photo');

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
            .on('add', function (path) {
                console.log('File', path, 'has been added');

                var p = Counter.getNextSequence(Photo.sequenceId)
                    .then(function(seqId) {
                        return Photo.create({id: seqId, name: path});
                    })
                    .then(function(photoEntity){
                        console.log("Created record for photo with name " + photoEntity.name);
                    });



//                Photo.create(
//                    {
//                        id: Counter.getNextSequence(Photo.sequenceId),
//                        name: path
//                    },
//                    function(err, created) {
//                        if (!err) {
//                            console.log("Created record for photo with name " + created.name)
//                        }
//                });
            })
            .on('change', function (path) {
                console.log('File', path, 'has been changed');
            })
            .on('unlink', function (path) {
                console.log('File', path, 'has been removed');
            })
            .on('error', function (error) {
                console.error('Error happened', error);
            });

    var watchedPaths = watcher.getWatched();

    console.log('PhotosWatcher service initialized!');

    console.log('Watched paths: ', watchedPaths);
};

module.exports = new PhotosWatcher();