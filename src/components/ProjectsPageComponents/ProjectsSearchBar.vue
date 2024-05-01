<script setup>
import { useProjectListStore } from '@/stores/ProjectList';
import { Icon } from '@iconify/vue';
import { reactive } from 'vue'
import ProjectsSearchTag from '@/components/ProjectsPageComponents/ProjectsSearchTag.vue';

let tagsList = reactive(useProjectListStore().tags);
let filterList = reactive(Array(tagsList.length + 1));
filterList = filterList.fill('');
defineEmits(["search-update"]);
</script>


<template>
    <div class="h-30 w-full
    flex flex-col justify-evenly items-center gap-5 ">
        <div class="flex flex-row justify-start items-center px-2 rounded-full
        border-solid  border-t-[1px]  border-b-4 h-12 w-3/5 min-w-fit shadow-lb-sm">
            <label for="projects-search" class="mr-2 cursor-pointer">   
                <Icon icon="line-md:search" class="w-7 h-7" />
            </label>
            <input type="text" id="projects-search" v-model="filterList[0]" @input="$emit('search-update',filterList)"
                class="border-0 focus:outline-none bg-transparent w-full">
        </div>
        <div class=" w-4/5 min-w-[350px] px-4 flex flex-row justify-center gap-5 gap-y-2 flex-wrap">
            <ProjectsSearchTag v-for="(tag,index) in tagsList" :name="tag" @tag-update="(value) => {filterList[index + 1] = value; $emit('search-update',filterList);}"></ProjectsSearchTag>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>