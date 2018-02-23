const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const masterSchema = new Schema({
  groupName: String,
  projectName: String,
  projectId: Number,
  userName: String,
  forked_status: String,
  submission_status: String,
  submission_Date: String,
  submission_Time: String,
  issues_opened: Number,
  issues_closed: Number,
});

module.exports = mongoose.model('mastersheet', masterSchema, 'masterSheet');
