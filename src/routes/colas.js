const express = require('express');
const router = express.Router();
const app = express();
const colas_control = require('../views/controllers/colas_control');

const { isAuthenticated } = require('../helpers/auth');

router.post('/colabos/consulta', isAuthenticated ,function(req,res){
    const { codigo, descripcion }= req.body;
    const errors = [];
    if(!codigo){
        errors.push({text: 'Favor ingresar un código'});
    }
    if(errors.length > 0){
        res.render('/layouts/consulta.hbs',{
            errors,
            codigo,
            descripcion 
        });
    }else{
        res.redirect('/layouts/listar.hbs'+ codigo);
    }
});
router.get('/colaboradores/:registro', function(req,res){
   
    colas_control.getColas(req,res);
});
router.get('/colabos/skills',isAuthenticated , function(req,res){
    res.render('../views/layouts/skills.hbs');
});
router.get('/layouts/modiConos', function(req,res){
    res.render('../public/conos.html');
});
router.get('/layouts/modiAplis', function(req,res){
    res.render('../public/aplis.html');
});
router.get('/layouts/modiPrinc', function(req,res){
    res.render('../public/princ.html');
});


module.exports = router;