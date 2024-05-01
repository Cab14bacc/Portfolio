import MainPageView from '@/views/MainPageView.vue'
import ProjectsPageView from '@/views/ProjectsPageView.vue'
import AboutView from '@/views/AboutView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'
import ProjectIntroductionView from '@/views/ProjectIntroductionView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MainPageView,
      meta: { orderX: 0, orderY: 0}
    },
    {
      path: '/About',
      name: 'About',
      component: AboutView,
      meta: { orderX: 1, orderY: 0}
    },    
    {
      path: '/Projects',  
      name: 'Projects',
      component: ProjectsPageView,
      meta: { orderX: 2, orderY: 0}
    },
    {
      path: '/Projects/:fileName', 
      name: 'ProjectsIntroduction',
      component: ProjectIntroductionView,
      meta: { orderX: 3}
    }
   
  ]
  
})

export const nextPageDirection = ref('');


router.beforeEach((to, from, next) => {
  // Determine the direction of the slide based on the current and next routes
  if (to.meta.orderX < from.meta.orderX) {
    nextPageDirection.value = 'left'
  } else {
    nextPageDirection.value = 'right'
  }


  next()
})

export default router
