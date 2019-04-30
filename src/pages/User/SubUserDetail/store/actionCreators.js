import * as constants from './constants';
import axios from '../../../../utils/newRequest';

const displayUserInfo = (data) => ({
  type: constants.SETSUBUSERINFO,
  data
})

export const getUserDetail = () => {
  var subUserId = parseInt(localStorage.getItem('subUserId'));
  var url = '/user/getUserDetailInfo?id='+subUserId;
  return (dispatch) => {
    axios.get(url).then((res) => {
      const result = res;
      dispatch(displayUserInfo(result));
    })
  }
}