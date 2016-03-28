/**
 * SettingsController
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // api../settings
	index: function(req, res) {
        console.log('Settings:index');

        res.json({id: '321', photosSelectable: '5'});
    }
};

