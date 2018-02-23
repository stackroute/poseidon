const Sheet = require('./masterSheet.entity');
const async = require('async');


const insertMember = function (member, cb) {
  const sheet = new Sheet();

  sheet.groupName = member.groupName;
  sheet.projectName = member.projectName;
  sheet.projectId = member.projectId;
  sheet.userName = member.userName;
  sheet.forked_status = member.forked_status;
  sheet.submission_status = member.submission_status;
  sheet.submission_Date = member.submission_Date;
  sheet.submission_Time = member.submission_Time;
  sheet.issues_opened = member.issues_opened;
  sheet.issues_closed = member.issues_closed;
  sheet.save((err, insertedSheet) => {
    if (err) {
      console.log('err in inserting member in insertMember function', err);
    } else {
      cb(null, insertedSheet);
    }
  });
};

module.exports = {
  insertMember,
};
