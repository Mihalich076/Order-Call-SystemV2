var db = require("../db");


module.exports = {
	getOrder: function (req, res) {
		db.Setting.findOne({
			where: {
				name: 'OrderSound'
			}
		}).then(data => res.json(data));
	},

	getPlayer: function (req, res) {
		db.Setting.findOne({
			where: {
				name: 'PlayerSound'
			}
		}).then(data => res.json(data));
	},
	updateData: function (req, res) {
		//alert($$('text').getValue()) 
		var { value } = req.body;
		console.log(value)
		db.Setting.findById(req.params.userId)
			.then((user) =>
				user.update(req.body))
			.then(() =>
				res.json({}));
	},
	
};