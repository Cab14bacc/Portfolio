<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    Project: {
        type: Object,
        required: true,
    },
    Left: {
        type: String,
    },
    Top:
    {
        type: String,
    }
});

</script>

<template>
    <div v-if="Left && Top"
        class="project-tile flex flex-col shadow-lb-sm bg-white absolute left-[var(--current-Left)] top-[var(--current-Top)] hover:scale-[103%]"
        :style="`--current-Left:${Left}; --current-Top:${Top}`">
        <div class="w-full h-full">
            <RouterLink :to="`${Project.link}`">
                <!-- /src/assets/..... for dev since template literal are not handled by vite -->
                <img class="project-tile-image h-1/2 w-full" :src="`/assets/project_img/${Project.image}`">
            </RouterLink>
            <RouterLink :to="`${Project.link}`">
                <h3 class=" font-jersey text-center text-4xl px-1 leading-[0.8] mb-1">{{ Project.title }}</h3>
            </RouterLink>
            <p class=" font-mono text-sm leading-tight tracking-wider text-justify mx-2">
                {{ Project.description }}</p>
        </div>
    </div>
    <div v-else-if="Left" class="project-tile flex flex-col shadow-lb-sm bg-white absolute left-[var(--current-Left)] hover:scale-[103%]"
        :style="`--current-Left:${Left}`">
        <div class="w-full h-full">
            <RouterLink :to="`${Project.link}`">
                <img class="project-tile-image h-1/2 w-full" :src="`/assets/project_img/${Project.image}`">
            </RouterLink>
            <RouterLink :to="`${Project.link}`">
                <h3 class=" font-jersey text-center text-4xl px-1 leading-[0.8] mb-1">{{ Project.title }}</h3>
            </RouterLink>
            <p class=" font-mono text-sm leading-tight tracking-wider text-justify mx-2">
                {{ Project.description }}</p>
        </div>
    </div>


</template>


<style lang="scss" scoped>
.project-tile {
    --project-tile-height: 450px;
    --project-tile-width: 270px;

    height: var(--project-tile-height);
    width: var(--project-tile-width);
    flex-shrink: 0;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-radius: 20px;
}


.project-tile img {
    object-fit: cover;
    border-radius: 18px 18px 0 0;
    border: 0.2rem;
}




.project-tile-learn-more:visited {
    color: black;
}

</style>