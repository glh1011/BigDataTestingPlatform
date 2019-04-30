import React from 'react';
import ReactDOM from 'react-dom';

import { ConfigProvider } from '@alifd/next';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import ErrorCheck from './error';
import { store, history } from './store';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';

import router from './router';

// import configureStore from './configureStore';

// Create hashHistory
// const history = createHashHistory();

// Create redux store with history
// const initialState = {};

// Configure Store
// const store = configureStore(initialState, history);

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

/**
 * error 检测
 */
ReactDOM.render(
  <ConfigProvider prefix="nextfd-">
    <Provider store={store}>
    <ConnectedRouter history={history}>
      <ErrorCheck>
        {router()}
      </ErrorCheck>
    </ConnectedRouter>
  </Provider>
  </ConfigProvider>,

  ICE_CONTAINER
);

