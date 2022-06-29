import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/";

function getAllQueries() {
  return axios.get("queries");
}

function getOneQuery(value) {
  return axios.get(`queries/${value}`);
}

function createNewQuery(value) {
  return axios.post("queries", value);
}

function deleteOneQuery(value) {
  return axios.delete(`queries/${value}`);
}

function updateOneQuery(value) {
  return axios.put("queries", value);
}

export {
  getAllQueries,
  getOneQuery,
  createNewQuery,
  deleteOneQuery,
  updateOneQuery,
};
