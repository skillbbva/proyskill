const express = require('express');
const router = express.Router();
const app = express();
const colaborador_controller = require('../views/controllers/colaborador_controller');

const { isAuthenticated } = require('../helpers/auth');

router.post('/controllers/consulta.hbs', isAuthenticated ,function(req,res){
    //console.log(req.body);
    const { codigo, descripcion }= req.body;
    const errors = [];
    if(!codigo){
        errors.push({text: 'Favor ingresar un código'});
    }
    if(!descripcion){
        errors.push({text: 'Ingrese una descripcion'});
    }
    if(errors.length > 0){
        res.render('controllers/consulta.hbs',{
            errors,
            codigo,
            descripcion 
        });
    }else{
//        app.get(URL_BASE + '/colaboradores/P695792', colaborador_controller.getColaboradores);
        res.redirect('/colaboradores/'+ codigo);
    }
});
//router.get('/colaboradores/:registro', function(req,res){
   
//    colaborador_controller.getColaboradores(req,res);
//    console.log(respuesta);
//    res.render('controllers/listar.hbs', { respuesta } );
//});
router.get('/colaboradores/consulta',isAuthenticated , function(req,res){
    res.render('controllers/consulta.hbs');
});

router.get('/colaboradores/:registro',isAuthenticated , function(req,res){
    res.render('controllers/listar.hbs');
});
//    res.render('controllers/listar.hbs', {req} )
//});
//console.log(colabora);




module.exports = router;