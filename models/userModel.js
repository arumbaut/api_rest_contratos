var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
// Roles
const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol válido'
  }

var UserSchema = new Schema({
    nombre:   { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'Email es necesario'] },
    pass: { type: String, required: [true, 'Pass es necesario'] },
    date: { type: Date, default: Date.now },
    role: { type: String, default: 'USER', enum: roles },
    activo: { type: Boolean, default: true }
    
});

module.exports = mongoose.model('User', UserSchema);
