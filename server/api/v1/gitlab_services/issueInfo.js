const { getIssues } = require('./lib');
const logger = require('../../../logger');


//Function to attach count of Open and close Issues
const getIssueCount = function (member, cb) {
  const obj = member;
  if (obj.forked_status === 'yes') {
    getIssues(obj.projectId, (err, result) => {
      if (err) { logger.error('ERR getIssues could not get the issues info', err); cb(err); }
      let opened = 0;
      let closed = 0;
      result.map((iss) => {
        if ((obj.userName === iss.author.name) && (iss.state === 'opened')) {
          opened += 1;
        } else if ((obj.userName === iss.author.name) && (iss.state === 'closed')) { closed += 1; }
      });
      obj.issues_opened = opened;
      obj.issues_closed = closed;
      cb(null, obj);
    });
  } else {
    obj.issues_opened = null;
    obj.issues_closed = null;
    cb(null, obj);
  }
};

module.exports = {
  getIssueCount,
};
