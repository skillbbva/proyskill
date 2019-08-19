const express = require('express');
const router = express.Router();
const app = express();
const colas_control = require('../views/controllers/colas_control');

const { isAuthenticated } = require('../helpers/auth');

router.post('/colabos/consulta', isAuthenticated ,function(req,res){
    //console.log(req.body);
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
//        app.get(URL_BASE + '/colaboradores/P695792', colaborador_controller.getColaboradores);
        res.redirect('/layouts/listar.hbs'+ codigo);
    }
});
router.get('/colaboradores/:registro', function(req,res){
   
    colas_control.getColas(req,res);
//    console.log(res);
//   res.render('controllers/listar.hbs', { respuesta } );
});
router.get('/colabos/skills',isAuthenticated , function(req,res){
    res.render('../views/layouts/skills.hbs');
});

//router.get('/colaboradores/:registro',isAuthenticated , function(req,res){
//    res.render('controllers/listar.hbs');
//});
//    res.render('controllers/listar.hbs', {req} )
//});
//console.log(colabora);




module.exports = router;