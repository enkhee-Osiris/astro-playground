---
title: Getting Started with Astro - The Modern Static Site Generator
description: Learn how to build lightning-fast websites with Astro, the modern static site generator that ships zero JavaScript by default.
pubDate: 2025-09-03
heroImage: "../../assets/blog-placeholder-3.jpg"
category: tech
tags: [astro, javascript, static-site-generator, tutorial]
---

If you're looking for a way to build fast, modern websites without the overhead of traditional JavaScript frameworks, Astro might be exactly what you need. This innovative static site generator takes a unique approach: it ships zero JavaScript by default, only adding interactivity where you explicitly need it.

## What Makes Astro Different?

### Islands Architecture

Astro pioneered the "Islands Architecture" pattern, where most of your site is static HTML, but you can create interactive "islands" of JavaScript exactly where needed. This results in:

- **Faster load times** - Less JavaScript means faster page loads
- **Better SEO** - Content is server-rendered and immediately available
- **Improved performance** - Only essential JavaScript is sent to the browser
- **Framework flexibility** - Use React, Vue, Svelte, or vanilla JS as needed

### Multi-Framework Support

Unlike other frameworks that lock you into one ecosystem, Astro lets you use:

- React components for complex interactivity
- Vue components for reactive interfaces
- Svelte components for lightweight interactions
- Plain HTML/CSS for static content
- All in the same project!

## Setting Up Your First Astro Project

### Installation

Getting started with Astro is straightforward:

```bash
# Create a new Astro project
npm create astro@latest my-astro-site

# Navigate to your project
cd my-astro-site

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Project Structure

Astro creates a clean, organized project structure:

```
my-astro-site/
├── src/
│   ├── components/          # Reusable components
│   ├── layouts/             # Page layouts
│   ├── pages/               # File-based routing
│   └── styles/              # Global styles
├── public/                  # Static assets
├── astro.config.mjs         # Astro configuration
└── package.json
```

## Understanding Astro Components

### Basic Component Syntax

Astro components use a unique syntax that combines the best of HTML, CSS, and JavaScript:

```astro
---
// Component Script (runs at build time)
const title = "Welcome to Astro";
const items = ["Fast", "Flexible", "Fun"];
---

<!-- Component Template -->
<div class="hero">
  <h1>{title}</h1>
  <ul>
    {items.map(item => <li>{item}</li>)}
  </ul>
</div>

<style>
  .hero {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  }

  h1 {
    color: white;
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    color: white;
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
</style>
```

### Component Props

Pass data to components using props:

```astro
---
// Card.astro
interface Props {
  title: string;
  description: string;
  imageUrl?: string;
}

const { title, description, imageUrl } = Astro.props;
---

<div class="card">
  {imageUrl && <img src={imageUrl} alt={title} />}
  <h3>{title}</h3>
  <p>{description}</p>
</div>

<style>
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
  }
</style>
```

## File-Based Routing

Astro uses file-based routing, making it intuitive to create pages:

```
src/pages/
├── index.astro          → /
├── about.astro          → /about
├── blog/
│   ├── index.astro      → /blog
│   └── [slug].astro     → /blog/any-post
└── products/
    └── [id].astro       → /products/123
```

### Dynamic Routes

Create dynamic routes using brackets:

```astro
---
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const posts = await Astro.glob("../content/blog/*.md");

  return posts.map(post => ({
    params: { slug: post.frontmatter.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
---

<html>
  <head>
    <title>{post.frontmatter.title}</title>
  </head>
  <body>
    <h1>{post.frontmatter.title}</h1>
    <post.Content />
  </body>
</html>
```

## Working with Content

### Markdown Support

Astro has excellent Markdown support with frontmatter:

```markdown
---
title: My First Post
publishDate: 2025-01-01
author: Jane Doe
tags: [astro, web-dev]
---

# My First Post

This is my first post written in Markdown with Astro!

## Features I Love

- Zero JavaScript by default
- File-based routing
- Multi-framework support
```

### Content Collections

Organize your content with Astro's Content Collections:

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

## Adding Interactivity

### Client Directives

When you need JavaScript, use client directives to control when components hydrate:

```astro
---
import Counter from "../components/Counter.jsx";
import SearchBox from "../components/SearchBox.vue";
---

<!-- Hydrate immediately -->
<Counter client:load />

<!-- Hydrate when component becomes visible -->
<SearchBox client:visible />

<!-- Hydrate when user interacts -->
<ContactForm client:idle />

<!-- Hydrate based on media query -->
<MobileMenu client:media="(max-width: 768px)" />
```

### React Component Example

Here's a simple React component that works with Astro:

```jsx
// src/components/Counter.jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Styling Options

### Scoped Styles

Astro automatically scopes styles to components:

```astro
<div class="container">
  <h1>This heading is styled</h1>
</div>

<style>
  /* These styles only apply to this component */
  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    color: #333;
    font-size: 2rem;
  }
</style>
```

### CSS Frameworks

Easily integrate popular CSS frameworks:

```bash
# Install Tailwind CSS
npm install @astrojs/tailwind tailwindcss

# Or use Sass
npm install sass
```

## Performance Benefits

### Bundle Size Comparison

Here's how Astro compares to other frameworks for a typical blog:

- **Astro**: ~0-5kb JavaScript (only for interactive components)
- **Next.js**: ~65kb JavaScript minimum
- **Gatsby**: ~45kb JavaScript minimum
- **Nuxt.js**: ~50kb JavaScript minimum

### Lighthouse Scores

Astro sites typically achieve:

- **Performance**: 95-100
- **Accessibility**: 90-100
- **Best Practices**: 95-100
- **SEO**: 90-100

## Deployment

### Static Deployment

Build and deploy your static site:

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

Deploy to popular platforms:

- **Netlify**: Connect your Git repo
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Built-in Actions support
- **Cloudflare Pages**: Edge deployment

### Server-Side Rendering

Enable SSR for dynamic content:

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
```

## Best Practices

### 1. Start Static, Add Interactivity

Begin with static HTML/CSS and add JavaScript only where needed.

### 2. Use the Right Tool

- Static content → Astro components
- Complex interactivity → React/Vue/Svelte
- Simple interactions → Vanilla JavaScript

### 3. Optimize Images

```astro
---
import { Picture } from "@astrojs/image/components";
---

<Picture src="/hero.jpg" alt="Hero image" widths={[400, 800, 1200]} formats={["webp", "jpeg"]} />
```

### 4. Leverage Content Collections

Organize your content systematically for better maintainability and type safety.

## Common Pitfalls to Avoid

### 1. Over-hydrating Components

Don't use `client:load` everywhere. Consider `client:visible` or `client:idle` for better performance.

### 2. Ignoring SEO Opportunities

Take advantage of Astro's server-rendering for better SEO:

```astro
---
const title = "My Amazing Site";
const description = "Building fast websites with Astro";
---

<html>
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
  </head>
</html>
```

### 3. Not Using TypeScript

Enable TypeScript for better developer experience:

```bash
npm install typescript @astrojs/ts-plugin
```

## Next Steps

Now that you understand the basics:

1. **Explore integrations** - Add features like image optimization, sitemap generation, and more
2. **Learn about View Transitions** - Create smooth page transitions with minimal JavaScript
3. **Try different frameworks** - Experiment with React, Vue, and Svelte components
4. **Build a project** - The best way to learn is by building something real

Astro represents a new approach to web development that prioritizes performance without sacrificing developer experience. By defaulting to static HTML and adding interactivity incrementally, you can build websites that are both fast and maintainable.

The framework's flexibility means you can start simple and grow complex as needed, making it perfect for everything from personal blogs to large-scale applications. Give it a try - your users (and your Lighthouse scores) will thank you!
