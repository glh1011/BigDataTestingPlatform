import { addPermissionAxios } from '../../../../api/permission';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

export const changeInputValue = (value) => ({
  type: constants.CHANGEINPUTVALUE,
  value
});

export const resetAddForm = () => ({
  type: constants.RESETADDFORM
})

export const addAuthority = (description, opName, opLevel, history) => {
  return (dispatch) => {
    addPermissionAxios(
      description,
      0,
      parseInt(opLevel),
      opName,
    ).then(function (response) {
      if(response){
        if(response.data.meta.success){
          Feedback.toast.success("添加权限成功");
          history.goBack();
        }else{
          Feedback.toast.error(response.data.meta.message);
        }
      }
    })
    .catch(function (error) {
      console.log("Oops"+error);
    });
   }
}