const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['user', 'agent', 'admin'], // Enum options
    default: 'user', // Default role
  },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
