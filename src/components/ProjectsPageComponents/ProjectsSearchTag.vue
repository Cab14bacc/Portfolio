        
<script setup>
import { ref } from 'vue';

let ifChecked = ref(false);
let lastClicked = ref(null);

const props = defineProps({
    name: {
        type: String,
        required: true,
    }
})

const emit = defineEmits(['tag-update']);


const updateTag = () => {

    ifChecked.value = !ifChecked.value;
    emit('tag-update', ifChecked.value ? props.name : '');
}

</script>

<template>
    <input type="checkbox" :id="`project-tag1-${name}`" class="hidden" @change="updateTag">
    <label :for="`project-tag1-${name}`" class="inline-flex justify-center items-center rounded-full text-black border-black border-2 p-2
        h-10 font-jersey tracking-normal text-lg
        min-w-fit text-nowrap select-none cursor-pointer transition-all duration-150"
        :class="{ 'bg-black text-white': ifChecked }">
        {{ name }}
    </label>

</template>

<style lang="scss" scoped></style>