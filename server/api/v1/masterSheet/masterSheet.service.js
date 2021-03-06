const Sheet = require('./masterSheet.entity');
const logger = require('../../../logger');


//Function to insert the created member info, only if it is not present in the database
//Else will update the data already in the database
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

  //Look for the username if already present or not
  Sheet.find({ userName: member.userName, projectName: member.projectName })
    .exec((err, item) => {
      if (err) {
        cb(err);
      } else if (item.length > 0) {
        Sheet.findOneAndUpdate(
          { userName: member.userName },
          { $set: { projectId: member.projectId } },
          (error, doc) => {
            if (err) {
              logger.error('couldnt add sheet data', error);
              cb(error);
            } else {
              logger.info('Updated the data successfully');
              cb(null, doc);
            }
          },
        );
      } else {
        sheet.save((error, insertedSheet) => {
          if (error) {
            logger.error('err in inserting member in insertMember function', error);
          } else {
            cb(null, insertedSheet);
          }
        });
      }
    });
};

module.exports = {
  insertMember,
};
