import axios from "axios";

function getAllQueries() {
  return axios.get("http://172.16.1.63:8080/api/queries");
}

function getOneQuery(value) {
  return axios.get(`http://172.16.1.63:8080/api/queries/${value}`);
}

function createNewQuery(value) {
  return axios.post("http://172.16.1.63:8080/api/queries", value);
}

function deleteOneQuery(value) {
  return axios.delete(`http://172.16.1.63:8080/api/queries/${value}`);
}

function updateOneQuery(value) {
  return axios.put("http://172.16.1.63:8080/api/queries", value);
}

export {
  getAllQueries,
  getOneQuery,
  createNewQuery,
  deleteOneQuery,
  updateOneQuery,
};
