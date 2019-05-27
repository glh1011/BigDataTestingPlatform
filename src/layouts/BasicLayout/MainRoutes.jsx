import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import NotFound from '../../components/NotFound';
import { asideMenuConfig } from '../../menuConfig';
import { routerData } from '../../routerConfig';
import LoginPanel from '../../pages/LoginPage/components/LoginPanel';
import { checkAuthState } from '../../utils/checkStore';

class MainRoutes extends Component {
  static displayName = 'MainRoutes';

  /**
   * 根据菜单取得重定向地址.
   */
  getRedirectData = () => {
    const redirectData = [];
    const getRedirect = (item) => {
      if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
          redirectData.push({
            from: `${item.path}`,
            to: `${item.children[0].path}`,
          });
          item.children.forEach((children) => {
            getRedirect(children);
          });
        }
      }
    };

    asideMenuConfig.forEach(getRedirect);

    return redirectData;
  };

  /**
   * 渲染路由组件
   */
  renderNormalRoute = (item, index) => {
    const Layout = item.layout;
    // 如果管理员已经登录
    // console.log(checkAuthState().isAuth);
    if (checkAuthState().isAuth) {
      // 登录过
      return item.component ? (
        <Route
          key={index}
          path={item.path}
          // component={item.component}
          render={
            () => (<Layout cp={item.component} />)
          }
          exact={item.exact}
        />
      ) : null;
    }
    else{
      return <Route key={index} path="/" component={LoginPanel} />;
    }
    
    
  };

  render() {
    const redirectData = this.getRedirectData();
    return (
      <Switch>
        {/* 渲染权限路由表 */}

        {routerData.map(this.renderNormalRoute)}

        {/* 路由重定向，嵌套路由默认重定向到当前菜单的第一个路由 */}
        {redirectData.map((item, index) => {
          return <Redirect key={index} exact from={item.from} to={item.to} />;
        })}

        {/* 首页默认重定向到 /dashboard */}
        {/* <Redirect exact from="/" to="/dashboard/primaryUser" /> */}
        {/* 首页默认重定向到 /login */}
        <Redirect exact from="/" to="/login" />

        {/* 未匹配到的路由重定向到 404 */}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default MainRoutes;
