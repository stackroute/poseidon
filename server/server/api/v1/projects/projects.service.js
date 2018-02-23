const projects = require('./projects.entity');


const checkProject = function (event, cb) {
  console.log('inside check project');
  // console.log('event again   ', event)
  projects.find({ projectName: event.name })
    .exec((err, project) => {
      if (err) { console.log('err', err), cb(err); } else {
        const count = project.length;
        console.log('count', count);
        console.log('project', project);
        cb(null, count, project);
      }
    });
};


module.exports = {
  checkProject,
};
