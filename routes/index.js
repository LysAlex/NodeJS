var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

/* GET home page. */
// Route de base, avec le nom de l’utilisateur si existant
router.get('/', function (req, res) {
 res.render('index', { user : req.user });
});
// Route pour la vue destinée à l’enregistrement d’un utilisateur
router.get('/register', function(req, res) {
 res.render('register', { });
});
// Route pour la création d’un utilisateur après enregistrement, notez le POST
router.post('/register', function(req, res) {
 Account.register(new Account({ username : req.body.username }), req.body.password,   
  function(err, account) {
   if (err) {
    return res.render('register', { account : account });
   }
   passport.authenticate('local')(req, res, function () {
    res.redirect('/');
   });
 });
});
// Route pour la vue destinée à la la connexion d’un utilisateur
router.get('/login', function(req, res) {
 res.render('login', { user : req.user });
});
// Route pour rediriger l’utilisateur sur le site après authentification (POST)  
router.post('/login', passport.authenticate('local'), function(req, res) {
 res.redirect('/');
});
// Route pour une demande de déconnexion
router.get('/logout', function(req, res) {
 req.logout();
 res.redirect('/');
});

module.exports = router;