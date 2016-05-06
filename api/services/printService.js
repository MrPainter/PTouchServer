
var fs = require('fs'),
    printer = require('printer'),
    exec = require('child_process').exec,
    serverConf = require('./serverSettings'),
    path = require('path');

var Printer = {

    printFile: function (filePath) {
        return new Promise(function(resolve, reject){
            if( process.platform == 'win32') {
                var printerName = serverConf.printing.printerName;           

                filePath = path.join(process.cwd(), path.normalize(filePath));
                
                var command = 'rundll32 c:/windows/system32/shimgvw.dll,ImageView_PrintTo /pt "'+ filePath +'" "' + printerName +'"';
                console.log(command);

                exec(command, function(error, stdout, stderr){
                    if (error !== null) {
                        reject(error);
                    }

                    resolve();
                });
            } else {
                reject('No printing defined for non win32');
            }            
        });
    },

    // DOES NOT WORK [TBD]
    printFile2: function (filePath) {

        if( process.platform != 'win32') {

            console.log('Printing. Platform != win32');
            return new Promise(function(resolve, reject){
                printer.printFile({
                    fileName: filePath,
                    printer: process.env[3],
                    success: function (jobId) {
                        console.log('JobId', jobId);
                        resolve(jobId);
                    },
                    error: function (err) {
                        reject(err);
                    }
                });
            });
        } else {            
            var data = fs.readFileSync(filePath, 'binary');
            return this.printData(data);
        }
    },

    // DOES NOT WORK [TBD]
    printData: function (data) {

        console.log('Printing. Platform: win32');
        console.log('Data:', data);
        return new Promise(function(resolve, reject){
            printer.printDirect({
                data: data,
                type: 'RAW',
                success: function (jobId) {
                    console.log('JobId', jobId);
                    resolve(jobId);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
    }

}

module.exports = Printer;