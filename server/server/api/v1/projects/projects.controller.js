const async = require('async');
const projectService = require('./projects.service');
const groupService = require('../groups/groups.service');
const masterSheetService = require('../masterSheet/masterSheet.service');
const { getCommitStatus } = require('../gitlab_services/commitInfo');
const { checkForkedStatus } = require('../gitlab_services/forkInfo');
const { getIssueCount } = require('../gitlab_services/issueInfo');


function masterSheetCreator(event, cb) {
  console.log('inside masterSheet');
  console.log('event', event);
  async.waterfall([
    projectService.checkProject.bind(null, event),
    groupService.getGroupInfo.bind(null, event),
    // groupService.checkMember.bind(null, event),
    checkForkedStatus,
    getCommitStatus,
    getIssueCount,
    masterSheetService.insertMember,
  ], (err, result) => {
    if (err) {
      console.log('waterfall error', err);
      return cb(err);
    }
    cb(null, result);
  });
}


module.exports = {
  masterSheetCreator,
};
