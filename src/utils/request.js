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
import getUserIP from './getIp'

const service = axios.create({
  //baseURL: 'http://192.168.0.129:8080', // 请求地址
  timeout: 10000, // 请求超时限制
});

getUserIP((ip)=>{
  localStorage.setItem('clientIp', ip);
});

// 请求处理
service.interceptors.request.use(config => {
  config.headers['X-Real-IP'] = localStorage.getItem('clientIp');
  if (config.method === 'post') {
    //config.data = JSON.stringify({ ...config.data });
    //config.params = qs.stringify({ ...config.params });
    if (config.headers) {
      // config.data = JSON.stringify({ ...config.data });
      //config.headers['Content-Type'] = config.header['Content-Type'];
    } else {
      //config.data = JSON.stringify({ ...config.data });
      //config.params = qs.stringify({ ...config.params });
    }
  } else {
    config.params = { ...config.params };
  }
  return config;
}, error => {
  // 错误处理
  Feedback.toast.error(error);
  Promise.reject(error);
});

// 响应处理
service.interceptors.response.use(res => {
  Feedback.toast.hide();
  // 处理接口返回数据
  if (res.status === 200) {
    if (res.data.meta.code === '403'){
      //console.log(res.data.meta.code);
      window.location.href = '/#/NotPermission';
    }
    else{
      //更新token
      updateAuthState();
      return res;
    }//
  }
  else if (res.status === 504){
    //Feedback.toast.error('数据获取错误！请刷新页面');
  }
  else if ( res.status === 401 ) {
    window.location.href = '/#/NotLogin';
  }

}, error => {
  console.log(error);
  if(error){
    if(error.response){
      if(error.response.status === 401) {
        Feedback.toast.error(error.response.data.data);
      }
    } else {
      Feedback.toast.error("登录失败");
    }
  } else {
    Feedback.toast.error("登录失败");
  }

  // console.log(error);
  // // 错误处理
  // Feedback.toast.error(error, `请求发生错误-${JSON.stringify(error)}`);
  // Promise.reject(error);
});

export default service;
