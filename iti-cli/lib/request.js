const axios = require('axios');


axios.interceptors.response.use(res => {
  return res.data;
});

async function fetchRepoList() {
  return axios.get('https://api.github.com/orgs/iti-temp/repos');
}

async function fetchTagList(repo) {
  return axios.get(`https://api.github.com/repos/iti-temp/${repo}/tags`);
}

module.exports = {
  fetchRepoList,
  fetchTagList
}