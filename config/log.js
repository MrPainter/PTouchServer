/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */

var winston = require('winston'),
    ServerSettings = require('../api/services/serverSettings'),
    fsHelper = require('../api/services/fsHelper');

var logDirectory = ServerSettings.directories.logs;

fsHelper.ensureDirectoryExistsSync(logDirectory, 0777);

var customLogger = new winston.Logger({
    level: 'info',
    transports: [
      new (winston.transports.Console)({
        level: 'debug',
        colorize: true
      })
      ,
      //Ensure dir exists by adding grunt task for dir creation
      new (winston.transports.File)({ 
        filename: logDirectory + 'PTouch_server.log',
        maxsize: 5120000,                                 
        maxFiles: 3,          
        json: true
      })
    ]
  });

module.exports.log = {
  // Pass in our custom logger, and pass all log levels through.
  custom: customLogger,
  //level: 'debug',

  // Disable captain's log so it doesn't prefix or stringify our meta data.
  inspect: false
};
