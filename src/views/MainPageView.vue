<script setup>
import ProjectsSection from '@/components/MainPageComponents/ProjectsSection.vue';
import WelcomeSection from '@/components/MainPageComponents/WelcomeSection.vue';
import ContactSection from '@/components/MainPageComponents/ContactSection.vue';
import { onMounted } from 'vue';

onMounted(()=> {
    window.scroll({top: 0, behavior: 'smooth'});
})
</script>


<template>
    <div class="w-full">
        <WelcomeSection></WelcomeSection>
        <ProjectsSection></ProjectsSection>
        <ContactSection></ContactSection>
    </div>
</template>


<style lang="scss" scoped>

</style>