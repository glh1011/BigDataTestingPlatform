import * as constants from './constants';
import { addSubUserAxios } from '../../../../api/user';
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
    addSubUserAxios(
      value.userName,
      value.name,
      value.email,
      value.passwd,
      parseInt(value.userLevel),
      parseInt(localStorage.getItem('userId')),
      0
    ).then(function (response) {
      if(response.data.meta.success){
        Feedback.toast.success('添加人员成功！');
        history.goBack();
      }else{
        Feedback.toast.error('添加人员失败！');
      }
    }).catch(function (error) {
      console.log("Oops!"+error);
    });
  }
}