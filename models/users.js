var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  firstName: String,
  lastName: String,
  email: String,
  candidatures: [{ type: Schema.Types.ObjectId, ref: 'Candidature' }]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;