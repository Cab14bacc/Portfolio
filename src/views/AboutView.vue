        
<script setup>
import MarkdownDocument from '@/components/MarkdownDocument.vue';
import { onMounted } from 'vue';
onMounted(() => {
    window.scrollTo({top: 0,  behavior: 'smooth'})
});

</script>

<template>
    <div class=" h-full min-w-[300px] min-h-[100vh] p-10">
        <MarkdownDocument :fileName="'About.md'"></MarkdownDocument>
    </div>
</template>

<style lang="scss" scoped></style>