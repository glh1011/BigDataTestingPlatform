import fetch from '../utils/request';

export function loginByusername(username, password) {
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

