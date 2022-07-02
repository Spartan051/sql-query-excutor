import axios from "axios";
//
// axios.defaults.baseURL = "http://172.16.1.63:8080/api/";

function getAllConnections() {
  return axios.get("http://172.16.1.63:8080/api/connections");
}

function getOneConnection(value) {
  return axios.get(`http://172.16.1.63:8080/api/connections/${value}`);
}

function createNewConnection(value) {
  return axios.post("http://172.16.1.63:8080/api/connections", value);
}

function deleteOneConnection(value) {
  return axios.delete(`http://172.16.1.63:8080/api/connections/${value}`);
}

function updateOneConnection(value) {
  return axios.put("http://172.16.1.63:8080/api/connections", value);
}

export {
  getAllConnections,
  createNewConnection,
  deleteOneConnection,
  getOneConnection,
  updateOneConnection,
};
