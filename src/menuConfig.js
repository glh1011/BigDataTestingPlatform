// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
const headerMenuConfig = [

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
        name: '系统权限',
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
    zeroVisible: false,
    firstVisible: true,
    secondVisible: false,
    children: [{
        name: '创建集群',
        path: '/VisInstall/createMV',
        zeroVisible: false,
        firstVisible: true,
        secondVisible: false,
      },

    ],
  },
  {
    name: '日志管理',
    path: '/Log',
    icon: 'message',
    zeroVisible: true,
    firstVisible: true,
    secondVisible: true,
    children: [
      {
        name: '平台日志',
        path: '/Log/PlatformLog',
        zeroVisible: true,
        firstVisible: true,
        secondVisible: true,
      },
    ],
  },
  {
    name: '上传文件',
    path: '/Upload',
    icon: 'angle-up',
    zeroVisible: true,
    firstVisible: true,
    secondVisible: true,
    children: [
      {
        name: '上传文件',
        path: '/Upload/UploadFile',
        zeroVisible: true,
        firstVisible: true,
        secondVisible: true,
      },
    ],
  },
  {
    name: 'WebSSH',
    path: '/WebSSH',
    icon: 'angle-up',
    zeroVisible: true,
    firstVisible: true,
    secondVisible: true,
    children: [
      {
        name: 'WebSSH',
        path: '/WebSSH',
        zeroVisible: true,
        firstVisible: true,
        secondVisible: true,
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
