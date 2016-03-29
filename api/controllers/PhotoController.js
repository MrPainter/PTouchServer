/**
 * PhotoController
 *
 * @description :: Server-side logic for managing photos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var serverConf = require('../services/serverSettings');
var _ = require('lodash');

module.exports = {

    // api../photos/list?id=N&skip=X&limit=Y
    list: function(req, res) {
        console.log('Photos:list');

//        var thumbsPath = '.' + serverConf.photosDir + serverConf.thumbnailsDir;
//        var thumbs = fs.readdirSync(thumbsPath);

//        console.log(req.query);

        var id = req.query.id;
        var skip = req.query.skip;
        var limit = req.query.limit;


        var dbQuery = null;
        if(id || skip || limit) {
            dbQuery = {};
            if (id) {
                dbQuery.where = { id : { '>' : id } };
            }
            if(skip) {
                dbQuery.skip = skip;
            }
            if(limit) {
                dbQuery.limit = limit;
            }

//            if (req.query.skip) {
//                thumbs = _(thumbs).slice(req.query.skip);
//            }
//            if (req.query.limit) {
//                thumbs = _(thumbs).take(req.query.limit);
//            }
//            thumbs = thumbs.value();
        }

        Photo.find(dbQuery)
            .then(function(photos){
                res.json(photos);
            }).
            catch(function(err){
                console.log("Error during photos request with query:", dbQuery);
                console.log("Error:", err);
            });
    },


    // api../photos/thumbnail/:name
    thumbnail: function(req, res) {
        console.log('Photos:thumbnail');

        var fileName = req.params.name;
        if (!fileName) {
            return res.json({error: "You have to specify filename!"});
        }

        var thumbsPath = serverConf.thumbnailsDir;
        var thumbs = fs.readdirSync(thumbsPath);

        thumbs = thumbs.filter(function(thumb) {
            return thumb == fileName ? -1 : 0;
        });

        var firstThumb = thumbs[0];
        var pathToThumb = thumbsPath + '/' + firstThumb;

        var img = fs.readFileSync(pathToThumb);
        res.writeHead(200, {'Content-Type': 'image/jpeg' });
        res.end(img, 'binary');
    },

    preview: function(req, res) {
        console.log('Photos:preview');
    }
};

