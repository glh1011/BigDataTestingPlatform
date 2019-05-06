import axios from '../../../../utils/newRequest';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

export const changeFormValue = (value) => ({
  type: constants.ADDSUBUSERFORMCHANGE,
  value
});

export const resetAddSubUser = () => ({
  type: constants.RESETADDSUBUSER
})

export const addSubUser = (value, history) => {
  return (dispatch) => {
    axios.post('/user/addUser', {
      userName: value.userName,
      name: value.name,
      email: value.email,
      password: value.passwd,
      userLevel: parseInt(value.userLevel),
      superiorUserId:parseInt(localStorage.getItem('userId')),
      deleted: 0
    })
    .then(function (response) {
    if(response.meta.success){
      Feedback.toast.success('添加人员成功！');
      history.goBack();
    }else{
      Feedback.toast.error('添加人员失败！');
    }
    })
    .catch(function (error) {
    alert("Oops!"+error);
    });
  }
}