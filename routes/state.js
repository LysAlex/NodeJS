var express = require('express');
var router = express.Router();
var Offer = require('../models/mission');

/* GET offers listing. */
/* Liste des offres */
router.get('/', function(req, res, next) {
	Offer.find({},{},function(e,docs){
	res.render('state', {
		"offerslist" : docs
		});
	});
});

router.get('/insert', function(req, res, next) {
  res.render('insert', { title: 'Offres' });
});

/* Ajout d'une offre */
router.post('/addoffer', function(req, res, next) {
  
  var db = req.db;
  var eventName = req.body.nom_evenement;
  var eventType = req.body.type_evenement;
  var numberDays = req.body.nombre_jours;
  var dateBegin = req.body.date_debut;
  var numberFigurant = req.body.nombre_figurant;
  var roleName = req.body.nom_role;
  var newOffer = Offer({
    "nom_evenement" : eventName,
    "type_evenement" : eventType,
    "nombre_jours": numberDays,
    "date_debut": dateBegin,
    "nombre_figurant": numberFigurant,
    "nom_role": roleName
  });

    newOffer.save(function(err) {
        if (err) throw err;

        res.redirect("/offers")
    });
});

router.get('/removeoffer/:id',function(req,res,next){
    var id =req.params.id;
    Offer.findOneAndRemove({_id:id},function(err){
        if(err){
            res.send(err);
        }else{
            Offer.find({_id:id}).remove().exec();
            res.redirect("/offers");
        }
    });
})
  

router.get('/update/:id', function(req, res, next){
  Offer.findById(req.params.id, function (err, docs) {
    if (err){
      res.send("erreur");
    } else {
      res.render('update', { offerslist : docs});
    }
  });
});
  

router.post('/update/:id/check', function(req, res, next){
  Offer.findOneAndUpdate(req.params.id,{
    eventName:req.body.nom_evenement,
    eventType:req.body.type_evenement,
    numberDays:req.body.nombre_jours,
    dateBegin:req.body.date_debut,
    numberFigurant:req.body.nombre_figurant,
    roleName:req.body.nom_role
  }, function(err,docs){
    if (err){
      console.log('error');
    } else{
      console.log(docs);
      res.redirect('/offers');
      
}
  });
  });



module.exports = router;
