// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
const headerMenuConfig = [
  {
    name: 'git仓库',
    path: 'http://www.dfsdedu.cn/teacher',
    external: true,
    newWindow: true,
    icon: 'link',
  },
  {
    name: 'ui库',
    path: 'http://www.dfsdedu.cn/#/teacher',
    external: true,
    newWindow: true,
    icon: 'link',
  },
];

const asideMenuConfig = [
  {
    name: '用户管理',
    path: '/userManagement',
    icon: 'home2',
    zeroVisible: true,
    firstVisible: true,
    secondVisible: true,
    children: [
      {
        name: '下级用户',
        path: '/userManagement/dashboard',
        zeroVisible: true,
        firstVisible: true,
        secondVisible: false,
      },
    ],
  },
  {
    name: '权限管理',
    path: '/permissionManagement',
    icon: 'home',
    zeroVisible: true,
    firstVisible: true,
    secondVisible: true,
    children: [
      {
        name: '权限管理',
        path: '/permissionManagement/allPermissions',
        zeroVisible: true,
        firstVisible: false,
        secondVisible: false,
      },
      {
        name: '个人权限',
        path: '/permissionManagement/selfPermissions',
        zeroVisible: true,
        firstVisible: true,
        secondVisible: true,
      },
    ],
  },
  {
    name: '资源管理',
    path: '/Resource',
    icon: 'home',
    zeroVisible: true,
    firstVisible: true,
    secondVisible: true,
    children: [
      {
        name: '资源池管理',
        path: '/Resource/ResourcePoolShow',
        zeroVisible: true,
        firstVisible: false,
        secondVisible: false,
      },
      {
        name: '一级资源管理',
        path: '/Resource/FirstLevelResourceShow',
        zeroVisible: false,
        firstVisible: true,
        secondVisible: false,
      },
      {
        name: '集群资源管理',
        path: '/Resource/ClusterResourceManage',
        zeroVisible: false,
        firstVisible: false,
        secondVisible: true,
      },
    ],
  },
  {
    name: '可视化安装',
    path: '/VisInstall',
    icon: 'home',
    zeroVisible: true,
        firstVisible: true,
        secondVisible: true,
    children: [{
        name: '创建集群',
        path: '/VisInstall/createMV',
        zeroVisible: true,
        firstVisible: true,
        secondVisible: true,
      },

    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
