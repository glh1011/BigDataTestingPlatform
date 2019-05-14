import fetch from '../utils/request';
import qs from 'querystring';

export async function loginByusername(username, password) {
  const data = {
    username,
    password,
  };
  return fetch({
    url: '/api/login',
    method: 'post',
    headers:{
      "Content-type":"application/x-www-form-urlencoded"
    },
    data: qs.stringify({ ...data })
  });
}