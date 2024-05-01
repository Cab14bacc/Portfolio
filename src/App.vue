<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { nextPageDirection } from '@/router/index' 
import NavBar from './components/NavBar.vue'
import UniversalFooter from './components/UniversalFooter.vue'
import 'animate.css';

</script>

<template>
  <NavBar></NavBar>
  <Transition name="fade">
    <img v-show="$route.meta.orderX == 0" src="@/assets/welcome_background3.webp" class="h-full w-full object-cover fixed top-0 left-0 z-[-1] opacity-55">
  </Transition>
  <div class="router-view" >
    <RouterView v-slot="{Component}">
      <Transition 
      :enter-active-class="nextPageDirection === 'left' ? 'animate__animated animate__fadeInLeft animate__fast h-[inherit]' : 'animate__animated animate__fadeInRight animate__fast h-[inherit]'"
      :leave-active-class="nextPageDirection === 'left' ? 'animate__animated animate__fadeOutRight absolute animate__fast' : 'animate__animated animate__fadeOutLeft absolute animate__fast'">
        <component  :is="Component"/>
      </Transition>
    </RouterView>
  </div>
  <UniversalFooter></UniversalFooter>

</template>

<style scoped>


.router-view {
  padding: 0;
  padding-top: var(--navbar-height);
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;

}
.fade-enter-active{
  transition-delay: 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
