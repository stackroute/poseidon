const request = require('superagent');

const TOKEN = '525b4f45ec945e1106298e83331c152e8ec236f47b568fd8fffc0e2d2df6b10b';
const BASE_URL = 'https://gitlab-dev.stackroute.in/api/v3';

// function getProject(projectId, cb) {
// 	request.get(`${BASE_URL}/projects/${projectId}`)
// 	.set('Authorization', `Bearer ${TOKEN}`)
// 	.end((err, res) => {
// 		if(err) { cb(err); return; }
// 		cb(null, res.body);
// 	});
// }

function getProject(proj_id, cb) {
  request(`${BASE_URL}/projects/${proj_id}/?access_token=${TOKEN}`)
    .end((err, res) => {
      if (err) { console.log(err); cb(err); }
      cb(null, res.body);
    });
}

function getMilestones(projectId, cb) {
  request.get(`${BASE_URL}/projects/${projectId}/milestones`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .end((err, res) => {
      if (err) { cb(err); return; }
      cb(null, res.body);
    });
}

// function getIssues(projectId, cb) {
// 	request.get(`${BASE_URL}/projects/${projectId}/issues`)
// 	.query({per_page: 100})
// 	.set('Authorization', `Bearer ${TOKEN}`)
// 	.end((err, res) => {
// 		if(err) { cb(err);return; }
// 		cb(null, res.body);
// 	});
// }

function deleteMilestone(projectId, milestoneId, cb) {
  request.delete(`${BASE_URL}/projects/${projectId}/milestones/${milestoneId}`)
    .set('Authoriztion', `Bearer ${TOKEN}`)
    .end((err, res) => {
      if (err) { cb(err); return; }
      cb(null);
    });
}

function createIssue(projectId, {
  title, description, milestone_id, due_date,
}, cb) {
  request.post(`${BASE_URL}/projects/${projectId}/issues`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send({
      title, description, milestone_id, due_date,
    })
    .end((err, res) => {
      if (err) {
        cb(err);
        console.log('Problem Creating Issue');
        console.log('projectId:', projectId);
        console.log('issue:', {
          title, description, milestone_id, due_date,
        });
        return;
      }

      cb(null, res.body);
    });
}

function createMilestone(projectId, { title, description, due_date }, cb) {
  request.post(`${BASE_URL}/projects/${projectId}/milestones`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send({ title, description, due_date })
    .end((err, res) => {
      if (err) { cb(err); return; }
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

function getProjectsOfAUser(userID, cb) {}

// GET /projects/:id/milestones/:milestone_id/issues
// https://gitlab-dev.stackroute.in/help/api/milestones.md#get-all-issues-assigned-to-a-single-milestone
function getAllIssuesForAMilestone(projectId, milestone_id, cb) {
  request.get(`${BASE_URL}/projects/${projectId}/milestones/${milestone_id}/issues`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .end((err, res) => {
      if (err) { cb(err); return; }
      cb(null, res.body);
    });
}


// GET commits
function getRepoCommits(proj_id, cb) {
  request.get(`${BASE_URL}/projects/${proj_id}/repository/commits/?access_token=${TOKEN}`)
    .end((err, res) => {
      if (err) { cb(err); return; }
      cb(null, res.body);
    });
}

// POST /projects/:id/share
// https://gitlab-dev.stackroute.in/help/api/projects.md#share-project-with-group
function addGroupAsCollaboratorToProject(projectId, group_id, group_access) {
  request.post(`${BASE_URL}/projects/${projectId}/share`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send({ group_id, group_access })
    .end((err, res) => {
      if (err) { cb(err); return; }
      cb(null, res.body);
    });
}

function searchForProject(projectName, cb) {
  console.log(projectName);
  request.get(`${BASE_URL}/projects/all?access_token=${TOKEN}`)
  // .set('Authorization', `Bearer ${TOKEN}`)
    .query({ search: projectName })

    .end((err, res) => {
      if (err) { cb(err); return; }
      // console.log("res", res.body)
      cb(null, res.body);
    });
}

function searchForProjectMembers(proj_id, cb) {
  // console.log(projectName);
  request.get(`${BASE_URL}/projects/${proj_id}/members/?access_token=${TOKEN}`)
  // .set('Authorization', `Bearer ${TOKEN}`)
  // .query({search: projectName})

    .end((err, res) => {
      if (err) { cb(err); return; }
      // console.log("res", res.body)
      cb(null, res.body);
    });
}

// get issue
function getIssues(proj_id, cb) {
  request(`${BASE_URL}/projects/${proj_id}/issues/?access_token=${TOKEN}`)
    .end((err, res) => {
      if (err) { console.log(err); cb(err); }
      cb(null, res.body);
    });
}

module.exports = {
  getProject,
  deleteMilestone,
  getMilestones,
  searchForProjectMembers,
  getIssues,
  getRepoCommits,
  getMembersUsingGroupName,
  createIssue,
  createMilestone,
  getGroupMembers,
  searchForGroup,
  getGroupMembers,
  getAllIssuesForAMilestone,
  addGroupAsCollaboratorToProject,
  searchForProject,
};
