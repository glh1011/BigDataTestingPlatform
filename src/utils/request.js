/**
 *
 * axios 拦截适配数据源
 * @author: henryhe
 * @date: 2019-01-15
 *
 */
import axios from 'axios';
import qs from 'querystring';
import { Feedback } from '@icedesign/base';
import { updateAuthState } from './checkStore';

const service = axios.create({
  //baseURL: 'http://192.168.0.129:8080', // 请求地址
  timeout: 10000, // 请求超时限制
});

// 请求处理
service.interceptors.request.use(config => {
  
  console.log('before', config);
  if (config.method === 'post') {
    // if (config.header) {
    //   config.data = JSON.stringify({ ...config.data });
    //   config.headers['Content-Type'] = config.header['Content-Type'];
    // } else {
    //   config.data = qs.stringify({ ...config.data });
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // }
  } 
  else {
    config.params = { ...config.params };
  }
  console.log('after', config);
  return config;
}, error => {
  // 错误处理
  Feedback.toast.error(error);
  Promise.reject(error);
});

// 响应处理
service.interceptors.response.use(res => {
  Feedback.toast.hide();
  console.log(res);
  // 处理接口返回数据
  if (res.status === 200) {
    if (res.data.meta.code === '403'){
      Feedback.toast.error(res.data.meta.message);
    }
    else{
      updateAuthState();
      return res;
    }
  } else if (res.status === 504){
    //Feedback.toast.error('数据获取错误！请刷新页面');
  }

}, error => {
  console.log(error);
  // 错误处理
  Feedback.toast.error(error, `请求发生错误-${JSON.stringify(error)}`);
  Promise.reject(error);
});

export default service;
