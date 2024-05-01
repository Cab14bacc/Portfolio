<script setup>
import { RouterLink } from 'vue-router';
import { useProjectListStore } from '@/stores/ProjectList';
import { Icon } from '@iconify/vue'
import { onUnmounted, reactive, ref} from 'vue';
import ProjectTile from '@/components/ProjectTile.vue'

const ProjectsListStore = useProjectListStore();
let ProjectList = reactive(ProjectsListStore.projectList.map((Project, index) => ({
    title: Project.title,
    description: Project.description,
    image: Project.image,
    id: Project.id,
    link: Project.link,
    ifActive: false
})));

let numOfProjectTiles = ref(0);
let firstActiveProjectTile = ref(0);
let activeListPosition = ref([]);
let lastClicked = ref(null);
let projectCarouselTransitionName = ref("");

const carouselPadding = 96;

const calcNumOfProjectTiles = () => {
    let windowWidth = window.innerWidth;
    numOfProjectTiles.value = Math.min(ProjectList.length,Math.max(Math.floor((windowWidth - carouselPadding )/ 290), 1));
    return numOfProjectTiles.value; 
}


const calcProjectTilesPosition = () => {
    let containerWidth = window.innerWidth;
    let tempPadding = numOfProjectTiles.value === 1 ? 0 : carouselPadding; 
    containerWidth -= tempPadding;
    containerWidth -= numOfProjectTiles.value * 270;
    let spacing =  containerWidth / (numOfProjectTiles.value + 1);
    let position = tempPadding/2  + spacing;

    activeListPosition.value = [];
    for (let index = 0; index < numOfProjectTiles.value; index++) {
        activeListPosition.value.push(position.toString() + "px");
        position += spacing + 270;
    }
}

const calcActiveList = () => {
    let endIndex = firstActiveProjectTile.value + numOfProjectTiles.value - 1;
    for (let index = 0; index < ProjectList.length; index++) {
        ProjectList[index].ifActive = false;
    }
    for (let index = firstActiveProjectTile.value; index <= endIndex; index++) {
        if(index >= ProjectList.length){
            ProjectList[index - ProjectList.length].ifActive = true;
        }
        else {
            ProjectList[index].ifActive = true;
        }
    }
}

const adjustFirstIndex = (offset) => {
    const now = Date.now();
    if (lastClicked.value != null && now - lastClicked.value < 470) {
      return;
    }
    lastClicked.value = now;

    if(offset < 0)
    {
        projectCarouselTransitionName.value = "project-carousel-1";
    }
    else {
        projectCarouselTransitionName.value = "project-carousel-2";
    }

    firstActiveProjectTile.value += offset;
    if(firstActiveProjectTile.value < 0) 
    {
        firstActiveProjectTile.value += ProjectList.length;
    }
    else if(firstActiveProjectTile.value >= ProjectList.length)
    {
        firstActiveProjectTile.value -= ProjectList.length;
    }
   
    calcActiveList();
}


const getActiveList = () => {
    let tempArr = [];
    let endIndex = firstActiveProjectTile.value + numOfProjectTiles.value - 1;
    for (let index = firstActiveProjectTile.value; index <= endIndex; index++) {
        if(index >= ProjectList.length){
            tempArr.push(index - ProjectList.length);
        }
        else {
            tempArr.push(index);
        }
    }
    return tempArr;
}

const handleResize = () => {calcNumOfProjectTiles(); calcActiveList(); calcProjectTilesPosition();};

window.addEventListener("resize",  handleResize);
calcNumOfProjectTiles();
calcActiveList();
calcProjectTilesPosition();



onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
});


</script>



<template>
    <div class="bg-white pt-4 h-[720px] w-dvh flex flex-col py-2">
        <RouterLink to="/Projects">
            <h1 class="font-jersey text-6xl text-center flex-grow-0 mt-10">Projects</h1>
        </RouterLink>


        <div class="flex-grow flex flex-col justify-center relative">
            <button class="z-[2] absolute top-4/10 hover:bg-gray-200 rounded-full active:scale-90" @click="adjustFirstIndex(-1);">
                <Icon icon="memory:menu-left" class="relative right-0.5 w-12 h-12 text-black" />
            </button>
            <button class="z-[2] absolute top-4/10 right-0 hover:bg-gray-200 rounded-full active:scale-90" @click="adjustFirstIndex(1)">
                    <Icon icon="memory:menu-right" class="relative left-0.5 w-12 h-12 text-black"  />
            </button>

            <TransitionGroup tag="div" :name="projectCarouselTransitionName" class="relative flex flex-row justify-evenly items-center h-full overflow-hidden">

                <ProjectTile v-for="(value,index) in getActiveList()" :key="ProjectList[value].id" :Project="ProjectList[value]" :Left="activeListPosition[index]">

                </ProjectTile>
                

            </TransitionGroup>
        </div>

        <div class="flex-grow-0">
            <ul class="flex flex-row list-none justify-center">
                <li v-for="(value) in ProjectList">
                    <Icon v-show="value.ifActive" icon="radix-icons:dot-filled" width="22" height="22"  style="color: black" />
                    <Icon v-show="!value.ifActive" icon="radix-icons:dot" width="22" height="22"  style="color: black" />
                </li>
            </ul>
        </div>

    </div>

</template>


<style lang="scss" scoped>

.project-carousel-1-move,
.project-carousel-1-enter-active,
.project-carousel-1-leave-active,
.project-carousel-2-move,
.project-carousel-2-enter-active,
.project-carousel-2-leave-active {
    transition: all 0.45s ease;
    pointer-events: none;
}


.project-carousel-1-leave-to {
    opacity: 0;
    transform: translateX(500px);
}

.project-carousel-1-enter-from {
    opacity: 0;
    transform: translateX(-800px);
}

.project-carousel-2-leave-to {
    opacity: 0;
    transform: translateX(-500px);
}

.project-carousel-2-enter-from {
    opacity: 0;
    transform: translateX(800px);
}
</style>