const { Schema, model } = require('mongoose');

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'true',
  },
});

const Url = model('Url', urlSchema);

module.exports = Url;