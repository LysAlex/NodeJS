var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Application = require('../models/candidature');
var Offer = require('../models/mission');

var passwd = 'secret';
var now = new Date();

// get token route
router.get('/token', function(req, res) {
    let user = {
      username: 'test'
    };
    let token = jwt.sign(user, passwd, {
        expiresIn: 4000
    });
    res.json({
        success: true,
        token: token
    });
});

// middleware to block router if there is no token
router.use(function(req, res, next) {
    var token = req.body.token || req.headers['token'];

    if(token) {
        jwt.verify(token, passwd, function(err, decode) {
            if(err) {
                res.status(500).json({
                error:"Invalid Token"
                });
            } else {
                next();
            }
        });
    } else {
        res.status(500).json({
            error:"No token provided"
        });
    }
});

// get current application
router.get('/application/current', function(req, res) {
    Application
        .find({etat: 'En cours'}, function(err, docs) {
            res.render('applications', {
                "applicationslist" : docs 
            });
        });
});

// get past application
router.get('/application/before', function(req, res) {
    Application
    .find({etat: 'Avant'}, function(err, docs) {
        res.render('applications', {
            "applicationslist" : docs 
        });
    });
});

// get current offer
router.get('/offer/current', function(req, res) {
    Offer
    .where('date_debut').gte(now)
    .exec(function(err, docs) {
        res.render('offers', {
            "offerslist" : docs 
        });
    });
});

//get past offer
router.get('/offer/past', function(req, res) {
    Offer
    .where('date_debut').lt(now)
    .exec(function(err, docs) {
        res.render('offers', {
            "offerslist" : docs 
        });
    });
});

//get past offer I have applied
router.get('/offer/past/applied', function(req, res) {
    Offer
    .where('date_debut').lt(now)
    .where('candidatures').in([req.applicationID])
    .exec(function(err, docs) {
        res.render('offers', {
            "offerslist" : docs 
        });
    });
});

module.exports = router;