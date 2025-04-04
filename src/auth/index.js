import axios from 'axios'

const url = import.meta.env.VITE_AUTH_URI

const apiAnonymous = axios.create();
apiAnonymous.defaults.baseURL = url;             
apiAnonymous.defaults.headers.common['Content-Type'] = 'application/json';
apiAnonymous.defaults.headers.common['Accept'] = 'application/json';
apiAnonymous.defaults.maxBodyLength = Infinity;
apiAnonymous.defaults.withCredentials = false;

export async function login (username, password) {
  const data = JSON.stringify({
    username,
    password
  });

  const config = {
    method: 'post',
    url: `/signin`,
    data : data
  };
  
  return new Promise((resolve, reject) => {
    apiAnonymous.request(config)
    .then((response) => {
      resolve(response.data) //json
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  })
}