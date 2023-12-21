const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, " Email must match an email address format (example@email.com)"],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    match: [
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
      " Password requires at least 8 characters, must include uppercase, lowercase, number, and special character",
    ],
  },
  // Add field for permanent dismissal of delete url dialog
  dismissDeleteUrlDialog: {
    type: Boolean,
    default: false,
  },
});

// Hash the password with bcrypt before saving to user model
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Compare entered password with hashed password in database
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;