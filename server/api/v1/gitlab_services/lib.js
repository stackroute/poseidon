const request = require('superagent');
const logger = require('../../../logger');

const TOKEN = '525b4f45ec945e1106298e83331c152e8ec236f47b568fd8fffc0e2d2df6b10b';
const BASE_URL = 'https://gitlab-dev.stackroute.in/api/v3';

function getProject(projId, cb) {
  request(`${BASE_URL}/projects/${projId}/?access_token=${TOKEN}`)
    .end((err, res) => {
      if (err) { logger.error(err); cb(err); }
      cb(null, res.body);
    });
}


function searchForGroup(groupName, cb) {
  request.get(`${BASE_URL}/groups/?search=${groupName}`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .end((err, res) => {
      if (err) { cb(err); return; }
      cb(null, res.body);
    });
}

function getGroupMembers(groupID, cb) {
  request.get(`${BASE_URL}/groups/${groupID}/members`)
    .query({ per_page: 200 })
    .set('Authorization', `Bearer ${TOKEN}`)
    .end((err, res) => {
      if (err) { cb(err); return; }
      cb(null, res.body);
    });
}

// get user members using groupName
function getMembersUsingGroupName(groupName, cb) {
  request.get(`${BASE_URL}/groups/${groupName}/members/?access_token=${TOKEN}`)
  // .query({per_page: 200})
  // .set('access_token', `${TOKEN}`)
    .end((err, res) => {
      if (err) { cb(err); return; }
      // console.log("res",res.body);
      cb(null, res.body);
    });
}


// GET commits
function getRepoCommits(projId, cb) {
  request.get(`${BASE_URL}/projects/${projId}/repository/commits/?access_token=${TOKEN}`)
    .end((err, res) => {
      if (err) { cb(err); return; }
      cb(null, res.body);
    });
}

// POST /projects/:id/share
// https://gitlab-dev.stackroute.in/help/api/projects.md#share-project-with-group
function addGroupAsCollaboratorToProject(projectId, groupId, groupAccess, cb) {
  request.post(`${BASE_URL}/projects/${projectId}/share`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send({ groupId, groupAccess })
    .end((err, res) => {
      if (err) { cb(err); return; }
      cb(null, res.body);
    });
}

function searchForProject(projectName, cb) {
  logger.info(projectName);
  request.get(`${BASE_URL}/projects/all?access_token=${TOKEN}`)
  // .set('Authorization', `Bearer ${TOKEN}`)
    .query({ search: projectName })

    .end((err, res) => {
      if (err) { cb(err); return; }
      cb(null, res.body);
    });
}

function searchForProjectMembers(projId, cb) {
  // console.log(projectName);
  request.get(`${BASE_URL}/projects/${projId}/members/?access_token=${TOKEN}`)
  // .set('Authorization', `Bearer ${TOKEN}`)
  // .query({search: projectName})

    .end((err, res) => {
      if (err) { cb(err); return; }
      // console.log("res", res.body)
      cb(null, res.body);
    });
}

// get issue
function getIssues(projId, cb) {
  request(`${BASE_URL}/projects/${projId}/issues/?access_token=${TOKEN}`)
    .end((err, res) => {
      if (err) { logger.error(err); cb(err); }
      cb(null, res.body);
    });
}

module.exports = {
  getProject,
  searchForProjectMembers,
  getIssues,
  getRepoCommits,
  getMembersUsingGroupName,
  getGroupMembers,
  searchForGroup,
  addGroupAsCollaboratorToProject,
  searchForProject,
};
