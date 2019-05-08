import axios from '../../../../utils/newRequest';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

export const changeInputValue = (value) => ({
  type: constants.CHANGEINPUTVALUE,
  value
});

export const resetAddForm = () => ({
  type: constants.RESETADDFORM
})

export const addAuthority = (opName, opLevel, history) => {
  return (dispatch) => {
    axios.post('/api/permission/addPermission', {
      deleted: 0,
      opLevel: parseInt(opLevel),
      opName: opName,
    })
    .then(function (response) {
      if(response.meta.success){
        Feedback.toast.success("添加权限成功");
        history.goBack();
      }else{
        Feedback.toast.error(response.meta.message);
      }
    })
    .catch(function (error) {
      alert("Oops"+error);
    });
   }
}