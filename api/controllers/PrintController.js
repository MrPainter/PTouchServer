/**
 * PrintController
 *
 * @description :: Server-side logic for managing prints
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var printService = require('../services/printService'),
     serverConf = require('../services/serverSettings');

module.exports = {
	
    // ...api/print/:photoName
    index: function (req,res) {
        console.log('Print:Index')

        var photoName = req.params.photoName;
        var filePath = serverConf.photosDir + photoName;

        sails.log.info('File path:', filePath);

        printService.printFile(filePath)
            .then(function (jobId) {
                console.log('Printed successfully');
                sails.log.info('File [%s] printed successfully', filePath);
                return res.json({status: 200});
            })
            .catch(function (err) {
                console.log('There is an error occur during printing:', err);
                return res.json({error: 'Printing failed!'});
            });
    }

};

