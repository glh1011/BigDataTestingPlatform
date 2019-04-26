import axios from 'axios';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

const changeSubUserList = (subUsers, total) => ({
  type: constants.CHANGESUBUSERLIST,
  subUsers,
  total
})

export const getSubUserList = (current) => {
  var pageNum = 1;
  var userId = parseInt(localStorage.getItem('userId'));
  var pageSize = 10;
  var url = 'http://192.168.0.129:8080/user/getSubUsers?userId='+userId+"&pageNum="+current+"&pageSize="+pageSize;
  return (dispatch) => {

    axios.get(url).then((res) => {
      console.log(res.data);
      if(res.data.meta.success){
        const subUsers = res.data.data.list;
        const total = res.data.data.total;
        dispatch(changeSubUserList(subUsers, total));
      }
      if(res.data.meta.message=='用户没有操作权限不允许访问'){
        Feedback.toast.error('用户没有操作权限不允许访问！');
      }

    })
  }
}