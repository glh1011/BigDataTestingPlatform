import * as constants from './constants';
import { getUserDetailInfoAxios } from '../../../../api/user';

const displayUserInfo = (data) => ({
  type: constants.SETSUBUSERINFO,
  data
})

export const getUserDetail = () => {
  var subUserId = parseInt(localStorage.getItem('subUserId'));
  return (dispatch) => {
    getUserDetailInfoAxios(subUserId)
    .then((res) => {
      const result = res.data;
      dispatch(displayUserInfo(result));
    })
  }
}