// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [{
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

const asideMenuConfig = [{
    name: '用户管理',
    path: '/dashboard',
    icon: 'home2',
    isVisible: true,
    children: [{
      name: '下级用户',
      path: '/dashboard/primaryUser',
      isVisible: true,
    }, ],
  },
  {
    name: '权限管理',
    path: '/Authority',
    icon: 'home',
    isVisible: true,
    children: [{
        name: '权限管理',
        path: '/Authority/AuthorityManage',
        isVisible: false,
      },
      {
        name: '个人权限',
        path: '/Authority/SelfAuthorities',
        isVisible: true,
      }
    ],
  },
  {
    name: '可视化安装',
    path: '/VisInstall',
    icon: 'home',
    isVisible: true,
    children: [{
        name: '创建集群',
        path: '/VisInstall/createMV',
        isVisible: true,
      },

    ],
  },
];

export {
  headerMenuConfig,
  asideMenuConfig
};
