// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import { getRouterData } from './utils/formatter';
import { asideMenuConfig } from './menuConfig';
import Dashboard from './pages/Dashboard';
import LoginPanel from './pages/LoginPage/components/LoginPanel';
import MainLayout from './layouts/BasicLayout/MainLayout';
import UserInfo from './pages/UserInfo';
import NormalLayout from './layouts/BasicLayout/NormalLayout';

const routerConfig = [
  {
    path: '/dashboard/primaryUser',
    layout: NormalLayout,
    component: Dashboard,
  },
  {
    path: '/dashboard/secondaryUser',
    layout: NormalLayout,
    component: Dashboard,
  },
  {
    path: '/login',
    layout: MainLayout,
    component: LoginPanel,
  },
  {
    path: '/userInfo',
    layout: NormalLayout,
    component: UserInfo,
  },
];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
