import type { BlogPost } from "@/components/content/types";

export const normalizeBlogCategory = (category: string) => category.toLowerCase().trim();

export const blogPostMatchesFilter = (post: BlogPost, filter: string) => {
  if (filter === "All") {
    return true;
  }

  return normalizeBlogCategory(post.category) === normalizeBlogCategory(filter);
};

export const filterBlogPosts = (posts: BlogPost[], filter: string) => posts.filter((post) => blogPostMatchesFilter(post, filter));

export const countBlogPosts = (posts: BlogPost[], filter: string) => filterBlogPosts(posts, filter).length;
