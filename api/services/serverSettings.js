/**
 * Created by Kos on 21.03.16.
 */

var photosDir = './photos/';

var settings = {

    printing: {
        printerName: "PDFWriter"
    },

    directories: {
        logs: "./logs/"
    },

    photosDir: photosDir,
    originalDir: photosDir + 'originals/',
    thumbnailsDir: photosDir + 'thumbnails/',
    previewDir: '/previews/',

    previewDir: '/previews/',

    bundlesDir: './bundles/'
};

module.exports = settings;