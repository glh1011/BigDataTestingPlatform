import axios from '../../../../utils/request';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

export const changeInputValue = (value) => ({
  type: constants.CHANGEPASSWORDINPUTVALUE,
  value
});

export const resetPwdForm = () => ({
  type: constants.RESETPWDFORM
}) 

export const modifyPwd = (value, history) => {
  return (dispatch) => {
    axios.post('/api/user/changePassword', {
      newPassword: value.passwd,
      confirmPassword: value.rePasswd,
      id: parseInt(localStorage.getItem('userId')),
      oldPassword: value.oldPasswd
    })
    .then(function (response) {
      if(response.data.meta.success){
        //跳转回上一页
        Feedback.toast.success('修改密码成功');
        history.goBack();
      }else{
        Feedback.toast.error(response.data.meta.message);
      }
    })
    .catch(function (error) {
      alert("Oops!"+error);
    });
  }
}