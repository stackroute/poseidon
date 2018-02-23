const { getRepoCommits } = require('./lib');


function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos);
}


const getCommitStatus = function (member, cb) {
  console.log('inside getCommitStatus');
  const obj = member;
  if (member.forked_status === 'yes') {
    getRepoCommits(member.projectId, (err, result) => {
      if (err) { console.log('ERR getRepoCommit could not fetch details:', err); cb(err); }
      // Get the unique names of the people who have commited into the repo
      const uniqueCommits = removeDuplicates(result, 'username');
      let i = 0;
      console.log(uniqueCommits);

      uniqueCommits.forEach((commit) => {
        if (commit.author_name === member.userName) {
          i = 1;
          member.submission_status = 'yes';
          const b = commit.created_at.split(/[T+.]/);
          member.submission_Date = b[0];
          member.submission_Time = b[1];
          console.log(member);
          cb(null, member);
        }
      });
      if (i === 0) {
        member.submission_status = 'no';
        member.submission_Date = null;
        member.submission_Time = null;
        console.log('commit info', member);
        cb(null, member);
      }
    });
  } else {
    member.submission_status = 'no';
    member.submission_Date = null;
    member.submission_Time = null;
    console.log('commit info', member);

    cb(null, member);
  }
};

module.exports = {
  getCommitStatus,
};
