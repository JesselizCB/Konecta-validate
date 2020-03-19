import Vue from 'vue'
import Router from 'vue-router'
// import { mapGetters } from "vuex";
import firebase from 'firebase/app'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "home" */ '../components/Login.vue')
    },
    {
      
      path: '/home',
      name: 'Consulta de colaboradores',
      component: () => import('../components/Home.vue'),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/postulantes',
      name: 'Consulta de postulantes',
      component: () => import('../components/postulantes.vue'),
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
    
    {
      path: '/registro',
      name: 'Registro de invitados',
      component: () => import('../components/registroInvitados.vue'),
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../components/HelloWorld.vue')
    }
    
  ]
})

// const routes = [
//   {
//     path: '/',
//     name: 'login',
//     component: () => import(/* webpackChunkName: "home" */ '../components/Login.vue')
//   },
//   {
//     path: '/home',
//     name: 'home',
//     component: () => import('../components/Home.vue'),
//     beforeEnter: (to, from, next) => {
//       if (!firebase.auth().currentUser) {
//         next('/')
//       } else {
//         next()
//       }
//     },
//   },
//   {
//     path: '/about',
//     name: 'about',
//     component: () => import(/* webpackChunkName: "about" */ '../components/HelloWorld.vue')
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// export default router