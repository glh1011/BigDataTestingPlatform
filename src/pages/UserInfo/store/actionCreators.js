import axios from 'axios';
import * as constants from './constants';
import userForm from '../../../reducers.js'

const changeSelfInfo = (data) => ({
  type: constants.SETSELFINFO,
  data
})

export const getInfo = () => {
  //id获取当前用户id
  var id = parseInt(localStorage.getItem('userId'));
  var url = "http://192.168.0.216:8080/user/getUserDetailInfo?id=" + id;
  return (dispatch) => {
    axios.get(url).then((res) => {
      const result = res.data.data;
      console.log(res.data);
      console.log(result);
      dispatch(changeSelfInfo(res.data));
    })
  }
}

export const changeSelfInputValue = (name, email) => ({
  type: constants.CHANGEINPUTVALUE,
  name,
  email
});

export const submitForm = (name, email, history) => {
  console.log("actioncreator中");
  console.log(name);
  console.log(email);
  var id = parseInt(localStorage.getItem('userId'));
  var url = "http://192.168.0.216:8080/user/changeUserInfo?id="+id+"&email="+email+"&name="+name;
  return (dispatch) => {
    axios.post(url)
    .then(function (response) {
    console.log(response);
    if(response.data.meta.success){
      //跳转回上一页
      console.log(history);
      history.goBack();
    }
    })
    .catch(function (error) {
    alert("Oops!"+error);
    });
  }
   
};