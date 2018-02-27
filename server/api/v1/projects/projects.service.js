const projects = require('./projects.entity');
const logger = require('../../../logger');


const checkProject = function (event, cb) {
  projects.find({ projectName: event.name })
    .exec((err, project) => {
      if (err) {
        logger.error('err', err);
        cb(err);
      } else {
        const count = project.length;
        cb(null, count, project);
      }
    });
};


module.exports = {
  checkProject,
};
