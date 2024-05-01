<script setup>
import ProjectTile from '@/components/ProjectTile.vue';
import { useProjectListStore } from '@/stores/ProjectList';
import { ref, reactive, onUnmounted } from 'vue';

let projectlist = reactive(useProjectListStore().projectList);
let projectTilesInARow = ref(1);
let projectTilesPostions = reactive([]);

const props = defineProps({
    filterList: {
        type: Array,
        required: true,
    }
});

const filteredListIndices = (filterList) => {
    let tempArr = []
    console.log(filterList);
    let newfilterList = filterList.map((filter) => {
        return filter ? filter.replace(/\s/g, '').toLowerCase() : '';
    });
    console.log(newfilterList);
    let allInclude = true;
    let title = "";
    let description = "";
    let tags = "";

    for (let index = 0; index < projectlist.length; index++) {
        const element = projectlist[index];
        title = element.title.replace(/\s/g, '').toLowerCase();
        description = element.description.replace(/\s/g, '').toLowerCase();
        tags = element.tags.join("---").replace(/\s/g, '').toLowerCase()
        allInclude = true;


        if (filterList.length != 0 && !(title.includes(newfilterList[0])
            || description.includes(newfilterList[0]) || tags.includes(newfilterList[0]))) {
            continue;
        }
        // tags start from 1 on the filterList
        for (let tagIndex = 1; tagIndex < newfilterList.length; tagIndex++) {

            if (newfilterList[tagIndex] === '') {
                continue;
            }

            if (!(title.includes(newfilterList[tagIndex]) || description.includes(newfilterList[tagIndex])
                || tags.includes(newfilterList[tagIndex]))) {
                allInclude = false;
                break;
            }
        }

        if (allInclude === true) {
            tempArr.push(index);
        }

    }
    return tempArr;
}

const panelPadding = 100;
const calcProjectTilesInARow = () => {
    let windowWidth = window.innerWidth;
    projectTilesInARow.value = Math.max(Math.floor((windowWidth - panelPadding) / 290), 1);
    return projectTilesInARow.value;
}

const calcProjectTilesPosition = () => {
    let tempPadding = projectTilesInARow.value === 1 ? 0 : panelPadding;

    let containerWidth = window.innerWidth;
    containerWidth -= tempPadding;
    containerWidth -= projectTilesInARow.value * 270;
    let spacing = containerWidth / (projectTilesInARow.value + 1);
    let left = tempPadding / 2 + spacing;
    let top = 0;
    projectTilesPostions = [];

    for (let index = 0; index < projectlist.length; index += projectTilesInARow.value) {
        left = tempPadding / 2 + spacing;

        for (let col = 0; col < projectTilesInARow.value; col++) {
            if (index + col >= projectlist.length) {
                break;
            }

            projectTilesPostions.push({ left: left.toString() + "px", top: top.toString() + "px" });
            left += spacing + 270;
        }

        top += 500;
    }

}

const projectsPageResize = () => { calcProjectTilesInARow(); calcProjectTilesPosition(); };

window.addEventListener("resize", projectsPageResize);
calcProjectTilesInARow();
calcProjectTilesPosition();
filteredListIndices([]);


onUnmounted(() => {
    window.removeEventListener("resize", projectsPageResize);
});

</script>


<template>

    <TransitionGroup tag="div" name="panel" class="relative h-[var(--height)] min-h-[80vh]
    flex flex-row justify-evenly items-start flex-wrap my-5 overflow-visible"
        :style="{ '--height': (Math.ceil(filteredListIndices(filterList).length / projectTilesInARow) * 500) + 'px' }">

        <ProjectTile v-for="(value, index) in filteredListIndices(filterList)" :key="projectlist[value].id"
            :Project="projectlist[value]" :Left="projectTilesPostions[index].left"
            :Top="projectTilesPostions[index].top">

        </ProjectTile>

    </TransitionGroup>
</template>

<style lang="scss" scoped>
.panel-enter-active,
.panel-leave-active,
.panel-move {
    transition: all 0.3s ease;
}

.panel-enter-from,
.panel-leave-to {
    transform: scale(0.1);
    opacity: 0;
}
</style>