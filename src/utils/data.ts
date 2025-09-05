import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import _ from "lodash";

export async function getPublishedBlogs() {
  const blogs = await getCollection("blog");

  const publishedBlogs = _.orderBy(
    blogs.filter(blog => !blog.data.isDraft),
    [blog => blog.data.pubDate],
    ["desc"]
  );

  return publishedBlogs;
}

export async function getCategoriesWithBlogs() {
  const blogs = await getPublishedBlogs();
  const categories = await getCollection("category");

  return categories.map(category => {
    const blogsOfCategory = blogs.filter(blog => blog.data.category.id === category.id);

    return {
      category,
      blogs: blogsOfCategory,
    };
  });
}

export async function getTagsWithBlogs() {
  const blogs = await getPublishedBlogs();

  const tagMap: Record<string, typeof blogs> = {};

  blogs.forEach(blog => {
    const tags = blog.data.tags ?? [];

    tags.forEach(tag => {
      if (!tagMap[tag]) {
        tagMap[tag] = [];
      }

      tagMap[tag].push(blog);
    });
  });

  return Object.entries(tagMap).map(([tag, blogs]) => ({
    tag,
    blogs,
  }));
}
