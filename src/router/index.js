import Vue from 'vue'
import VueRouter from 'vue-router'
import Account from '@/components/home/Account.vue'
import Schedule from '@/components/home/Schedule.vue'
import Project from '@/components/contractor/Project.vue'
import House from '@/components/contractor/House.vue'
import Supplier from '@/components/contractor/Supplier.vue'
import Login from '@/components/Login.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/main/project',
          name: 'Project',
          component: Project
        },
        {
          path: '/main/house',
          name: 'House',
          component: House
        },
        {
          path: '/main/supplier',
          name: 'Supplier',
          component: Supplier
        },
        {
          path: '/main/account',
          name: 'Account',
          component: Account
        },
        {
          path: '/main/schedule',
          name: 'Schedule',
          component: Schedule
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]

  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === '/login') {
    return next()
  }
  // 如果用户访问非登录路径，则判断有无登录凭证token
  const loginSession1 = window.sessionStorage.getItem('accountId')
  const loginSession2 = window.sessionStorage.getItem('contractorId')
  if (loginSession1 === null && loginSession2 === null) {
    window.alert('不好意思，你必须退出重新登录')
    next('/login')
  } else {
    return next()
  }
})

export default router
