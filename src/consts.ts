export const SITE_TITLE = "Astro Blog";
export const SITE_DESCRIPTION = "Welcome to my website!";

export const BLOG_CATEGORIES = [
  {
    id: "tech",
    slug: "tech",
    name: "Tech",
  },
  {
    id: "scratch",
    slug: "scratch",
    name: "Scratch",
  },
  {
    id: "design",
    slug: "design",
    name: "Design",
  },
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]["id"];
