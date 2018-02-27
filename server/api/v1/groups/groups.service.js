const groups = require('./groups.entity');
const logger = require('../../../logger');


const getGroupInfo = function (event, count, project, cb) {
  if (count === 1) {
    const obj = {};
    groups.find({})
      .exec((err, group) => {
        group.forEach((item) => {
          if (item.groupMembers.indexOf(event.owner_name) >= 0) {
            obj.groupName = item.groupName;
            obj.projectName = event.name;
            obj.projectId = event.project_id;
            obj.userName = event.owner_name;
            cb(null, obj);
          }
        });
        if (Object.keys(obj).length === 0) {
          cb({ error: 'User not part of any group, though projectName is same' });
        }
      });
  } else {
    cb({ error: 'project not found' });
  }
};

module.exports = {
  getGroupInfo,
};
