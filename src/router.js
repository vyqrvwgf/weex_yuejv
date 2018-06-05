/* global Vue */
import Router from 'vue-router'
import Detail from '@/components/detail.vue'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
