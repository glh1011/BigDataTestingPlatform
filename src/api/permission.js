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

// export async function addPermissionAxios(description, deleted, opLevel, opName) {
//   const data = {
//     description,
//     deleted,
//     opLevel,
//     opName,
//   };
//   return fetch({
//     url: '/api/permission/addPermission',
//     method: 'post',
//     data
//   });
// }