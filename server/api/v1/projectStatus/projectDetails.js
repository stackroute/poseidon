const {getProject, getIssues, getRepoCommits} = require('../gitlab_services/lib')
const logger = require('../../../logger');

//Function to get project details using projectId
function getProjectDetails(projectId, cb){
    const obj = {};
    getProject(projectId, (err, result)=>{
        logger.info("msg",result);
        if(err){
          cb(err);
        }else if(Object.prototype.hasOwnProperty.call(result, 'forked_from_project')){
            obj['projectId'] = result.id;
            obj['userName'] = result.owner.username;
            obj['forkedStatus'] = 'yes';
            obj['gitUrl'] = result['http_url_to_repo'];
            // logger.info('obj', obj);
            cb(null, obj);
        } else {
            obj['projectId'] = result.id;
            obj['userName'] = result.owner.username;
            obj['forkedStatus'] = 'no';
            obj['gitUrl'] = null;
            cb(null, obj);
            logger.info('obj', obj);
        }
    })
}

function uniqueArr(myArr) {
    return myArr.map(obj => obj.username)
      .filter((value, index, self) => self.indexOf(value) === index);
  }
  
function removeDuplicates(myArr, prop) {
const uniqueName = uniqueArr(myArr);
return myArr.filter((obj, index) => uniqueName.indexOf(obj[prop]) === index);
}
  
//Function to get commit info for a particular user
function getParticularCommitInfo(report, cb){
    const temp = report;
    if (temp.forkedStatus === 'yes') {
        getRepoCommits(temp.projectId, (err, result) => {
          if (err) { logger.error('ERR getRepoCommit could not fetch details:', err); cb(err); }
          // Get the unique names of the people who have commited into the repo
          if(result.length > 0){
            const uniqueCommits = removeDuplicates(result, 'username');
            let i = 0;
            
            uniqueCommits.forEach((commit) => {
              if (commit.author_name === temp.userName) {
                i = 1;
                logger.debug(commit);
                temp.submission_status = 'yes';
                const b = commit.created_at.split(/[T+.]/);
                logger.debug(b);
                [temp.submission_Date, temp.submission_Time] = b;
                cb(null, temp);
              }
            });
            if (i === 0) {
              temp.submission_status = 'no';
              temp.submission_Date = null;
              temp.submission_Time = null;
              cb(null, temp);
            } 
          }
          
        });
      } else {
        temp.submission_status = 'no';
        temp.submission_Date = null;
        temp.submission_Time = null;
        cb(null, temp);
      }
}

//Function tp get Particular Open and close Issue counts
function getParticularIssueInfo(report, cb){
    const temp = report;
    if (temp.forkedStatus === 'yes') {
        getIssues(temp.projectId, (err, result) => {
          if (err) { logger.error('ERR:', err); cb(err) }
          let opened = 0
          let closed = 0
          result.map(iss => {
            if (iss.state === 'opened') {
              opened += 1;
            }
            else if (iss.state === 'closed')
              closed += 1;
          })
          temp['issuesOpened'] = opened;
          temp['issuesClosed'] = closed;
          cb(null, temp)
        })
    } else {
    temp['issuesOpened'] = null;
    temp['issuesClosed'] = null;
    cb(null, temp)

    }
}

module.exports = {
    getProjectDetails,
    getParticularCommitInfo,
    getParticularIssueInfo
}