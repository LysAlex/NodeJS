var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offreSchema = Schema({
  nom_evenement: String,
  type_evenement: String,
  nombre_jours : Number,
  date_debut : String,
  nombre_figurant : Number,
  nom_role: String,
  candidatures: [{ type: Schema.Types.ObjectId, ref: 'Candidature' }]
});


var Offre = mongoose.model('Offre',offreSchema);
module.exports = Offre;