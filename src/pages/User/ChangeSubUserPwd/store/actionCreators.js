import { changePasswordAxios } from '../../../../api/user';
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
    changePasswordAxios(
      "subUser",
      value.passwd,
      value.rePasswd,
      parseInt(localStorage.getItem('subUserId')),
      value.oldPasswd
    ).then(function (response) {
      if(response.data.meta.success){
        //跳转回上一页
        Feedback.toast.success('重置下级人员密码成功');
        history.goBack();
      }else{
        Feedback.toast.error(response.data.meta.message);
      }
    })
    .catch(function (error) {
      console.log("Oops!"+error);
    });
  }
}