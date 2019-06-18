import fetch from '../utils/request';

//uploadFile部分的接口
export async function uploadFileAxios(hostName, clusterName, data) {
  const params = {
    hostName,
    clusterName
  };
  return fetch({
    url: '/api/file/uploadFile',
    method: 'post',
    headers:{
      "Content-type":"application/x-www-form-urlencoded"
    },
    params,
    data
  });
}