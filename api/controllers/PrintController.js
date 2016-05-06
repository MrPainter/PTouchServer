/**
 * PrintController
 *
 * @description :: Server-side logic for managing prints
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var printService = require('../services/printService'),
     serverConf = require('../services/serverSettings'),
     fsHelper = require('../services/fsHelper');

module.exports = {
	
    // ...api/print/:photoName
    index: function (req,res) {
        console.log('Print:Index')

        var photoName = req.params.photoName;
        var filePath = serverConf.photosDir + photoName;

        fsHelper.directoryExists(filePath)
            .then(function(isExists){
                if (isExists) {
                    return printService.printFile(filePath);
                }
                return Promise.reject("File with path [" + filePath + "] does not exist!");
            })        
            .then(function () {
                sails.log.info('File [%s] printed successfully', filePath);
                return res.json({status: 200});
            })
            .catch(function (err) {
                sails.log.error('There is an error occur during printing:', err);
                return res.jsonError('Printing failed! Error: ' + err);
            });
    }

};

