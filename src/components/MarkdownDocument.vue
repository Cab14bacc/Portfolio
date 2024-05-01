<script setup>
import { ref, watchEffect } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps({
  fileName: {
    type: String,
    required: true,
  }
});

const md = new MarkdownIt({breaks: true, html: true});
const htmlText = ref('');

const getMarkdown = async () => {
  const response = await fetch(`/assets/${props.fileName}`);
  const markdownText = await response.text();
  htmlText.value = md.render(markdownText);
}

getMarkdown();

watchEffect(() => {
  getMarkdown();
});

</script>

<template>
    <div v-html="htmlText" class="w-full h-full"></div>
</template>


<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
  :deep(*) {
    @apply text-lg font-mono;
  }
  
  :deep(h1) {
    @apply text-6xl font-bold font-jersey mb-5;
  }

  :deep(h2) {
    @apply text-5xl font-bold font-jersey border-b-2 border-slate-700;
  }

  :deep(h3) {
    @apply text-2xl font-bold font-jersey border-b-2 border-slate-700;
  }

  :deep(h4) {
    @apply text-xl font-bold font-jersey border-b-2 border-slate-700;
  }

  :deep(ul) {
    @apply m-3;
  }

  :deep(ol) {
    @apply m-3;
  }

  :deep(li)  {
    list-style-type: circle;
    list-style-position: inside;
  }

  :deep(p) {
    @apply m-3 text-left;
  }

  :deep(a) {
    @apply underline
  }
  :deep(img) {
    @apply m-4 rounded-2xl;
  }
}


</style>
