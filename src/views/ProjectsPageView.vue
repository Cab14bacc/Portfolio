<script setup>
import ProjectsSearchbar from '@/components/ProjectsPageComponents/ProjectsSearchBar.vue';
import ProjectsPanel from '@/components/ProjectsPageComponents/ProjectsPanel.vue'
import { onMounted, ref } from 'vue';

let searchFilter = ref([]);
const updateProjectsPanel = (filterList) => {
    searchFilter.value = filterList;
}

onMounted(()=> {
    window.scroll({top: 0, behavior: 'smooth'});
})
</script>



<template>
    <div class="pt-10 w-full min-h-[100vh]">
        <ProjectsSearchbar @search-update="updateProjectsPanel"></ProjectsSearchbar>
        <ProjectsPanel :filterList="searchFilter"></ProjectsPanel>
    </div>
</template>

<style lang="scss" scoped></style>