const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
//Initializations
const app = express();
require('./database');
require('./config/passport');
//settings
app.set('port', process.env.PORT || 3000 );
app.set('views', path.join(__dirname,'views'));
console.log(app.get('views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    controllersDir: path.join(app.get('views'),'controllers'),    
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//global variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');    
    next();
});
//routes
app.use(require('./routes/index'));
app.use(require('./routes/colas'));
app.use(require('./routes/users'));
//static files
app.use(express.static(path.join(__dirname,'public')))
console.log(__dirname);
//server is listennig
app.listen(app.get('port'), function () {
    console.log('ProySkill escuchando en puerto', app.get('port'));
});

var bodyParser = require('body-parser');
var requestJSON = require('request-json');

app.use(bodyParser.json());
var totalUsers = 0;
const URL_BASE = '/';
const URL_MYDB = 'https://api.mlab.com/api/1/databases/techu15db/collections/';
//const mapiKey='apiKey=NQCR6_EMDAdqyM6VEWg3scF_k32uwvHF';


//var queryStrField = 'f={"_id":0}&';
