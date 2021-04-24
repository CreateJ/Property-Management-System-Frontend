/*
 * 属性介绍
 * path: 路由
 * component: 组件所在的文件目录
 * routes: 子组件
 * name: 菜单名
 * authority: 权限
 * icon: 图标
 */
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/data/analysis',
              },
              {
                path: '/data',
                name: 'data',
                icon: 'AreaChartOutlined',
                routes: [
                  {
                    path: '/data/analysis',
                    name: 'analysis',
                    component: './DataPanel/Analysis',
                  },
                  {
                    path: '/data/analysis_mock',
                    name: 'analysis_mock',
                    component: './DataPanel/Analysis/index_mock',
                  },
                  {
                    path: '/data/feedback',
                    name: 'feedback',
                    component: './DataPanel/Feedback',
                  },
                ],
              },
              {
                path: '/basic',
                name: 'basic',
                icon: 'AppstoreAddOutlined',
                authority: ['admin', 'user'],
                routes: [
                  {
                    path: '/basic/households',
                    name: 'households',
                    component: './BasicManagement/HouseholdsManagement',
                  },
                  {
                    path: '/basic/residential',
                    name: 'residential',
                    component: './BasicManagement/ResidentialManagement',
                  },
                ],
              },
              {
                path: '/senior',
                name: 'senior',
                icon: 'crown',
                authority: ['admin'],
                component: './SeniorManagement/EmployeeManagement',
                routes: [
                  {
                    path: '/senior/employee',
                    name: 'employee',
                    component: './SeniorManagement/EmployeeManagement',
                  },
                ],
              },
              {
                path: '/order',
                name: 'order',
                icon: 'CarryOutOutlined',
                component: './OrderManagement',
              },
              {
                path: '/account',
                name: 'personal',
                icon: 'ContactsOutlined',
                routes: [
                  {
                    path: '/',
                    redirect: '/account/settings',
                  },
                  {
                    name: 'settings',
                    icon: 'smile',
                    path: '/account/settings',
                    component: './account/settings',
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
