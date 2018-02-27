const { getRepoCommits } = require('./lib');
const logger = require('../../../logger');


function uniqueArr(myArr) {
  return myArr.map(obj => obj.username)
    .filter((value, index, self) => self.indexOf(value) === index);
}

function removeDuplicates(myArr, prop) {
  const uniqueName = uniqueArr(myArr);
  return myArr.filter((obj, index) => uniqueName.indexOf(obj[prop]) === index);
}


const getCommitStatus = function (member, cb) {
  const obj = member;
  if (obj.forked_status === 'yes') {
    getRepoCommits(obj.projectId, (err, result) => {
      if (err) { logger.error('ERR getRepoCommit could not fetch details:', err); cb(err); }
      // Get the unique names of the people who have commited into the repo
      const uniqueCommits = removeDuplicates(result, 'username');
      let i = 0;

      uniqueCommits.forEach((commit) => {
        if (commit.author_name === obj.userName) {
          i = 1;
          obj.submission_status = 'yes';
          const [b] = commit.created_at.split(/[T+.]/);
          [obj.submission_Date, obj.submission_Time] = [b];
          cb(null, obj);
        }
      });
      if (i === 0) {
        obj.submission_status = 'no';
        obj.submission_Date = null;
        obj.submission_Time = null;
        cb(null, obj);
      }
    });
  } else {
    obj.submission_status = 'no';
    obj.submission_Date = null;
    obj.submission_Time = null;
    cb(null, obj);
  }
};

module.exports = {
  getCommitStatus,
};
