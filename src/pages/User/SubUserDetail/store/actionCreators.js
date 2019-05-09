import * as constants from './constants';
import axios from '../../../../utils/request';

const displayUserInfo = (data) => ({
  type: constants.SETSUBUSERINFO,
  data
})

export const getUserDetail = () => {
  var subUserId = parseInt(localStorage.getItem('subUserId'));
  var url = '/api/user/getUserDetailInfo?id='+subUserId;
  return (dispatch) => {
    axios.get(url).then((res) => {
      const result = res.data;
      dispatch(displayUserInfo(result));
    })
  }
}