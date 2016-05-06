/**
 * Created by kchistyak on 30.03.2016.
 */

var fs = require('fs');

//CAN'T LOG ANYTHING !

var fsHelper = {
    ensureDirectoryExists: function (path, mask) {
        if (!mask) { // allow the `mask` parameter to be optional
            mask = 0777;
        }

        return new Promise(function(resolve, reject){
            fs.mkdir(path, mask, function(err) {
                var resolvablePath = path + '/';
                if (err) {
                    if (err.code == 'EEXIST') resolve(resolvablePath); // ignore the error if the folder already exists
                    else reject(err); // something else went wrong
                } else { // successfully created folder
                    console.log("Directory", path, "successfully created!");
                    resolve(resolvablePath);
                }
            });
        });

    },

    ensureDirectoryExistsSync: function (path, mask) {
        if (!mask) { // allow the `mask` parameter to be optional
            mask = 0777;
        }

        fs.mkdir(path, mask, function(err) {
            if (err) {
                if (err.code == 'EEXIST') return; // ignore the error if the folder already exists
                else console.log("Error during ensure directory:", err); // something else went wrong
            } else { // successfully created folder
                console.log("Directory", path, "successfully created!");
            }
        });
    },

    directoryExists: function (directory) {
        return new Promise(function(resolve, reject){
            fs.stat(directory, function(err, stats) {
                //Check if error defined and the error code is "not exists"
                if (err) {
                    if (err.code == 'ENOENT') {
                        //Does not exists
                        resolve(false);
                    } else {
                        //just in case there was a different error:
                        reject("Some undefined error happened during dir check: " + err);
                    }
                }
                resolve(true);
            });
        });
    }

}

module.exports = fsHelper;