import { Switch, Route } from 'react-router-dom';
import React from 'react';
import MainRoutes from './layouts/BasicLayout/MainRoutes';

// 按照 Layout 归类分组可以按照如下方式组织路由
const router = () => {
  return (
    <Switch>
      <Route path="/" component={MainRoutes} />
    </Switch>
  );
};

export default router;
