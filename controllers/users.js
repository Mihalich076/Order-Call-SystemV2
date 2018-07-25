var formidable = require('formidable');
var db = require("../db");

module.exports = {
	getData: function (req, res) {
		db.User.findAll().then(data => res.json(data));
	},

	 
	removeData: function (req, res) {
		db.User.findById(req.params.userId)
			.then((user) =>
				user.destroy())
			.then(() =>
				res.json({}));
	},

	addData: function (req, res) {
		db.User.create(req.body).then((obj) =>
			res.json({ id: obj.id }));
	},
	updateData: function (req, res) {
		var { username, password } = req.body;
		console.log(username, password)
		db.User.findById(req.params.userId)
			.then((user) =>
				user.update(req.body))
			.then(() =>
				res.json({}));
	}
};