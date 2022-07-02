import axios from "axios";

function getFormsList() {
  return axios.get("http://172.16.1.63:8080/api/forms");
}

function createNewForm(value) {
  return axios.post("http://172.16.1.63:8080/api/forms", value);
}

function createExecuteQuery(value) {
  return axios.post("http://172.16.1.63:8080/api/forms/execute", value);
}

export { getFormsList, createNewForm, createExecuteQuery };
