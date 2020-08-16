import axios from 'axios'
import shortid from 'shortid';

const url = 'https://menuxxx-cad57.firebaseio.com/users.json';

export function postUser (obj){
    const id = shortid.generate();
    return axios.patch(url,{
        [id]: {
            ...obj,
            id
        }
    })
}

export function clearUsersList (){
    const id = shortid.generate();
   return axios.put(url,{
    [id]: {
        name: 'BOSS',
        email: 'demo@gmail.com',
        password: 'demodemo228',
    }
    })
    
}

export function getUsersList (){
  return  axios.get(url)
  .then(data => Object.values(data.data))   
}
export function deleteUser (id){
    return  axios.delete(`https://lololoshka-d6f84.firebaseio.com/users/${id}.json`)
  }

export function refreshUser (obj){
 return axios.put(`https://menuxxx-cad57.firebaseio.com/users/${obj.id}.json`,obj)
}
