const { getProject } = require('./lib');

const checkForkedStatus = function (member, cb) {
  console.log('inside checkForkedStatus');
  getProject(member.projectId, (err, result) => {
    if (err) {
      console.log('hey problem in get project');

      console.log('couldnt get the project in checkForkedStatus', err);
      cb(err);
    } else if (result.hasOwnProperty('forked_from_project')) {
      member.forked_status = 'yes';
      console.log('inside fork', member);
      console.log('hey in else if get project');

      cb(null, member);
    } else {
      member.forked_status = 'no';
      console.log('inside fork', member);

      cb(null, member);
    }
  });
};

module.exports = {
  checkForkedStatus,
};
