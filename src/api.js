import axios from 'axios';

var uri = 'http://localhost:3005/api/pirates';

export function getPirates (){
  return axios.get(uri)
  .then(function(response){
    return response.data;
  })
}

export function deletePirate (pirate){
  return axios.get(`{uri}{pirate}`)
  .then(function(response){
    return response.data
  })
}

export function newPirate (pirate){
  return axios.post(`${uri}${pirate}`)
  .then(function(response){
    return response.data
  })
}