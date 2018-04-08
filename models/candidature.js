var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidatureSchema = Schema({
    figurant: { type: Schema.Types.ObjectId, ref: 'Figurant' },
    etat: String,
    offre: { type: Schema.Types.ObjectId, ref: 'Offre' }
  });

var Candidature = mongoose.model('Candidature', candidatureSchema);
module.exports = Candidature;