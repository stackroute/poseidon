const projects = require('./projects.entity');
const logger = require('../../../logger');


//This service function will check whether the project is present in the database or not
//And returns count 1 for present, else 0
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
