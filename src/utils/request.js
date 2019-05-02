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
  baseURL: 'http://192.168.0.129:8080', // 请求地址
  timeout: 5000, // 请求超时限制
});

// 请求处理
service.interceptors.request.use(config => {
  Feedback.toast.loading('加载中...');
  if (config.method === 'post') {
    if (config.header) {
      config.data = JSON.stringify({ ...config.data });
      config.headers['Content-Type'] = config.header['Content-Type'];
    } else {
      config.data = qs.stringify({ ...config.data });
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
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
    updateAuthState();
    return res.data;
  } else {
    Feedback.toast.error('数据获取错误！请刷新页面');
  }

}, error => {
  // 错误处理
  Feedback.toast.error(error, `请求发生错误-${JSON.stringify(error)}`);
  Promise.reject(error);
});

export default service;
