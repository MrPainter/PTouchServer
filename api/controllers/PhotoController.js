/**
 * PhotoController
 *
 * @description :: Server-side logic for managing photos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs'),
    fsHelper = require('../services/fsHelper');
var serverConf = require('../services/serverSettings');
var _ = require('lodash');

module.exports = {

    // api../photos/list?id=N&skip=X&limit=Y
    list: function(req, res) {
        console.log('Photos:list');
        
        var id = req.query.id;
        var skip = req.query.skip;
        var limit = req.query.limit;

        var dbQuery = null;
        if(id || skip || limit) {
            dbQuery = {};
            if (id) {
                dbQuery.where = { uid : { '>' : id } };
            }
            if(skip) {
                dbQuery.skip = skip;
            }
            if(limit) {
                dbQuery.limit = limit;
            }
        }

        Photo.find(dbQuery)
            .then(function(photos){
                res.json({photos: photos});
            }).
            catch(function(err){
                sails.log.error("Error during photos request with query: [", dbQuery, "]. Error: ", err);
                res.json({error: "Error occured during searching over photos entities!"});
            });
    },


    // api../photos/thumbnails/:photoName
    thumbnails: function(req, res) {
        console.log('Photos:thumbnail');

        req.params.size = 'thumbnails';

        return this.resized(req, res);
    },

    // api../photos/previews/:photoName
    previews: function(req, res) {
        console.log('Photos:preview');

        req.params.size = 'previews';

        return this.resized(req, res);
    },

    //api../photos/:size/:photoName
    resized: function(req, res) {

        var size = req.params.size;
        if (!size) {
            return res.json({error: "You have to specify size of photo!"});
        }
        var photoName = req.params.photoName;
        if (!photoName) {
            return res.json({error: "You have to specify name of photo!"});
        }

        return this.getResizedPhoto(size, photoName, res);
    },

    getResizedPhoto: function(size, photoName, res) {

        var sizePath = serverConf.photosDir + size;
        fsHelper.directoryExists(sizePath)
            .then(function(isExist){
                if(isExist) {
                    var thumbs = fs.readdirSync(sizePath);
                    thumbs = thumbs.filter(function(thumb) {
                        return thumb == photoName ? -1 : 0;
                    });

                    if (thumbs.length == 0) {
                        return res.json({error: "There is no photo with ["+ photoName + "] name and ["+ size +"] size!"});
                    }

                    var firstThumb = thumbs[0];
                    var pathToThumb = sizePath + '/' + firstThumb;

                    var img = fs.readFileSync(pathToThumb);
                    res.writeHead(200, {'Content-Type': 'image/jpeg' });
                    res.end(img, 'binary');
                } else {
                    return res.json({error: "There are no photos with ["+ size +"] size! Possibly not existed size specified!"});
                }
            })
            .catch(function(err){
                sails.log.error("Error during dir checking:", err);
                res.json({error: "Server error for specified size!"});
            });
    },

    //api../photos/print
    print: function(req, res) {
        console.log('Photos:print');

        var body = req.body;        
        if (!body || !body.photos) {
            res.json({error: "Post parameter photos was not found!"});
            return;
        }

        var photos = body.photos;        
        if (photos.length == 0) {
            res.json({error: "There are no photos specified for print!"});
            return;
        }

        console.log(photos);
        //TODO: Print (using print service)

        res.json({success: true});
    }
};

