
export const routes = [
  {
    path: '/',
    name: 'AppLayout',
    component: () => import('@/components/AppLayout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'fa-solid fa-chart-area'
        }
      },
      {
        path: 'staticData',
        name: 'staticData',
        component: () => import('@/views/staticData/index.vue'),
        meta: {
          title: '静态数据中心',
          icon: 'fa-solid fa-globe'
        },
        children: [
          {
            path: 'purchasingDataCenter',
            name: 'purchasingDataCenter',
            component: () => import('@/views/staticData/purchasingDataCenter/index.vue'),
            meta: {
              title: '购买静态数据中心'
            }
          },
          {
            path: 'purchasedDetails',
            name: 'purchasedDetails',
            component: () => import('@/views/staticData/purchasedDetails/index.vue'),
            meta: {
              title: '已购线路明细'
            }
          }
        ]
      },
      {
        path: 'staticDwelling',
        name: 'staticDwelling',
        component: () => import('@/views/staticDwelling/index.vue'),
        meta: {
          title: '静态住宅',
          icon: 'fa-solid fa-laptop'
        },
        children: [
          {
            path: 'purchasingDwelling',
            name: 'purchasingDwelling',
            component: () => import('@/views/staticDwelling/purchasingDwelling/index.vue'),
            meta: {
              title: '购买静态住宅'
            }
          },
          {
            path: 'purchasedDetails',
            name: 'purchasedDetails',
            component: () => import('@/views/staticDwelling/purchasedDetails/index.vue'),
            meta: {
              title: '已购线路明细'
            }
          }
        ]
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/order/index.vue'),
        meta: {
          title: '我的订单',
          icon: 'fa-solid fa-list-alt'
        }
      },
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/config/index.vue'),
        meta: {
          title: '系统管理',
          icon: 'fa-solid fa-cog'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index.vue'),
    meta: {
      title: '注册'
    }
  }
]
