import { any } from "astro/zod";
import { defineCollection, z} from "astro:content";

const codecsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        name: z.string(),
        bitrate: z.string(),
        Resolutions: z.any(),
    }),
});

export const collections = {
    codecs: codecsCollection,
};