var requestJSON = require('request-json');
const URL_MYDB = 'https://api.mlab.com/api/1/databases/techu15db/collections/';
const clienteMlab = requestJSON.createClient(URL_MYDB);
require('dotenv').config();
const mapiKey='apiKey=NQCR6_EMDAdqyM6VEWg3scF_k32uwvHF';
//const mapiKey='NQCR6_EMDAdqyM6VEWg3scF_k32uwvHF';

//const mapiKey = 'apiKey=' + process.env.mapiKey;
var queryStrField = 'f={"_id":0}&';

// GET users a trav�s de mlab, obtiene los datos del cliente
function getColas(req, res) {
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
            res.json(response);
//              res.json(response)  
        });
};
module.exports.getColas = getColas;
// PUT conocimiento a trav�s de mlab, obtiene los datos del cliente
function uptConos(req, res) {
//    var id = req.body.id;
    var conos = req.body.conos;
    var certificado = req.body.certificado;
    var registro = req.body.registro;
    
    console.log("par,body"+req.params,req.body);
    var id = req.body.id;
    var queryStringID = 'q={"registro":"' + registro + '","id":' + id + '}&';
    req.body.id = Number(id);
//    req.body.certificado = req.body.certificado;
    console.log("putConos"+queryStringID);
    clienteMlab.get('conocimiento?'+ queryStringID + mapiKey,
      function(error, respuestaMLab, body) {
       var cambio = '{"$set":' + JSON.stringify(req.body) + '}';
       console.log(cambio);
       clienteMlab.put(URL_MYDB +'conocimiento?' + queryStringID + mapiKey, JSON.parse(cambio),
        function(error, respuestaMLab, body) {
         console.log("err:"+ error + respuestaMLab);   
         res.send(body);
        });
      });
};
module.exports.uptConos = uptConos;

function deleteConos(req, res){
    var conos = req.body.conos;
    var certificado = req.body.certificado;
    var registro = req.body.registro;
    
    console.log("par,body"+req.params,req.body);
    var id = Number(req.body.id);
    var queryStringID = 'q={"registro":"' + registro + '","id":' + id + '}&';
//    req.body.id = Number(id);
//    req.body.certificado = Boolean(req.body.certificado);
    console.log("deleteConos"+queryStringID);
    clienteMlab.get('conocimiento?' +  queryStringID + mapiKey,
      function(error, respuestaMLab, body){
        var respuesta = body[0];
//          console.log(respuesta._id);
          clienteMlab.delete(URL_MYDB + 'conocimiento/' + respuesta._id.$oid +'?'+ mapiKey,
          function(error, respuestaMLab,body){
            var response = {};
            res.json(response);
//            res.send(body);
        });
      });
  };
 module.exports.deleteConos = deleteConos;
 
 function insConos(req, res){
    var registro = req.params.registro;
//    var registro = req;
    var queryString = 'q={"registro":"' + registro + '"}&';
    console.log(queryString);
    clienteMlab.get('conocimiento?' + queryString + queryStrField + mapiKey,
//    clienteMlab.get('conocimiento?' + mapiKey,
      function(error, respuestaMLab, body){
        newID = body.length + 1;
<<<<<<< HEAD
=======
        console.log("new" +  newID);
>>>>>>> 05eb7b4424984bd72a4242c2b72a989356660ce7
        var newConos = {
          "id" : newID,
          "conos" : req.body.conos,
          "certificado" : req.body.certificado,
          "registro" : req.body.registro
        };
        clienteMlab.post(URL_MYDB + "conocimiento?" + mapiKey, newConos,
          function(error, respuestaMLab, body){
            console.log(body);
            res.status(201);
            res.send(body);
          });
      });
  };
 module.exports.insConos = insConos;
 


// GET users a trav�s de mlab, obtiene los datos del cliente
function getConos(req, res) {
    var registro = req.params.registro;
//    var registro = req;
    var queryString = 'q={"registro":"' + registro + '"}&';
    console.log(queryString);
    clienteMlab.get('conocimiento?' + queryString + queryStrField + mapiKey,
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
            res.json(response);
//              res.json(response)  
        });
};
module.exports.getConos = getConos;

function getAplis(req, res) {
    var registro = req.params.registro;
//    var registro = req;
    var queryString = 'q={"registro":"' + registro + '"}&';
    console.log(queryString);
    clienteMlab.get('aplicativo?' + queryString + queryStrField + mapiKey,
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
            res.json(response);
//              res.json(response)  
        });
};
module.exports.getAplis = getAplis;

function uptAplis(req, res) {
    //    var id = req.body.id;
        var codigo = req.body.codigo;
        var descripcion = req.body.descripcion;
        var tipo = req.body.tipo;
        var nivel = req.body.nivel;
        var registro = req.body.registro;
        var id = req.body.id;
        var queryStringID = 'q={"registro":"' + registro + '","id":' + id + '}&';
        req.body.id = Number(id);
    //    req.body.certificado = req.body.certificado;
        console.log("putAplis"+queryStringID);
        clienteMlab.get('aplicativo?'+ queryStringID + mapiKey,
          function(error, respuestaMLab, body) {
           var cambio = '{"$set":' + JSON.stringify(req.body) + '}';
           console.log(cambio);
           clienteMlab.put(URL_MYDB +'aplicativo?' + queryStringID + mapiKey, JSON.parse(cambio),
            function(error, respuestaMLab, body) {
             console.log("err:"+ error + respuestaMLab);   
             res.send(body);
            });
          });
    };
    module.exports.uptAplis = uptAplis;
    
    function deleteAplis(req, res){
        var codapli = req.body.codapli;
        var desapli = req.body.desapli;
        var tipo = req.body.tipo;
        var nivel = req.body.nivel;
        var registro = req.body.registro;
        var id = req.body.id;
        var queryStringID = 'q={"registro":"' + registro + '","id":' + id + '}&';
    //    req.body.id = Number(id);
    //    req.body.certificado = Boolean(req.body.certificado);
        console.log("deleteAplis"+queryStringID);
        clienteMlab.get('aplicativo?' +  queryStringID + mapiKey,
          function(error, respuestaMLab, body){
            var respuesta = body[0];
    //          console.log(respuesta._id);
              clienteMlab.delete(URL_MYDB + 'aplicativo/' + respuesta._id.$oid +'?'+ mapiKey,
              function(error, respuestaMLab,body){
                var response = {};
                res.json(response);
    //            res.send(body);
            });
          });
      };
     module.exports.deleteAplis = deleteAplis;
     
     function insAplis(req, res){
        var registro = req.params.registro;
    //    var registro = req;
        var queryString = 'q={"registro":"' + registro + '"}&';
        console.log(queryString);
        clienteMlab.get('aplicativo?' + queryString + queryStrField + mapiKey,
    //    clienteMlab.get('conocimiento?' + mapiKey,
          function(error, respuestaMLab, body){
            newID = body.length + 1;
<<<<<<< HEAD
=======
            console.log("newID:"+ newID);
>>>>>>> 05eb7b4424984bd72a4242c2b72a989356660ce7
            var newAplis = {
              "id" : newID,
              "codigo" : req.body.codigo,
              "descripcion" : req.body.descripcion,
              "tipo" : req.body.tipo,
              "nivel" : req.body.nivel,
              "registro" : req.body.registro
            };
            clienteMlab.post(URL_MYDB + "aplicativo?" + mapiKey, newAplis,
              function(error, respuestaMLab, body){
                console.log(body);
                res.status(201);
                res.send(body);
              });
          });
      };
     module.exports.insAplis = insAplis;
    
