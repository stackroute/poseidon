const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const projectSchema = new Schema({
  projectName: String
});

module.exports = mongoose.model('project', projectSchema, 'projectList');
