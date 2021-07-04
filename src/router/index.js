import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '主页',
    },
  },
  {
    path: '/book_lists',
    name: 'booklists',
    component: () =>
      import(/* webpackChunkName: "page" */ '../components/BookLists.vue'),
    meta: {
      title: '图书列表',
    },
  },
  {
    path: '/detail/:bookId',
    name: 'detail',
    component: () =>
      import(/* webpackChunkName: "page" */ '../components/Detail.vue'),
    meta: {
      title: '图书详情',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../components/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '../components/Register.vue'),
    meta: {
      title: '注册',
    },
  },
  {
    path: '/my_work',
    name: 'mywork',
    component: () =>
      import(/* webpackChunkName: "MyWork" */ '../components/MyWork.vue'),
    meta: {
      title: '工作台',
    },
  },
  {
    path: '/person',
    name: 'person',
    // redirect: '/person/mybook',
    component: () =>
      import(/* webpackChunkName: "Person" */ '../components/Person.vue'),
    meta: {
      title: '个人中心',
      isLogin: false
    },
    children: [
      {
        path: 'personnal',
        name: 'personnal',
        component: () =>
          import(/* webpackChunkName: "Personnal" */ '../views/Personnal.vue'),
        meta: {
          title: '个人中心',
        },
      },
      {
        path: 'mybook',
        name: 'mybook',
        component: () =>
          import(/* webpackChunkName: "MyBook" */ '../views/MyBook.vue'),
        meta: {
          title: '个人中心',
        },
      },
      {
        path: 'changePwd',
        name: 'changePwd',
        component: () =>
          import(/* webpackChunkName: "ChangePwd" */ '../views/ChangePwd.vue'),
        meta: {
          title: '个人中心',
        },
      },
    //   {
    //     path: 'setting',
    //     name: 'setting',
    //     component: () =>
    //       import(/* webpackChunkName: "ChangePwd" */ '../views/ChangePwd.vue'),
    //     meta: {
    //       title: '个人中心',
    //     },
    //   },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/static',
  routes,
})

// router.beforeEach((to, from, next) => {
//   if(to.path.includes('person') && localStorage.getItem('username')){
//     next();
//     return;
//   }else if(to.path.includes('person') && !localStorage.getItem('username')){
//     next('/login')
//     return;
//   }
//   next()
// })
export default router
