import axios from 'axios';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

const changeSelfInfo = (data) => ({
  type: constants.SETSELFINFO,
  data
})

export const getInfo = () => {
  //id获取被点击的下级用户id
  var id = parseInt(localStorage.getItem('subUserId'));
  var url = "http://192.168.0.129:8080/user/getUserDetailInfo?id="+id;
  return (dispatch) => {
    axios.get(url).then((res) => {
      dispatch(changeSelfInfo(res.data));
    })
  }
}

export const changeInputValue = (name, email) => ({
  type: constants.CHANGEINPUTVALUE,
  name,
  email
});

export const submitForm = (name, email, history) => {
  var id = parseInt(localStorage.getItem('subUserId'))
  var url = "http://192.168.0.129:8080/user/changeUserInfo?id="+id+"&email="+email+"&name="+name;
  return (dispatch) => {
    axios.post(url)
    .then(function (response) {
      if(response.data.meta.success){
        Feedback.toast.success("下级人员信息修改成功");
        history.goBack();
      }else{
        Feedback.toast.error("下级人员信息修改失败");
      }
    })
    .catch(function (error) {
      alert("Oops!"+error);
    });
  }
};