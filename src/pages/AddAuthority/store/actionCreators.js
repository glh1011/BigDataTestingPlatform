import axios from 'axios';
import * as constants from './constants';

export const changeInputValue = (value) => ({
  type: constants.CHANGEINPUTVALUE,
  value
});

export const addAuthority = (value, history) => {
  console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\');
  console.log(value);
  return (dispatch) => {
    axios.post('http://192.168.0.216:8080/permission/addPermission', {
      deleted: 0,
      opLevel: parseInt(value.opLevel),
      opName: value.opName,
    })
    .then(function (response) {
      if(response.data.meta.success){
        history.goBack();
      }
    })
    .catch(function (error) {
      alert("Oops"+error);
    });
  }
}