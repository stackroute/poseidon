const { getProject } = require('./lib');
const logger = require('../../../logger');

//Function to attach Forked status of the project
const checkForkedStatus = function (member, cb) {
  const obj = member;
  getProject(obj.projectId, (err, result) => {
    if (err) {
      logger.error('couldnt get the project in checkForkedStatus', err);
      cb(err);
    } else if (Object.prototype.hasOwnProperty.call(result, 'forked_from_project')) {
      obj.forked_status = 'yes';
      cb(null, obj);
    } else {
      obj.forked_status = 'no';
      cb(null, obj);
    }
  });
};

module.exports = {
  checkForkedStatus,
};
