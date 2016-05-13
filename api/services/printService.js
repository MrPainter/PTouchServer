
var fs = require('fs'),
    printer = require('printer'),
    exec = require('child_process').exec,
    serverConf = require('./serverSettings'),
    path = require('path');

var Printer = {

    printFile: function (filePath) {
        var self = this;
        return new Promise(function(resolve, reject){
            var printerName = serverConf.printing.printerName;        
            filePath = path.join(process.cwd(), path.normalize(filePath));
            var command = ""
            if( process.platform == 'win32') {                               
                command = 'rundll32 c:/windows/system32/shimgvw.dll,ImageView_PrintTo /pt "'+ filePath +'" "' + printerName +'"';                
            } else {
                command = 'lp -d ' + printerName + ' ' + filePath;

                // var message = 'No printing defined for non win32';
                // sails.log.error(message);
                // reject(message);
            }

            exec(command, function(error, stdout, stderr){
                    if (error !== null) {
                        sails.log.error('Error during print command execution:', error);
                        reject(error);
                    }

                    resolve();
                });            
        });
    },

    // DOES NOT WORK [TBD]
    printFile2: function (filePath) {

        if( process.platform != 'win32') {
            var printerName = printer.getDefaultPrinterName();
            console.log("Printer:", printerName);

            return new Promise(function(resolve, reject){
                printer.printFile({
                    fileName: filePath,
                    printer: printerName,
                    success: function (jobId) {
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
        var printerName = printer.getDefaultPrinterName();
        console.log("Printer:", printerName);

        return new Promise(function(resolve, reject){
            printer.printDirect({
                data: data,
                type: 'RAW',
                printer: printerName,
                success: function (jobId) {
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