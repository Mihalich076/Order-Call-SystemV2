var db = require("../db");

module.exports = {
	getData: function (req, res) {
	//	db.Playlist.findAll({},{id:0,updatedAt:0,createdAt:0}).then(data => res.json(data));
		db.Playlist.findAll({
			order:[
				['sort', 'ASC'],
			]
		}).then(data => res.json(data));
	},
	getDatano: function (req, res) {
		//	db.Playlist.findAll({},{id:0,updatedAt:0,createdAt:0}).then(data => res.json(data));
			db.Playlist.findAll({},{id:0,updatedAt:0,createdAt:0}).then(res.data);
		},
	removeData: function (req, res) {
		db.Playlist.findById(req.params.userId)
			.then((user) =>
				user.destroy())
			.then(() =>
				res.json({}));
	},

	addData: function (req, res) {
		db.Playlist.create(req.body).then((obj) =>
			res.json({ id: obj.id }));
	},
	updateData: function (req, res) {
		var { value, description } = req.body;
		console.log(value)
		db.Playlist.findById(req.params.userId)
			.then((user) =>
				user.update(req.body))
			.then(() =>
				res.json({}));
	},
	updateAll:function(req,res){
		db.Playlist.update({src:req.body.src, timer:req.body.timer, checked:req.body.checked, sort:req.body.sort},{ where : { id :req.body.id }}).then(() =>
		res.json({}));

	}
};