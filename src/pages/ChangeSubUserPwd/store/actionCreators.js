import axios from 'axios';
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
  console.log("修改密码");
  console.log(value.passwd, value.rePasswd);
  return (dispatch) => {
    axios.post('http://192.168.0.216:8080/user/changeSubPassword', {
      newPassword: value.passwd,
      confirmPassword: value.rePasswd,
      id: parseInt(localStorage.getItem('subUserId')),
      oldPassword: value.oldPasswd
    })
    .then(function (response) {
      console.log(response.data.meta.success);
      if(response.data.meta.success){
        //跳转回上一页
        Feedback.toast.success('重置下级人员密码成功');
        console.log(history);
        history.goBack();
        dispatch(resetPwdForm());
      }else{
        Feedback.toast.error("重置下级人员密码失败");
        dispatch(resetPwdForm());
      }
    })
    .catch(function (error) {
      alert("Oops!"+error);
    });
  }
}