import fetch from '../utils/request';
import qs from 'querystring';

//admin资源池管理饼图数据
//异步函数，返回值总是Promises
export async function getAdmainResourceAxios(pageNum,pageSize) {
  const params = {
    pageNum,
    pageSize
  };
  return fetch({
    url: '/api/info/findAllAdminInfo',
    method: 'GET',
    params
  })
  //{...params}为什么这么写？好像这样是深拷贝
  //深拷贝（只针对较为复杂的object，拷贝对象各个层级的属性，被拷贝对象改变，拷贝对象不会改变（开辟了新的内存））
}

//admin资源池管理表格数据
export async function getFirstLevelResourceListAxios(pageNum,pageSize) {
  const params = {
    pageNum,
    pageSize
  };
  return fetch({
    url: "/api/info/findAllFirstInfo",
    mathod: "GET",
    params
  })
}

//admin分配一级资源池, 获取无资源池的一级用户
export async function getFirstLevelUserWithoutResourceAxios() {
  return fetch({
    url: '/api/allocation/findFirstWithoutResource',
    method: 'GET'
  })
}

//admin分配一级资源池
export async function allocateFirstLevelResourceAxios(username, totalCpu, totalMem, totalDisk) {
  const params = {
    username,
    totalCpu,
    totalMem,
    totalDisk
  };
  console.log(params);
  return fetch({
    url: '/api/allocation/allocateResourceToFirst',
    method: 'POST',
    params
  })
}

//admin回收一级资源池
export async function recycleResourcePoolAxios(userName) {
  const params = {
    userName
  };
  return fetch({
    url: '/api/delete/deleteFirst',
    method: 'POST',
    params
  })
}

//admin、一级用户获取饼图数据
export async function getFirstLevelResourceAxios(username) {
  const params = {
    username
  };
  return fetch({
    url: '/api/info/findOneFirstInfo',
    method: 'GET',
    params
  })
}

//admin、一级用户获取表格数据
export async function getClusterListAxios(pageNum, username) {
  const params = {
    pageNum,
    username
  };
  return fetch({
    url: '/api/info/findAllClusterInfo',
    method: 'GET',
    params
  })
}

//一级用户查看与集群不关联的二级用户
export async function getUnboundSecondUserAxios(clusterName) {
  const params = {
    clusterName
  };
  return fetch({
    url: '/api/allocation/findSecondWithoutConnect',
    method: 'GET',
    params
  })
}

//一级用户提交绑定集群用户
export async function assignClusterUserAxios(users, clusterName) {
  const params = {
    users: users.join(','),
    clusterName
  };
  return fetch({
    url: '/api/allocation/assignRole',
    method: 'POST',
    params
  })
}

//一级用户查看与集群关联的二级用户
export async function getBoundSecondUserAxios(clusterName) {
  const params = {
    clusterName
  };
  return fetch({
    url: '/api/allocation/findSecondConnect',
    method: 'GET',
    params
  })
}

//一级用户提交解绑集群用户
export async function unAssignClusterUserAxios(users, clusterName) {
  const params = {
    users: users.join(','),
    clusterName
  };
  return fetch({
    url: '/api/allocation/unassignRole',
    method: 'POST',
    params
  })
}

//一级用户回收集群
export async function recycleClusterAxios(clusterName) {
  const params = {
    clusterName
  };
  return fetch({
    url: '/api/delete/deleteCluster',
    method: 'POST',
    params
  })
}

//admin、一级用户查询单个集群及其虚拟机
export async function findDetailByUserAndClusterAxios(userName, clusterName) {
  const params = {
    userName,
    clusterName
  }
  return fetch({
    url: '/api/userCluster/findDetailByUserAndCluster',
    method: 'GET',
    params
  })
}

//二级用户查询所有集群及其虚拟机
export async function findDetailByUserAxios(userName) {
  const params = {
    userName
  }
  return fetch({
    url: '/api/userCluster/findDetailByUser',
    method: 'GET',
    params
  })
}

//admin、一级用户、二级用户跳转到cdh
export async function toClouderaClusterAxios(clusterName) {
  const params = {
    clusterName
  }
  return fetch({
    url: '/api/jump/toClouderaCluster',
    method: 'GET',
    params
  })
}