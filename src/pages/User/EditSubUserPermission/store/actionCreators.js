import axios from '../../../../utils/request';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

const getPermissions = (permissions) => ({
  type: constants.GETPERMISSIONS,
  permissions,
})

export const getInfo = () => {
  //id获取被点击的下级用户id
  var id = localStorage.getItem("subUserId");
  var url = "/api/userPermission/querySubPermissions?id="+id;
  return (dispatch) => {
    axios.get(url).then((res) => {
      let permissions1 = res.data.data;
      let list1=[],list=[];
    for (let key in permissions1){
      list.push({value: key,label: key})
      if(permissions1[key]===0){
      list1.push(key)}
  }
      let permissions={};
      permissions.list=list;
      permissions.list1=list1;
      permissions.id=id
      dispatch(getPermissions(permissions));
})
}}

export const changeInputValue = () => ({
  type: constants.CHANGEINPUTVALUE,
});

export const submitForm = (value,id,history) => {
  var url = "/api/userPermission/giveAndCancelAuthority?id="+id+"&opNames="+value;
  return (dispatch) => {
    axios.post(url)
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