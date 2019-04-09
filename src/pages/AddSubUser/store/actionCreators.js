import axios from 'axios';
import * as constants from './constants';

export const changeFormValue = (value) => ({
  type: constants.ADDSUBUSERFORMCHANGE,
  value
});

export const resetAddSubUser = () => ({
  type: constants.RESETADDSUBUSER
})

export const addSubUser = (value, history) => {
  console.log(value);
  return (dispatch) => {
    axios.post('http://192.168.0.216:8080/user/addUser', {
      userName: value.userName,
      name: value.name,
      email: value.email,
      password: value.passwd,
      userLevel: parseInt(value.userLevel),
      superiorUserId:parseInt(localStorage.getItem('userId')),
      deleted: 0
    })
    .then(function (response) {
    if(response.data.meta.success){
      history.goBack();
      dispatch(resetAddSubUser());
    }
    })
    .catch(function (error) {
    alert("Oops!"+error);
    });
  }
}