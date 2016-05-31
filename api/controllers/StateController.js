/**
 * StateController
 *
 * @description :: Server-side logic for managing States
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res) {
		console.log("State : Index");
		var clientState = req.body.clientState;

		console.log(clientState);

		return res.json({success: true});
	}
	
};

