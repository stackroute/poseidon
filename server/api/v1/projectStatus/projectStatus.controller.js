const async = require('async');
const logger = require('../../../logger');
const {getProjectDetails, getParticularCommitInfo, getParticularIssueInfo} = require('./projectDetails');


function projectStatusReport(projectId, cb) {
    async.waterfall([
        getProjectDetails.bind(null,projectId),
        getParticularCommitInfo,
        getParticularIssueInfo,

    ], (err, result) =>{
        if(err) {
            logger.error('ProjecStatus waterfall failed',err);
            return cb(err);
        } 
        // logger.info("result : ", result);
        cb(null, result);
    })
}

module.exports = {
    projectStatusReport
}

