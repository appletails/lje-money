import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './router.config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "*",
      redirect: '/404'
    },
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "Home" */ '@/view/Home'),
      meta: {
        title: '恩の金库',
        index: 1
      }
    },
    {
      path: '/more',
      name: 'More',
      component: () => import(/* webpackChunkName: "More" */ '@/view/More'),
      meta: {
        title: '更多菜单',
        index: 2
      }
    },
    {
      path: '/userCard',
      name: 'UserCard',
      component: () => import(/* webpackChunkName: "UserCard" */ '@/view/UserCard'),
      meta: {
        title: '抽卡详情',
        index: 4
      }
    },
    {
      path: '/pocket',
      name: 'Pocket',
      component: () => import(/* webpackChunkName: "Pocket" */ '@/view/Pocket'),
      meta: {
        title: '口袋敏感词检测',
        index: 4
      }
    },
    {
      path: '/oneday',
      name: 'OneDay',
      component: () => import(/* webpackChunkName: "OneDay" */ '@/view/OneDay'),
      meta: {
        title: '每日一语',
        index: 4
      }
    },
    {
      path: '/week',
      name: 'Week',
      component: () => import(/* webpackChunkName: "Week" */ '@/view/Week'),
      meta: {
        title: '每周总结',
        index: 5,
        head:false,
        foot: false
      }
    },
    {
      path: '/allIdol',
      name: 'allIdol',
      component: () => import(/* webpackChunkName: "Year" */ '@/view/allIdols'),
      meta: {
        title: '全部可查成员',
        index: 5,
        head: false,
        foot: false
      }
    },
    {
      path: '/year',
      name: 'Year',
      component: () => import(/* webpackChunkName: "Year" */ '@/components/Year'),
      meta: {
        title: '年总结',
        index: 5,
        head:false,
        foot: false
      }
    },
    {
      path: '/full',
      name: 'Full',
      component: () => import(/* webpackChunkName: "Year" */ '@/components/Year/full'),
      meta: {
        title: '年总结重置版',
        index: 5,
        head:false,
        foot: false
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/view/404'),
      meta: {
        title: '404',
        index: 5,
        head:false,
        foot: false
      }
    },
    ...routerConfig.map(item => {
      item.component = () => import(`@/view/${item.name}`)
      return item
    })
  ]
})
