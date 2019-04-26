import * as constants from './constants';
import axios from 'axios';

const displayUserInfo = (data) => ({
  type: constants.SETSUBUSERINFO,
  data
})

export const getUserDetail = () => {
  var subUserId = parseInt(localStorage.getItem('subUserId'));
  var url = 'http://192.168.0.216:8080/user/getUserDetailInfo?id='+subUserId;
  return (dispatch) => {
    axios.get(url).then((res) => {
      const result = res.data;
      dispatch(displayUserInfo(result));
    })
  }
}