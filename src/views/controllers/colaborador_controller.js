var requestJSON = require('request-json');
const URL_MYDB = 'https://api.mlab.com/api/1/databases/techu15db/collections/';
const clienteMlab = requestJSON.createClient(URL_MYDB);
require('dotenv').config();
const mapiKey = 'apiKey=' + process.env.mapiKey;
var queryStrField = 'f={"_id":0}&';

// GET users a trav�s de mlab, obtiene los datos del cliente
function getColaboradores(req, res) {
    var registro = req.params.registro;
//    var registro = req;
    var queryString = 'q={"registro":"' + registro + '"}&';
    console.log(queryString);
    clienteMlab.get('colaborador?' + queryString + queryStrField + mapiKey,
        function (err, respuestaMLab, body) {
            var response = {};
            if (err) {
                response = {
                    "msg": "Error obteniendo usuario."
                }
                res.status(500);
            } else {
                if (body.length > 0) {
                    response = body;
                } else {
                    response = {
                        "msg": "Colaborador no encontrado."
                    };
                    res.status(404);
                }
            }
//            res.send(response);
              res.json(response)  
        });
};
module.exports.getColaboradores = getColaboradores;
