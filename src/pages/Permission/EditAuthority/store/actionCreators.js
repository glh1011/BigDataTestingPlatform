import * as constants from './constants';
import { Feedback } from '@icedesign/base';
import { 
  findPermissonByIdAxios,
  ModifyPermissonAxios
 } from '../../../../api/permission';

const changeAuthorityInfo = (value) => ({
  type: constants.DISPLAYAUTHORITYINFO,
  value
})

export const getAuthorityDetail = () => {
  var permissionId = parseInt(localStorage.getItem('permissionId'))
  return (dispatch) => {
    findPermissonByIdAxios(permissionId).then((res) => {
      const result = res.data.data;
      dispatch(changeAuthorityInfo(result));
    })
  }
}

export const changeInput = (value) => ({
  type: constants.CHANGEINPUT,
  value
});

export const modifyAuthority = (value, history) => {
  return (dispatch) => {
    ModifyPermissonAxios(
      0,
      parseInt(value.opLevel),
      value.opName,
      value.description,
      parseInt(localStorage.getItem('permissionId'))
    )
    .then(function (response) {
      if(response){
        if(response.data.meta.success){
          Feedback.toast.success("权限修改成功");
          history.goBack();
        }else{
          Feedback.toast.error("权限修改失败");
        }
      }
    })
    .catch(function (error) {
      console.log("Oops"+error);
    });
  }
}