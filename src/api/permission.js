import fetch from '../utils/request';

//user部分的接口
export async function addPermissionAxios(description, deleted, opLevel, opName) {
  const data = {
    description,
    deleted,
    opLevel,
    opName,
  };
  return fetch({
    url: '/api/permission/addPermission',
    method: 'post',
    data
  });
}

export async function findAllPermissonAxios(pageNum, pageSize) {
  const params = {
    pageNum,
    pageSize
  };
  return fetch({
    url: '/api/permission/findAllPermisson',
    method: 'get',
    params
  });
}

export async function deletePermissionByIdAxios(id) {
  const params = { id };
  return fetch({
    url: '/api/permission/deletePermissionById',
    method: 'post',
    params
  });
}

export async function findPermissonByIdAxios(id) {
  const params = { id };
  return fetch({
    url: '/api/permission/findPermissonById',
    method: 'get',
    params
  });
}

export async function ModifyPermissonAxios(deleted, opLevel, opName, description, permissionId) {
  const data = {
    deleted,
    opLevel,
    opName,
    description,
    permissionId
  };
  return fetch({
    url: '/api/permission/ModifyPermisson',
    method: 'post',
    data
  });
}

export async function queryPermissionsAxios(id, pageNum, pageSize) {
  const params = {
    id,
    pageNum,
    pageSize
  };
  return fetch({
    url: '/api/permission/queryPermissions',
    method: 'get',
    params
  });
}
