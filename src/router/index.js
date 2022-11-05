import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views//Home.vue'
import Jump from '../views//Jump.vue'
import Jump1 from '../views//Jump1.vue'
import Page from '../views/login/Page.vue'
import Login from '../views/login/Login.vue'
import Enroll from '../views/login/Enroll.vue'
import Content from '../views/content/Content.vue'
import Classify from '../views/content/Classify.vue'
import Detail from '../views/content/Detail.vue'
import Image from '../views/file/Image.vue'
import Edit from '../views/content/Edit.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home,
    children: [{
      path: '/',
      name: '内容',
      component: Content
    },
    {
      path: '/detail',
      name: '详情',
      component: Detail
    },
    {
      path: '/classify',
      name: '分类',
      component: Classify
    },
    {
      path: '/image',
      name: '图片',
      component: Image  },
    ]
  }, {
    path: '/edit',
    name: '编写',
    component: Edit
  },
  {
    path: '/',
    component: Page,
    children: [{
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/enroll',
      name: '注册',
      component: Enroll
    },
  ]
  },
  {
    path: '/jump',
    name: '编写',
    component: Jump
  },
  {
    path: '/jump1',
    name: '编写1',
    component: Jump1
  },


]

const router = new VueRouter({
  routes
})

export default router
