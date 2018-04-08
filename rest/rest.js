var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var dateFormat = require('dateformat');
var jwt = require('jsonwebtoken');
var now = new Date();
var User = require('../models/users');
var Offer = require('../models/mission');
var Application = require('../models/candidature');

var SECRET_KEY = 'SECRET_KEY';

//Retourne les offres encore d'actualité
router.get('/date', function(req, res, next) {
 var laDate = req.params.date_debut;
 var nb = 0;
 fs.readFile(path.join(__dirname,'offres.json'),'utf8', function(err, offre) {
  if (err) {
   throw err;
  }
  var resultat = JSON.parse(offre);
  //Notre fichier contient en fait un objet... contenant d’autres objets
  var liste = resultat.offre;
  for (var i in liste) {
   if (liste[i].date_debut >= dateFormat(now, "dd/mm/yyyy")) {
    nb = nb+1;
   }
  }
  if (nb == 0) {
   res.send('Aucune offre');
  } else {
     res.send(liste[i].nom_evenement + " " + liste[i].type_evenement + " " + liste[i].nombre_jours + " " + liste[i].date_debut + " " + liste[i].nombre_figurant + " " + liste[i].nom_role + " " + liste[i].firstName + " " + liste[i].lastName);
    }
 });
});

router.get('/:lastName', function(req, res, next) {
 var leNom = req.params.lastName;
 var nb = 0;
 fs.readFile(path.join(__dirname,'offres.json'),'utf8', function(err, offre) {
  if (err) {
   throw err;
  }
 var resultat = JSON.parse(offre);
 var liste = resultat.offre;
  for (var i in liste) {
   if (liste[i].lastName == leNom) {
    nb = nb + 1
   }
  }
 if (nb == 0) {
   res.send('Aucune offre');
  } else {
     res.send(liste[i].nom_evenement + " " + liste[i].type_evenement + " " + liste[i].nombre_jours + " " + liste[i].date_debut + " " + liste[i].nombre_figurant + " " + liste[i].nom_role + " " + liste[i].firstName + " " + liste[i].lastName);
    }
 });
});

/* Get API KEY */
router.get('/Verification', function(req, res) {
  User.findOne({
    'email' : req.query.email
  }, function(err, user) {
    if(err) throw err;
    // send api key
    var token = jwt.sign(user, SECRET_KEY, {
      expiresIn: 5000
    });
    res.json({
      key: token
    });
  });
});

// Middleware
router.use(function(req, res, next) {
  if(req.query.key) {
    jwt.verify(req.key, SECRET_KEY, function(error, decode) {
      if(error) {
        res
          .status(500)
          .json({
            error: 'Invalid key'
          });
      } else {
        next();
      }
    });
  }
  res.json({
    error: 'No key provided'
  });
});

router.get('/offres', function(req, res) {
  Offer.find({},{},function(e, docs){
    res.json({
      offers : docs
    });
  });
});

router.post('/offres', function(req, res) {
  if(req.query.codeOffre) {
    Application.update({ offre: id }, { $set: { etat: 'En cours' }});
  }
});

router.get('/Candidatures', function(req, res) {
  Application
  .find({}, function(err, docs) {
    if(err) throw err;
    res.json({
          "applications" : docs 
      });
  });
});

module.exports = router;