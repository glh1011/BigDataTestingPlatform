import fetch from '../utils/request';

export async function loginByusername(username, password) {
  const data = {
    username,
    password,
  };
  return fetch({
    url: '/login',
    method: 'post',
    data,
  });
}

