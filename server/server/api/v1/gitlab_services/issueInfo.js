const { getIssues } = require('./lib');

const getIssueCount = function (member, cb) {
  if (member.forked_status == 'yes') {
    getIssues(member.projectId, (err, result) => {
      if (err) { console.log('ERR getIssues could not get the issues info', err); cb(err); }
      let opened = 0;
      let closed = 0;
      result.map((iss) => {
        if ((member.userName == iss.author.name) && (iss.state == 'opened')) {
          opened += 1;
        } else if ((member.userName == iss.author.name) && (iss.state == 'closed')) { closed += 1; }
      });
      member.issues_opened = opened;
      member.issues_closed = closed;
      console.log('issue info', member);

      cb(null, member);
    });
  } else {
    member.issues_opened = null;
    member.issues_closed = null;
    console.log('issue info', member);

    cb(null, member);
  }
};

module.exports = {
  getIssueCount,
};
