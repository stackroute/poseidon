const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/database');
const projectController = require('../server/api/v1/projects/projects.controller');
const Groups = require('../server/api/v1/groups/groups.entity');
const Projects = require('../server/api/v1/projects/projects.entity');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/sba');
const db = mongoose.connection;
db.on('error', (error) => {
  console.error(error);
});
db.once('open', () => {
  console.log('Connected to Mongo Database');
});


// WebHooks event
router.post('/addGroups', (req, res) => {
  const group = new Groups();
  group.groupName = req.body.group_name;
  group.groupMembers = req.body.group_members;
  group.save((err, insertedGroup) => {
    if (err) { console.log(err); } else { console.log(res.json(insertedGroup)); }
  });
});


router.post('/addProjects', (req, res) => {
  const project = new Projects();
  // console.log(req.body)
  project.projectName = req.body.project_name;
  project.save((err, insertedProject) => {
    if (err) { console.log('err', err); } else { console.log(res.json(insertedProject)); }
  });
});

router.post('/webhooks', (req, res) => {
  console.log('req.body', req.body);


  if (req.body.event_name === 'project_create') {
    projectController.masterSheetCreator(req.body, (err, result) => {
      if (err) {
        console.log('err', err);
        res.end();
      } else {
        console.log('result', result);
        res.end();
      }
    });
  } else {
    res.end();
  }
});

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
