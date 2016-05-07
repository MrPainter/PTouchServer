/**
 * BundleController
 *
 * @description :: Server-side logic for managing Bundles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs'),
    fsHelper = require('../services/fsHelper');
    ServerSettings = require('../services/serverSettings');

module.exports = {

    // api../bundle/:guid
    index: function(req, res) {
        console.log('Bundle:index');

        var guid = req.params.guid;
        console.log("Bundle guid:", guid);
        if (!guid) {
            return res.json({error: "You have to specify bundle guid!"});
        }

        fsHelper.ensureDirectoryExists(ServerSettings.bundlesDir)
            .then(function(bundlesDir) {
                var filePath = bundlesDir + guid + '.zip';
                console.log("File path:", filePath);
                try  {
                    fs.statSync(filePath).isFile();
                }
                catch (e) {
                    return res.json({error: "There is no bundle with specified guid!"});
                }

                console.log("File exists");
                var img = fs.readFileSync(filePath);
                res.writeHead(200, {'Content-Type': 'application/zip' });
                res.end(img, 'binary');

                return res;
            })
    }

};

