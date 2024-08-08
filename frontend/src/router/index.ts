import { createRouter, createWebHistory } from 'vue-router'
import Top from '../views/Top.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import WhoAmI from '../views/WhoAmI.vue'
import Timeline from '../views/Timeline.vue'
import ProfileSetting from '../views/ProfileSetting.vue'
import Post from '../views/Post.vue'
import User from '../views/User.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Top
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signup/',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login/',
      name: 'login',
      component: Login
    },
    {
      path: '/who/',
      name: 'who',
      component: WhoAmI
    },
    {
      path: '/timeline/',
      name: 'timeline',
      component: Timeline
    },
    {
      path: '/profile-setting/',
      name: 'profile-setting',
      component: ProfileSetting
    },
    {
      path: '/@:username/post/:postid/',
      name: 'post',
      component: Post
    },
    {
      path: '/@:acct/',
      name: 'user',
      component: User
    }
  ]
})

export default router
