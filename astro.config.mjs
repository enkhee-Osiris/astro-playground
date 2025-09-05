import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://your-blog-site.com",
  integrations: [mdx(), sitemap()],
  devToolbar: {
    enabled: false,
  },
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@/components": "/src/components",
        "@/layouts": "/src/layouts",
        "@/pages": "/src/pages",
        "@/styles": "/src/styles",
        "@/utils": "/src/utils",
        "@/content": "/src/content",
        "@/assets": "/src/assets",
      },
    },
  },
});
