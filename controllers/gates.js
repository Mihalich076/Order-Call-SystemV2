var db = require("../db");

module.exports = {
	getData: function (req, res) {
		db.Gates.findAll({
			order:[
				['id_', 'DESC'],
			]
		}).then(data => res.json(data));
	},
	getActive: function (req, res) {
		db.Gates.findAll({
			where: {
				checked:1,
			},
			order:[
			['id_', 'DESC'],
		]
		}).then(data => res.json(data));
	},

	removeData: function (req, res) {
		db.Gates.findById(req.params.userId)
			.then((user) =>
				user.destroy())
			.then(() =>
				res.json({}));
	},

	addData: function (req, res) {
		db.Gates.create(req.body).then((obj) =>
			res.json({ id: obj.id }));
	},
	updateData: function (req, res) {
		var { value, description } = req.body;
		console.log(value)
		db.Gates.findById(req.params.userId)
			.then((user) =>
				user.update(req.body))
			.then(() =>
				res.json({}));
	}
};