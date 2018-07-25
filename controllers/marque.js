var db = require("../db");


module.exports = {
	getData: function (req, res) {
		db.Setting.findOne({
			where: {
				name: 'marque'
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
	}
};