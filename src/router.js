/* global Vue */
import Router from 'vue-router'
import detail from '@/components/detail.vue'
import list from '@/components/list.vue'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/detail',
      component: detail
    },
    {
      path: '/',
      component: list
    }
  ]
})
