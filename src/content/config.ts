import { defineCollection, z } from "astro:content";

const codecsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        name: z.string(),
        bitrate: z.string(),
        MB: z.number(),
        Resolutions: z.any(),
    }),
});

const docsCollection = defineCollection(
    {
        schema: z.object({
            title: z.string(),
            
            
        }),
    }
);

export const collections = {
    codecs: codecsCollection,
    docs: docsCollection,
};