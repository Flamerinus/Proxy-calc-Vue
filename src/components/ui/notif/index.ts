import { type VariantProps, cva } from "class-variance-authority";

export { default as Notif } from "./Notif.vue";
export { default as NotifTitle } from "./NotifTitle.vue";
export { default as NotifDescription } from "./NotifDescription.vue";

export const notifVariants = cva(
  "flex w-full rounded-lg border p-2 sm:p-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "bg-secondary text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type NotifVariants = VariantProps<typeof notifVariants>;
