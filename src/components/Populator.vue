<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
const Base = import.meta.env.BASE_URL;
import { SquareArrowOutUpRight } from "lucide-vue-next";

/*This is how the component is expecting you to define the cards.
If you have the same image for light and dark mode, use the same url for both.
Tweak according to your needs.*/
interface card {
    title: string;
    description: string;
    imgdark: string;
    imglight: string;
    url: string;
}

/*Property the component expects when called. 
Use: <Populator Cards="YourCardList" />.
If you want to declare the card list here, instead of outside the component, you can.
Just define it here and call the component with no props: <Populator /> 
If you define the Cards array of cards here and call the component with props, it will not work.
The one defined here will override the one outside the component.
const Cards = [
{
        title: "Vue.js",
        description: "The Progressive JavaScript Framework.",
        imgdark: "vue-logo.svg",
        imglight: "vue-logo.svg",
        url: "https://vuejs.org/",
    }
];
Tweak according to your needs.*/

const props = defineProps<{
    Cards?: Array<card>;
}>();
</script>
<template>
    <div v-if="false">
        <!-- Render a div with display grid, with different column numbers depending 
    on the width of the screen. Tweak according to your needs.
    It displays one image for darkmode and hides it for light mode, displaying the other.
 -->
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
        <Card v-for="card in Cards" class="sm:hidden bg-secondary hover:bg-secondary/90">
            <a :href="card.url" target="_blank" rel="noopener noreferrer" class="flex flex-col h-full">
                <CardHeader class="flex flex-row items-center justify-between p-1">
                    <img :src="`${Base}/${card.imgdark}`" :alt="`${card.title}` + ` logo`"
                        class="size-12 hidden dark:flex rounded-md" />
                    <img :src="`${Base}/${card.imglight}`" :alt="`${card.title}` + ` logo`"
                        class="size-12 flex dark:hidden rounded-md" />
                    <CardTitle class="text-foreground">{{ card.title }}</CardTitle>
                    <SquareArrowOutUpRight :size="20" :stroke-width="1.5" class="ml-1" />
                </CardHeader>
            </a>
        </Card>
        <div v-if="false">
            <!-- This second v-for loop is going to show the same cards but bigger
    and will disappear at sm breakpoint. Both sets are generated but only one is shown
    depening on screen width. -->
        </div>
        <Card v-for="card in Cards" class="hidden sm:flex flex-col flex-grow bg-secondary hover:bg-secondary/90">
            <a :href="card.url" target="_blank" rel="noopener noreferrer" class="flex flex-col h-full">
                <CardHeader class="p-2">
                    <CardTitle>{{ card.title }}</CardTitle>
                    <CardDescription>{{ card.description }}</CardDescription>
                </CardHeader>
                <CardContent class="p-2 min-h-16 flex justify-center items-center flex-grow">
                    <img :src="`${Base}/${card.imgdark}`" :alt="`${card.title}` + ` logo`"
                        class="max-h-16 hidden dark:flex" />
                    <img :src="`${Base}/${card.imglight}`" :alt="`${card.title}` + ` logo`"
                        class="max-h-16 flex dark:hidden" />
                </CardContent>
                <CardFooter class="p-2">
                    {{ card.url }}
                    <SquareArrowOutUpRight :size="20" :stroke-width="1.5" class="ml-1" />
                </CardFooter>
            </a>
        </Card>
    </div>
</template>
