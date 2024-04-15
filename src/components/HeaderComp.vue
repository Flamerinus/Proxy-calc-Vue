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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'

</script>

<template>

  <NavigationMenu class="hidden sm:flex ">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger class="text-base px-2">
          <Files :size=24 :stroke-width=2 />
          Documentation
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
            <li class="row-span-3">
              <NavigationMenuLink as-child>
                <a class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/">
                  <img src="https://www.radix-vue.com/logo.svg" class="h-6 w-6">
                  <div class="mb-2 mt-4 text-lg font-medium">
                    shadcn/ui
                  </div>
                  <p class="text-sm leading-tight text-muted-foreground">
                    Beautifully designed components built with Radix UI and
                    Tailwind CSS.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li href="/docs" title="Introduction">
              Re-usable components built using Radix UI and Tailwind CSS.
            </li>
            <ListItem href="/docs/installation" title="Installation">
              How to install dependencies and structure your app.
            </ListItem>
            <ListItem href="/docs/primitives/typography" title="Typography">
              Styles for headings, paragraphs, lists...etc
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink href="/codeclist">
          <Button class="text-base px-2" variant="ghost">
            <ListVideo :size=24 :stroke-width=2 />
            Codec list
          </Button>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink href="/about">
          <Button class="text-base px-2" variant="ghost">
            <FileQuestion :size=24 :stroke-width=2 />
            About
          </Button>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>

  <Sheet>
    <SheetTrigger class="sm:hidden ml-2">Open</SheetTrigger>
    <SheetContent side="left" class="sm:hidden">
      <SheetHeader>
        <SheetTitle>Are you sure absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>