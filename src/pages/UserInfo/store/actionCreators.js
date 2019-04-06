import axios from 'axios';
import * as constants from './constants';

export const changeInputValue = (value) => ({
  type: constants.CHANGEINPUTVALUE,
  value
});

// const change_list = (data) => ({
//   type: constants.CHANGE_LIST,
//   data: fromJS(data),
//   totalPage: Math.ceil(data.length / 10)
// })

// export const changePage = (page) => ({
//   type: constants.CHANGE_PAGE,
//   page
// });

export const submitForm = (value) => {
  // return (dispatch) => {
  //   axios.get('/api/headerList.json').then((res) => {
  //     const data = res.data;
  //     dispatch(change_list(data.data));
  //   }).catch(() => {
  //     console.log('error');
  //   })
  // } 
  return (dispatch) => {
    // 发送 POST 请求
    axios.post('/url', {
      value: value
    })
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
  }
   
};