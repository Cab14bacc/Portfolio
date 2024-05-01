<script setup>
import { Icon } from '@iconify/vue';
import { useProjectListStore } from '@/stores/ProjectList';
import { ref } from 'vue';

let projectList = useProjectListStore().projectList;
let showPrevTitle = ref(false);
let showNextTitle = ref(false);


const props = defineProps({
    ProjectIndex: {
        type: Number,
        required: true,
    } 
})

let prevProjectIndex = () => { 
    let prevIndex = props.ProjectIndex;
    prevIndex -= 1;
    prevIndex = prevIndex < 0 ? prevIndex + projectList.length : prevIndex;
    return prevIndex;
}

let nextProjectIndex = () => { 
    let nextIndex = props.ProjectIndex;
    nextIndex += 1;
    nextIndex = nextIndex >= projectList.length ? nextIndex - projectList.length : nextIndex;
    return nextIndex;
}

defineEmits(['project-intro-left', 'project-intro-right'])
</script>

<template>
    <div class="flex flex-row items-center fixed h-full">
        <button id="left" @mouseenter="showPrevTitle = true" @mouseleave="showPrevTitle = false" @click="$emit('project-intro-left')">
            <Icon icon="ant-design:left-outlined" class="h-8 w-8"/>
        </button>
        <label for="left" class="text-sm font-bold tracking-tighter text-black" 
        :class="{ invisible: !showPrevTitle, visible: showPrevTitle, 'bg-white': showPrevTitle, 'border-2': showPrevTitle, 'border-black': showPrevTitle}">
            {{ projectList[prevProjectIndex()].title }}
        </label>
    </div>
    <div class="flex flex-row items-center fixed h-full right-0"  @click="$emit('project-intro-right')">
        <label class="text-sm font-bold tracking-tighter text-black" 
        :class="{ invisible: !showNextTitle, visible: showNextTitle, 'bg-white': showNextTitle, 'border-2': showNextTitle, 'border-black': showNextTitle }">
            {{ projectList[nextProjectIndex()].title }}
        </label>
        <button id="right" @mouseenter="showNextTitle = true" @mouseleave="showNextTitle = false">
            <Icon icon="ant-design:right-outlined" class="h-8 w-8"/>
        </button>
    </div>
</template>

<style lang="scss" scoped>

</style>