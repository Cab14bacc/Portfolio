<script setup>
import MarkdownDocument from '@/components/MarkdownDocument.vue';
import ProjectIntroductionNavBar from '@/components/ProjectIntroductionComponents/ProjectIntroductionNavBar.vue';
import { useProjectListStore } from '@/stores/ProjectList';
import { computed, ref } from 'vue';
import { useRoute, useRouter} from 'vue-router';
import { onUpdated,onMounted} from 'vue';

onUpdated(() => {
    window.scrollTo({top: 0,  behavior: 'smooth'})
});
onMounted(() => {
    window.scrollTo({top: 0,  behavior: 'smooth'})
});

const projectList = useProjectListStore().projectList;
const route = useRoute();
const router = useRouter();
let projectIndex = computed(() => (Number(route.params.fileName.split('_')[0]) - 1));

let fileName = computed(() => (route.params.fileName + '.md'));
let moveDirection = ref("");
const moveToLeftProject = () => {
    let tempIndex =  projectIndex.value;
    tempIndex -= 1;
    tempIndex = tempIndex < 0 ? tempIndex + projectList.length : tempIndex;
    moveDirection = 'left';
    router.push(projectList[tempIndex].link);
}

const moveToRightProject = () => {
    let tempIndex =  projectIndex.value;
    tempIndex += 1;
    tempIndex = tempIndex >= projectList.length ? tempIndex - projectList.length : tempIndex;
    moveDirection = 'right';
    router.push(projectList[tempIndex].link);
}

</script>

<template>
    <div>
        <ProjectIntroductionNavBar :ProjectIndex="projectIndex" @project-intro-left="moveToLeftProject()" @project-intro-right="moveToRightProject()" ></ProjectIntroductionNavBar>
        <div class=" h-full min-w-[300px] min-h-[100vh] p-10 w-full">
                <Transition       
                :enter-active-class="moveDirection === 'left' ? 'animate__animated animate__fadeInUp animate__fast' : 'animate__animated animate__fadeInDown animate__fast'"
                :leave-active-class="moveDirection === 'left' ? 'animate__animated animate__fadeOutUpBig absolute animate__fast' : 'animate__animated animate__fadeOutDownBig absolute animate__fast'">

                    <MarkdownDocument :fileName="fileName" :key="fileName"></MarkdownDocument>
                </Transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;
 
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  }
</style>