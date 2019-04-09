import axios from 'axios';
import * as constants from './constants';

const changeSubUserList = (subUsers) => ({
  type: constants.CHANGESUBUSERLIST,
  //current,
  subUsers
})

export const getSubUserList = () => {
  var pageNum = 1;
  var userId = parseInt(localStorage.getItem('userId'));
  var pageSize = 10;
  var url = 'http://192.168.0.216:8080/user/getSubUsers?userId='+userId+"&pageNum="+pageNum+"&pageSize="+pageSize;
  return (dispatch) => {
    axios.get(url).then((res) => {
      console.log(res.data);
      //const current = res.data.data.current;
      const subUsers = res.data.data;
      //console.log(current);
      //console.log(subUsers);
      //dispatch(changeSubUserList(current, subUsers));
      dispatch(changeSubUserList(subUsers));
    })
  }
}