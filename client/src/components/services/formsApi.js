import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/api/'

function getFormsList (){
    return axios.get("forms")
} 

function createNewForm (value){
    return axios.post("forms",value)
} 

function createExecuteQuery (value){
    return axios.post("forms/execute",value)
} 


export {getFormsList , createNewForm , createExecuteQuery}