const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const groupSchema = new Schema({
  groupName: String,
  groupMembers: [String],
});

module.exports = mongoose.model('group', groupSchema, 'groupList');
