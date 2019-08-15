const express = require('express');
const router = express.Router();
const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin',function(req,res){
    res.render('users/signin')
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/colaboradores/consulta',
    failureRedirect: '/users/signin',
    failureFlash: true
  }));

router.get('/users/signup', function(req,res){
    res.render('users/signup.hbs');
});
router.post('/users/signup', async function(req,res){
    const { name, email,password, confirm_password} = req.body;
    const errors = [];
    if(name.length <= 0){
        errors.push({text: 'Por favor ingresa tu nombre'});
    }
    if(email.length <= 0){
        errors.push({text: 'Por favor ingresa tu email'});
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
        res.render('users/signup.hbs',{errors,name,email,password,confirm_password});
    }else{
      const emailUser = await User.findOne({ email: email});
      if(emailUser){
        res.redirect('/users/signup');
      }else{  
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
//     newUser.password = await newUser.save(password);
      await newUser.save();
      res.redirect('/users/signin');
      }
//        res.send('ok');
    }
});

router.get('/users/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
module.exports = router;