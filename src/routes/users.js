const express = require('express');
const router = express.Router();
const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin',function(req,res){
    res.render('users/signin')
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/colabos/skills',
    failureRedirect: '/users/signin',
    failureFlash: true
  }));

router.get('/users/signup', function(req,res){
    res.render('users/signup.hbs');
});
router.post('/users/signup', async function(req,res){
    const { name, registro,email,password, confirm_password} = req.body;
    const errors = [];
    if(name.length <= 0){
        errors.push({text: 'Por favor ingresa tu nombre'});
    }
    if(email.length <= 0){
        errors.push({text: 'Por favor ingresa tu email'});
    }
    if(registro.length <= 0){
        errors.push({text: 'Por favor ingresa tu registro'});
    }
    if(password.length <= 0){
        errors.push({text: 'Por favor ingresa tu password'});
    }
    if(confirm_password.length <= 0){
        errors.push({text: 'Por favor ingresa tu password de confirmación'});
    }
    if(password != confirm_password){
        errors.push({text: 'Los password no coinciden'});
    }
    if(password.length < 4){
        errors.push({text: 'El password debe ser menor a 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup.hbs',{errors,name,registro,email, password,confirm_password});
    }else{
      const emailUser = await User.findOne({ email: email});
      if(emailUser){
        errors.push({text: 'El mail ya se encuentra registrado'});  
        res.render('users/signup.hbs',{errors,name,registro,email, password,confirm_password});
      }else{  
      const newUser = new User({name,registro, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      res.redirect('/users/signin');
      }
    }
});

router.get('/users/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
module.exports = router;