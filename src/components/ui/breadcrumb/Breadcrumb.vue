<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <nav class="font-mono" aria-label="breadcrumb" :class="props.class">
    <slot />
  </nav>
</template>
