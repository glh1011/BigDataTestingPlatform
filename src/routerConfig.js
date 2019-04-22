// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import {
  getRouterData
} from './utils/formatter';
import {
  asideMenuConfig
} from './menuConfig';
import Dashboard from './pages/Dashboard';
import LoginPanel from './pages/LoginPage/components/LoginPanel';
import MainLayout from './layouts/BasicLayout/MainLayout';
import UserInfo from './pages/UserInfo';
import AuthorityManage from './pages/AuthorityManage';

import SelfAuthorities from './pages/SelfAuthorities';
import AddAuthority from './pages/AddAuthority';
import EditAuthority from './pages/EditAuthority';
import AddSubUser from './pages/AddSubUser';
import SubUserDetail from './pages/SubUserDetail';
import ChangeSelfPwd from './pages/ChangeSelfPwd';

import EditSubUser from './pages/EditSubUser';
import ChangeSubUserPwd from './pages/ChangeSubUserPwd';
import NormalLayout from './layouts/BasicLayout/NormalLayout';
import VisInstall from './pages/VisInstall';
import EditSubUserPermission from './pages/EditSubUserPermission';

const routerConfig = [{
    path: '/Authority/EditAuthority',
    layout: NormalLayout,
    component: EditAuthority,
  },
  {
    path: '/dashboard/primaryUser',
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
  {
    path: '/Authority/AuthorityManage',
    layout: NormalLayout,
    component: AuthorityManage,
  },
  {
    path: '/dashboard/secondaryUser',
    layout: NormalLayout,
    component: Dashboard,
  },
  {
    path: '/Authority/SelfAuthorities',
    layout: NormalLayout,
    component: SelfAuthorities,
  },
  {
    path: '/Authority/AddAuthority',
    layout: NormalLayout,
    component: AddAuthority,
  },
  {
    path: '/AddSubUser',
    layout: NormalLayout,
    component: AddSubUser,
  },
  {
    path: '/SubUserDetail',
    layout: NormalLayout,
    component: SubUserDetail,
  },
  {
    path: '/ChangeSelfPwd',
    layout: NormalLayout,
    component: ChangeSelfPwd,
  },
  {
    path: '/EditSubUser',
    layout: NormalLayout,
    component: EditSubUser,
  },
  {
    path: '/ChangeSubUserPwd',
    layout: NormalLayout,
    component: ChangeSubUserPwd,
  },
  {
    path: '/EditSubUserPermission',
    layout: NormalLayout,
    component: EditSubUserPermission,
  },
  {
    path: '/VisInstall/createMV',
    layout: NormalLayout,
    component: VisInstall,
  },
];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export {
  routerData
};
