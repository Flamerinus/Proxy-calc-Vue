<script setup lang="ts">
import { resolveComponent, ref } from 'vue';
import type { HTMLAttributes } from 'vue'
import { type NotifVariants, notifVariants } from '.'
import { cn } from '@/lib/utils'
import { CircleAlert, Info, Wand } from 'lucide-vue-next';

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: NotifVariants['variant']
}>()
const test = ref<string>('Wand');

if (props.variant == "default") {
  test.value = "Wand";
} else if (props.variant == "info") {
  test.value = "Info";
} else if (props.variant == "destructive") {
  test.value = "CircleAlert";
}

const components: Record<string, any> = {
  Wand,
  Info,
  CircleAlert,
};

</script>

<template>
  <div :class="cn(notifVariants({ variant }), props.class)" role="notification">
    <div class="flex items-center mr-2 sm:mr-4">
      <component :is="components[test]" class="size-10 sm:size-12" stroke-width="1.5" />
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
