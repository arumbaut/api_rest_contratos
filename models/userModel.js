var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    lastName : String,
    username: String,
    email: String,
    phoneHome: String,
    phoneWork : String,
    movil : String,
    ci : String,
    department : String,
    cargo : String,
    numeroTecnico : Number,
    fechaEntrada : String,
    avatar : String

    
});

module.exports = mongoose.model('User', UserSchema);
