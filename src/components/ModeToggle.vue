<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Button } from '../components/ui/button';
import { ref, watch } from 'vue';
import { Sun, Moon } from 'lucide-vue-next';
const mode = useColorMode()
const isLightMode = ref(false)
watch(isLightMode, () => {
  mode.value = isLightMode.value ? "light" : "dark";
})
</script>

<template>
  <div class="my-auto mr-2">
    <Button @click="isLightMode = !isLightMode" class="px-2" variant="ghost">
      <Sun class="hidden dark:flex" />
      <Moon class="flex dark:hidden" />
    </Button>
  </div>
</template>