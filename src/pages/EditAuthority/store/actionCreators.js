import axios from 'axios';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

const changeAuthorityInfo = (value) => ({
  type: constants.DISPLAYAUTHORITYINFO,
  value
})

export const getAuthorityDetail = () => {
  var permissionId = parseInt(localStorage.getItem('permissionId'))
  var url = 'http://192.168.0.216:8080/permission/findPermissonById?id='+permissionId;
  return (dispatch) => {
    axios.get(url).then((res) => {
      const result = res.data.data;
      console.log(res.data);
      console.log(result);
      dispatch(changeAuthorityInfo(result));
    })
  }
}

export const changeInputValue = (value) => ({
  type: constants.CHANGEINPUTVALUE,
  value
});

export const modifyAuthority = (value, history) => {
  console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\');
  console.log(value);
  return (dispatch) => {
    axios.post('http://192.168.0.216:8080/permission/ModifyPermisson', {
      deleted: 0,
      opLevel: parseInt(value.opLevel),
      opName: value.opName,
      permissionId: parseInt(localStorage.getItem('permissionId'))
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data.meta.success){
        Feedback.toast.success("权限修改成功");
        history.goBack();
      }else{
        Feedback.toast.error("权限修改失败");
      }
    })
    .catch(function (error) {
      alert("Oops"+error);
    });
  }
}