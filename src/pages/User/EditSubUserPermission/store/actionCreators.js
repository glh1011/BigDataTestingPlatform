import { 
  querySubPermissionsAxios,
  giveAndCancelAuthorityAxios,
 } from '../../../../api/user';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

const getPermissions = (permissions, checkedArr) => ({
  type: constants.GETPERMISSIONS,
  permissions,
  checkedArr
})

export const getInfo = () => {
  //id获取被点击的下级用户id
  var id = localStorage.getItem("subUserId");
  return (dispatch) => {
    querySubPermissionsAxios(id).then((res) => {
      let permissions = res.data.data;
      console.log(permissions);
      //将结果中的选中值提取出来放进value数组
      let checkedArr = [];
      for(let key in permissions){
        if(permissions[key].selected === true){
          checkedArr.push(permissions[key].permission.opName)
        }
      }
      dispatch(getPermissions(permissions, checkedArr));
})
}}

export const changeInputValue = () => ({
  type: constants.CHANGEINPUTVALUE,
});

export const submitForm = (value,id,history) => {
  console.log('actioncreators'+value);
  return (dispatch) => {
    giveAndCancelAuthorityAxios(id, value)
    .then(function (response) {
      if(response.data.meta.success){
        Feedback.toast.success('修改成功！');
        history.back();
      }else{
        Feedback.toast.error('修改失败！');
      }
    })
    .catch(function (error) {
    console.log(error);
    });
  }
};

export const selectCheckbox = (selectedItems) => ({
  type: constants.SELECTCHECKBOX,
  selectedItems
})

export const clearCheckbox = () => ({
  type: constants.CLEARCHECKBOX,
})