import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/";

function getAllConnections() {
  return axios.get("connections");
}

function getOneConnection(value) {
  return axios.get(`connections/${value}`);
}

function createNewConnection(value) {
  return axios.post("connections", value);
}

function deleteOneConnection(value) {
  return axios.delete(`connections/${value}`);
}

function updateOneConnection(value) {
  return axios.put("connections", value);
}

export {
  getAllConnections,
  createNewConnection,
  deleteOneConnection,
  getOneConnection,
  updateOneConnection,
};
