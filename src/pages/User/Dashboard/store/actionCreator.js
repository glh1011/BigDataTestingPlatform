import * as constants from './constants';
import { Feedback } from '@icedesign/base';
import { getSubUserListAxios } from '../../../../api/user';

const changeSubUserList = (subUsers, total) => ({
  type: constants.CHANGESUBUSERLIST,
  subUsers,
  total
})

export const getSubUserList = (current) => {
  var userId = parseInt(localStorage.getItem('userId'));
  var pageSize = 10;
  return (dispatch) => {
    getSubUserListAxios(userId, current, pageSize).then((res) => {
      if(res){
        if(res.data.meta.success){
          const subUsers = res.data.data.list;
          const total = res.data.data.total;
          dispatch(changeSubUserList(subUsers, total));
        }
        // if(res.data.meta.message=='用户没有操作权限不允许访问'){
        //   Feedback.toast.error('用户没有操作权限不允许访问！');
        // }
      }
    })
  }
}

export const clearTable = () => ({
  type: constants.CLEARTABLE,
})