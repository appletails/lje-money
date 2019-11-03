import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './router.config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/view/Home'),
      meta: {
        title: '恩の金库',
        index: 1
      }
    },
    {
      path: '/more',
      name: 'More',
      component: () => import('@/view/More'),
      meta: {
        title: '更多菜单',
        index: 2
      }
    },
    {
      path: '/userCard',
      name: 'UserCard',
      component: () => import('@/view/UserCard'),
      meta: {
        title: '抽卡详情',
        index: 4
      }
    },
    {
      path: '/pocket',
      name: 'Pocket',
      component: () => import('@/view/Pocket'),
      meta: {
        title: '口袋敏感词检测',
        index: 4
      }
    },
    {
      path: '/oneday',
      name: 'OneDay',
      component: () => import('@/view/OneDay'),
      meta: {
        title: '每日一语',
        index: 4
      }
    },
    {
      path: '/week',
      name: 'Week',
      component: () => import('@/view/Week'),
      meta: {
        title: '每周总结',
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
