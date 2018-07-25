var express = require('express');
var fs = require('fs');
var multer = require('multer');
var util = require('util');
var exphbs = require('express-handlebars');
var upload = require('express-fileupload');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket = require('socket.io');
var db = require("./db");
var path = require('path');
var filemanager = require('./files');
var app = express();
var helmet=require("helmet");
var xFrameOptions = require('x-frame-options')
app.use(xFrameOptions())



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));


// read Filemanager config
// config is shared between server and client parts
var config = JSON.parse(
  fs.readFileSync('public/Filemanager/scripts/filemanager.config.js')
);

// additional connector-specific options
config.connector = {

  // set path to web-server root
  serverRoot: './public',

  // path to Filemanager sources under server root
  fmSrcPath: '/Filemanager',

  // uploader should be a preconfigured instance of multer
  uploader: multer({ dest: 'uploads' })
};

// set Filemanager file root outside server root
// serverRoot is set to false in the config file
config.options.fileRoot = require('path').join(__dirname, '/uploads/');
console.log(__dirname+"data/");
// simplest logger with timestamps
var logger = {
  debug: util.log,
  info: util.log,
  error: util.log
};

// filemanager returns express middleware function
// that handle all Filemanager requests
var fm = filemanager(config, logger);
app.use('/fm', fm);
// You can use express middleware mechanism to authenticate requests
// before they come to Filemanager

// serve static files

var port = 3000;
logger.info('launching server on port '+port);


app.use(upload());
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use(express.static('media'));
app.use(express.static('public'));
var bars = exphbs({
    defaultLayout: 'main'
});
app.engine('handlebars', bars);
app.set('view engine', 'handlebars');
//static pages

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});
app.post('/login',(req, res) => {
        var username = req.body.username,
            password = req.body.password;

        db.User.findOne({ where: { username: username ,password:password} }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });
var menu = require("./menu");
app.get('/admin', (req, res) => res.render('admin',{ layout: false }));
app.get('/keyboard', (req, res) => res.render('keyboard', { layout: false }));
app.get('/display', (req, res) => res.render("display", { layout: false }));
app.get('/dashboard', (req, res) => res.render('home', menu(req)));
app.get('/users', (req, res) => res.render('users', menu(req)));
app.get('/gates', (req, res) => res.render('gates', menu(req)));
app.get('/marque', (req, res) => res.render('marque', menu(req)));
app.get('/sounds', (req, res) => res.render('sounds', menu(req)));
app.get('/playlist', (req, res) => res.render('playlist', menu(req)));
app.get('/logo', (req, res) => res.render('logo', menu(req)));
app.get('/delete_order_timer', (req, res) => res.render('delete_order_timer', menu(req)));
app.get('/users-paging', (req, res) => res.render('users-paging', menu(req)));
app.get('/users-server', (req, res) => res.render('users-server', menu(req)));
app.get('/file', (req, res) => res.render('file', menu(req)));
app.get('/file-combo', (req, res) => res.render('file-combo', menu(req)));
app.get('/file-uploading', (req, res) => res.render('file-uploading', menu(req)));
//CRUD handlers
var up = require("./controllers/upload");
app.post('/upload', up.upload_files);
var up_logo = require("./controllers/upload_logo");
app.post('/upload_logo', up_logo.upload_logo);

var up_sound = require("./controllers/upload_sound");
app.post('/upload_sound', up_sound.upload_sound);
var users = require("./controllers/users");
app.get('/users/data', users.getData);
var session;

app.post('/users/data', users.addData);
app.put('/users/data/:userId', users.updateData);
app.delete('/users/data/:userId', users.removeData);
var gates = require("./controllers/gates");
app.get('/gates/data', gates.getData);
app.get('/gates/active_data', gates.getActive);
app.post('/gates/data', gates.addData);
app.put('/gates/data/:userId', gates.updateData);
app.delete('/gates/data/:userId', gates.removeData);
var marque = require("./controllers/marque");
app.get('/marque/data', marque.getData);
app.put('/marque/data/:userId', marque.updateData);

var sounds = require("./controllers/sounds");
app.get('/sounds/order', sounds.getOrder);
app.get('/sounds/player', sounds.getPlayer);
app.put('/sounds/data/:userId', sounds.updateData);

var delete_order_timer = require("./controllers/delete_order_timer");
app.get('/delete_order_timer/data', delete_order_timer.getData);
app.put('/delete_order_timer/data/:userId', delete_order_timer.updateData);

var playlist = require("./controllers/playlist");
app.get('/playlist/data', playlist.getData);
app.get('/playlist/datano', playlist.getDatano);
app.post('/playlist/data', playlist.addData);

app.put('/playlist/data/:userId', playlist.updateData);
app.put('/playlist/data', playlist.updateAll);
app.delete('/playlist/data/:userId', playlist.removeData);


var server = app.listen(3000, (err) => {

    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on 3000`)
})

var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function (data) {
        console.log(data);
        io.sockets.emit('chat', data);
    });
});