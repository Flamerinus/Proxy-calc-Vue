<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
const Base = import.meta.env.BASE_URL;
import { ExternalLink } from 'lucide-vue-next';

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
    <!-- Render a div with display grid, with different column numbers depending 
    on the width of the screen. Tweak according to your needs.
    It displays one image for darkmode and hides it for light mode, displaying the other.
 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
        <Card v-for="card in Cards" class="flex flex-col flex-grow bg-secondary hover:bg-secondary/90">
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
                <CardFooter class="p-2"><ExternalLink :size=20 class="mr-1"/> {{ card.url }} </CardFooter>
            </a>
        </Card>
    </div>
</template>