import axios from 'axios';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

export const changeInputValue = (value) => ({
  type: constants.CHANGEINPUTVALUE,
  value
});

export const resetAddForm = () => ({
  type: constants.RESETADDFORM
})

export const addAuthority = (value, history) => {
  return (dispatch) => {
    axios.post('http://192.168.0.129:8080/permission/addPermission', {
      deleted: 0,
      opLevel: parseInt(value.opLevel),
      opName: value.opName,
    })
    .then(function (response) {
      if(response.data.meta.success){
        Feedback.toast.success("success");
        history.goBack();
        dispatch(resetAddForm());
      }else{
        Feedback.toast.error("failed");
      }
    })
    .catch(function (error) {
      alert("Oops"+error);
    });
  }
}