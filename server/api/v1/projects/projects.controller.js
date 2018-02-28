const async = require('async');
const projectService = require('./projects.service');
const groupService = require('../groups/groups.service');
const masterSheetService = require('../masterSheet/masterSheet.service');
const { getCommitStatus } = require('../gitlab_services/commitInfo');
const { checkForkedStatus } = require('../gitlab_services/forkInfo');
const { getIssueCount } = require('../gitlab_services/issueInfo');
const logger = require('../../../logger');


// Main driver function to create the required sheet to be inserted into the database
function masterSheetCreator(event, cb) {
  async.waterfall([
    projectService.checkProject.bind(null, event),
    groupService.getGroupInfo.bind(null, event),
    checkForkedStatus,
    getCommitStatus,
    getIssueCount,
    masterSheetService.insertMember,
  ], (err, result) => {
    if (err) {
      logger.error('waterfall error', err);
      return cb(err);
    }
    cb(null, result);
  });
}


module.exports = {
  masterSheetCreator,
};
