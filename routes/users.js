var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET offers listing. */
/* Liste des candidateurs */
router.get('/', function(req, res, next) {
	User.find({},{},function(e,docs){
	res.render('users', {
		"userslist" : docs
		});
	});
});

router.get('/insert', function(req, res, next) {
  res.render('insertUser', { title: 'Inscrits' });
});

/* Ajout d'un utilisateur */
router.post('/adduser', function(req, res, next) {
  
  var db = req.db;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var newUser = User({
    "firstName" : firstName,
    "lastName" : lastName,
    "email": email
  });

    newUser.save(function(err) {
        if (err) throw err;

        res.redirect("/users")
    });
});

router.get('/removeuser/:id',function(req,res,next){
    var id =req.params.id;
    User.findOneAndRemove({_id:id},function(err){
        if(err){
            res.send(err);
        }else{
            User.find({_id:id}).remove().exec();
            res.redirect("/users");
        }
    });
})
  

router.get('/update/:id', function(req, res, next){
  User.findById(req.params.id, function (err, docs) {
    if (err){
      res.send("erreur");
    } else {
      res.render('updateUser', { userslist : docs});
    }
  });
});
  

router.post('/update/:id/check', function(req, res, next){
  User.findOneAndUpdate(req.params.id,{
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email
  }, function(err,docs){
    if (err){
      console.log('error');
    } else{
      console.log(docs);
      res.redirect('/users');
      
}
  });
  });



module.exports = router;
