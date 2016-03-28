/**
 * Created by Kos on 21.03.16.
 */

var chokidar = require('chokidar');
var ServerSettings = require('./serverSettings');

var Photo = require('../models/Photo');

function PhotosWatcher() {

        this.watchDir = ServerSettings.photosDir;
        this.targetDir = ServerSettings.originalDir;

        console.log('Dir to watch: ', this.watchDir);

        var watcher = chokidar.watch(process.cwd() + this.watchDir, {ignored: /^\./, persistent: true})
//            .on('all', function(event, path) {
//            console.log(event, path);
//        });

        watcher
            .on('add', function (path) {
                console.log('File', path, 'has been added');
                Photo.create(
                    {
                        id: 0,
                        name: path
                    },
                    function(err, created) {
                        if (!err) {
                            console.log("Created record for photo with name " + created.name)
                        }
                });
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