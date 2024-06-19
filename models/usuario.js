const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Middleware para encriptar la contraseña antes de guardarla
usuarioSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
