<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

import { ListVideo, LucideFileQuestion } from 'lucide-vue-next';
import { Files } from 'lucide-vue-next';
import { FileQuestion } from 'lucide-vue-next';
import { Menu } from 'lucide-vue-next';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
const Base = import.meta.env.BASE_URL;
</script>

<template>

  <NavigationMenu class="hidden sm:flex ">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink :href="`${Base}/docs`">
          <Button class="text-base px-2" variant="ghost">
            <Files :size=24 :stroke-width=2 />
            Documentation
          </Button>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink :href="`${Base}/codeclist`">
          <Button class="text-base px-2" variant="ghost">
            <ListVideo :size=24 :stroke-width=2 />
            Codec list
          </Button>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink :href="`${Base}/about`">
          <Button class="text-base px-2" variant="ghost">
            <FileQuestion :size=24 :stroke-width=2 />
            About
          </Button>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>

  <Sheet>
    <SheetTrigger class="sm:hidden ml-2">
      <Menu stroke-width="2" />
    </SheetTrigger>
    <SheetContent side="left" class="sm:hidden px-0 w-3/5">
      <SheetHeader class="flex-col mt-6 gap-2">
        <NavigationMenuLink class="flex" :href="`${Base}/docs`">
          <Button class="text-base flex-auto  gap-2 justify-start" variant="ghost">
            <Files :size=24 :stroke-width=2 />
            Documentation
          </Button>
        </NavigationMenuLink>
        <NavigationMenuLink class="flex" :href="`${Base}/codeclist`">
          <Button class="text-base flex-auto  gap-2 justify-start" variant="ghost">
            <ListVideo :size=24 :stroke-width=2 />
            Codec list
          </Button>
        </NavigationMenuLink>
        <NavigationMenuLink class="flex" :href="`${Base}/about`">
          <Button class="text-base flex-auto  gap-2 justify-start" variant="ghost">
            <FileQuestion :size=24 :stroke-width=2 />
            About
          </Button>
        </NavigationMenuLink>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>