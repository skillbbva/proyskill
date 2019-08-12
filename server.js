var express = require('express');
//var userFile = require('./users.json');
var bodyParser = require('body-parser');
var requestJSON = require('request-json');
var app = express();
app.use(bodyParser.json());
var totalUsers = 0;
const URL_BASE = '/skillbbva/v1/';
const URL_MYDB = 'https://api.mlab.com/api/1/databases/techu15db/collections/';
//const mapiKey='apiKey=NQCR6_EMDAdqyM6VEWg3scF_k32uwvHF';

const PORT = process.env.PORT || 3000;
var queryStrField = 'f={"_id":0}&';
const colaborador_controller = require('./controllers/colaborador_controller.js');
app.get(URL_BASE + 'colaboradores/:registro', colaborador_controller.getUsers);

app.listen(PORT, function () {
    console.log('ProySkill escuchando en puerto 3000...');
});
