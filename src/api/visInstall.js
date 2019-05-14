import fetch from '../utils/request';

//user部分的接口
export async function installAxios(clusterName, virtualMachineRequests) {
  const data = {
    clusterName,
    virtualMachineRequests
  };
  return fetch({
    url: '/api/cluster/install',
    method: 'post',
    data
  });
}

export async function statusAxios(id) {
  const params = {
    id
  };
  return fetch({
    url: '/api/cluster/status',
    method: 'get',
    params
  });
}

export async function defaultAxios() {
  return fetch({
    url: '/api/cluster/default',
    method: 'get',
  });
}

export async function currentAxios() {
  return fetch({
    url: '/api/info/current',
    method: 'get',
  });
}
