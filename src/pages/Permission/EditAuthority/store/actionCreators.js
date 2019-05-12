import axios from '../../../../utils/request';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

const changeAuthorityInfo = (value) => ({
  type: constants.DISPLAYAUTHORITYINFO,
  value
})

export const getAuthorityDetail = () => {
  var permissionId = parseInt(localStorage.getItem('permissionId'))
  var url = '/api/permission/findPermissonById?id='+permissionId;
  return (dispatch) => {
    axios.get(url).then((res) => {
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
    axios.post('/api/permission/ModifyPermisson', {
      deleted: 0,
      opLevel: parseInt(value.opLevel),
      opName: value.opName,
      description: value.description,
      permissionId: parseInt(localStorage.getItem('permissionId'))
    })
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