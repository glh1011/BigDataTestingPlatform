import axios from '../../../../utils/newRequest';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

const changeSelfInfo = (data) => ({
  type: constants.SETSELFINFO,
  data
})

export const getInfo = () => {
  //id获取当前用户id
  var id = parseInt(localStorage.getItem('userId'));
  var url = "/api/user/getUserDetailInfo?id=" + id;
  return (dispatch) => {
    axios.get(url).then((res) => {
      dispatch(changeSelfInfo(res));
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
  var url = "/api/user/changeUserInfo?id="+id+"&email="+email+"&name="+name;
  return (dispatch) => {
    axios.post(url)
    .then(function (response) {
    if(response.meta.success){
      Feedback.toast.success("个人信息修改成功");
      //跳转回上一页
      history.goBack();
    }else{
      Feedback.toast.error("个人信息修改成功");
    }
    })
    .catch(function (error) {
    alert("Oops!"+error);
    });
  }
   
};