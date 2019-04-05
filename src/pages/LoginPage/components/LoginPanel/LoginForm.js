/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Feedback } from '@icedesign/base';
import qs from 'querystring';
import base from 'js-base64';
import AuthForm from './AuthForm';
import { store } from '../../../../store';
import {
  saveLoginUser,
} from '../../../../actions/loginUser';
import {
  loginByusername,
} from '../../../../api/login';

@withRouter
export default class LoginFrom extends Component {
  static displayName = 'LoginFrom';

  static propTypes = {};

  static defaultProps = {};

  // formChange = (value) => {
  //   console.log('formChange:', value);
  // };

  /**
   * 登录处理 - 验证用户为管理员
   * 目前固定
   * admin
   * dfsd
  */
  checkLoginState = ({
    username,
    password,
  }) => {
    return new Promise((resolve, reject) => {
      loginByusername(username, password).then(data => {
        if (data) {
          const USER = {
            username,
            password,
            timestamp: Math.floor(new Date().getTime() / 1000), // unix 时间戳
          };
          setTimeout(() => {
            store.dispatch(saveLoginUser(USER));
            sessionStorage.setItem('USER', base.Base64.encode(qs.stringify(USER))); // 加密
            // 登录成功后做对应的逻辑处理
            Feedback.toast.success('登录成功！');
            this.props.history.push('/dashboard/primaryUser');
          }, 666);
          resolve();
        } else {
          Feedback.toast.success('用户名或密码错误');
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  handleSubmit = (errors, values) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    this.checkLoginState(values);
  };

  render() {
    const config = [
      {
        label: '用户名',
        component: 'Input',
        componentProps: {
          placeholder: '用户名',
          size: 'large',
          maxLength: 20,
        },
        formBinderProps: {
          name: 'username',
          required: true,
          message: '必填',
        },
      },
      {
        label: '密码',
        component: 'Input',
        componentProps: {
          placeholder: '密码',
          htmlType: 'password',
        },
        formBinderProps: {
          name: 'password',
          required: true,
          message: '必填',
        },
      },
      {
        label: '记住账号',
        component: 'Checkbox',
        componentProps: {},
        formBinderProps: {
          name: 'checkbox',
        },
      },
      {
        label: '登录',
        component: 'Button',
        componentProps: {
          type: 'primary',
        },
        formBinderProps: {},
      },
    ];

    const initFields = {
      username: '',
      password: '',
      checkbox: false,
    };

    const links = [
      // { to: '/register', text: '立即注册' },
      { to: '/forgetpassword', text: '找回密码' },
    ];

    return (
      <AuthForm
        title="登录"
        config={config}
        initFields={initFields}
        formChange={this.formChange}
        handleSubmit={this.handleSubmit}
        links={links}
      />
    );
  }
}
