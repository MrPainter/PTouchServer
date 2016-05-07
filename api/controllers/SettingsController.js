/**
 * SettingsController
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');

module.exports = {

    // api../settings
	index: function(req, res) {
        console.log('Settings:index');

        var fileContent = fs.readFileSync('clientSettings.json', 'utf8');
        var jsonSettings = JSON.parse(fileContent);       

        res.json(jsonSettings);
    }
};

