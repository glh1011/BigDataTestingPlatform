import { 
  getUserDetailInfoAxios,
  changeUserInfoAxios,
 } from '../../../../api/user';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

const changeSelfInfo = (data) => ({
  type: constants.SETSELFINFO,
  data
})

export const getInfo = () => {
  //id获取当前用户id
  var id = parseInt(localStorage.getItem('userId'));
  return (dispatch) => {
    getUserDetailInfoAxios(id).then((res) => {
      if(res){
        dispatch(changeSelfInfo(res.data));
      }
    })
  }
}

export const changeSelfInputValue = (name, email) => ({
  type: constants.CHANGEINPUTVALUE,
  name,
  email
});

export const submitForm = (name, email, history) => {
  var id = parseInt(localStorage.getItem('userId'));
  return (dispatch) => {
    changeUserInfoAxios(id, email, name)
    .then(function (response) {
    if(response.data.meta.success){
      Feedback.toast.success("个人信息修改成功");
      //跳转回上一页
      history.goBack();
    }else{
      Feedback.toast.error("个人信息修改成功");
    }
    })
    .catch(function (error) {
    console.log("Oops!"+error);
    });
  }
   
};