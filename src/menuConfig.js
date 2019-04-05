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
    name: '权限管理',
    path: '/dashboard',
    icon: 'home2',
    children: [
      {
        name: '一级用户',
        path: '/dashboard/primaryUser',
      },
      {
        name: '二级用户',
        path: '/dashboard/secondaryUser',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
