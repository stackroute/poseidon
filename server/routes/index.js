const express = require('express');
const logger = require('../logger');

const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/database');
const projectController = require('../api/v1/projects/projects.controller');
const Groups = require('../api/v1/groups/groups.entity');
const Projects = require('../api/v1/projects/projects.entity');
const MasterSheet = require('../api/v1/masterSheet/masterSheet.entity');
const ProjectStatus = require('../api/v1/projectStatus/projectStatus.controller');


mongoose.Promise = global.Promise;

mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', (error) => {
  logger.error(error);
});
db.once('open', () => {
  logger.info('Connected to Mongo Database and server started in port NO. 4000');
});


// WebHooks event
router.post('/addGroups', (req, res) => {
  try {
    const group = new Groups();
    group.groupName = req.body.group_name;
    group.groupMembers = req.body.group_members;
    group.save((err, insertedGroup) => {
      if (err) { logger.error(err); } else { logger.info(res.json(insertedGroup)); }
    });
  } catch (err) {
    logger.error('Error Adding member', err);
  }
});

router.get('/getMasterList', (req,res)=>{
  try {
    MasterSheet.find({})
    .exec((err,list)=>{
      if(err){
        logger.error("Could not fetch mastersheet from database", err);
      } else {
        res.send(list);
      }
    })
  } catch (err){
    logger.error("Could not fetch mastersheet from database", err);
  }
})

router.get('/getProjectReport/:projId', (req,res)=>{
  try {
    logger.info(req.params.projId);
    ProjectStatus.projectStatusReport(req.params.projId, (err, result) => {
      if(err){
        res.send(err)
      } else {
        res.json(result);
      }
    })
  } catch (err){
    logger.error("not getting proper request from the get project Status", err)
  }
})

router.post('/addProjects', (req, res) => {
  const project = new Projects();
  logger.info(req.body);
  project.projectName = req.body.project_name;
  project.save((err, insertedProject) => {
    if (err) { logger.error('err', err); } else { res.json(insertedProject); }
  });
});

router.post('/webhooks', (req, res) => {
  try {
    logger.info('req.body', req.body);
    if (req.body.event_name === 'project_create') {
      projectController.masterSheetCreator(req.body, (err, result) => {
        if (err) {
          logger.error('err', err);
          res.end();
        } else {
          logger.info('result', result);
          res.end();
        }
      });
    } else {
      res.end();
    }
  } catch (err) {
    logger.error('Event error', err);
  }
});

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
