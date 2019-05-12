import fetch from '../utils/request';

//log部分的接口
export async function toOpenStackAxios() {
  return fetch({
    url: '/api/jump/toOpenStack',
    method: 'get'
  });
}

export async function toClouderaClusterAxios(clusterName) {
  const params = {
    clusterName
  }
  return fetch({
    url: '/api/jump/toClouderaCluster',
    method: 'get',
    params
  });
}

export async function findAllAxios(pageNum, pageSize) {
  const params = {
    pageNum,
    pageSize
  }
  return fetch({
    url: '/api/logs/findAll',
    method: 'get',
    params
  });
}