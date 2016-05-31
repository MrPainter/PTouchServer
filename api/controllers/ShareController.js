/**
 * ShareController
 *
 * @description :: Server-side logic for managing shares
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	//post .../share/:type': 'ShareController.index
	index: function (req, res) {
		console.log("State : Index");

		var shareType = req.params.type;
		var shareInfo = req.body;

		if (shareInfo == null) {
			return res.jsonError("Share info was not specified!");
		}

		console.log("Share type:", shareType);
		console.log(shareInfo);

		return res.json({success: true});
	}
	
};

