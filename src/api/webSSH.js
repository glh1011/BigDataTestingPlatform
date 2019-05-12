import fetch from '../utils/request';

//user部分的接口
export async function getPasswdAxios(clusterName, hostName) {
  const params = {
    clusterName,
    hostName
  };
  return fetch({
    url: '/api/vm/getPasswd',
    method: 'get',
    params
  });
}