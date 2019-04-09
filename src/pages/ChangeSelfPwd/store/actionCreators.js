import axios from 'axios';
import * as constants from './constants';

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
    axios.post('http://192.168.0.216:8080/user/changePassword', {
      newPassword: value.passwd,
      confirmPassword: value.rePasswd,
      id: parseInt(localStorage.getItem('userId')),
      oldPassword: value.oldPasswd
    })
    .then(function (response) {
      console.log(response.data.meta.success);
      if(response.data.meta.success){
        //跳转回上一页
        console.log(history);
        history.goBack();
        dispatch(resetPwdForm());
      }
    })
    .catch(function (error) {
      alert("Oops!"+error);
    });
  }
}