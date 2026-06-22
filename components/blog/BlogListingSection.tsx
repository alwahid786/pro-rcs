"use client";

import type { BlogPost } from "@/components/content/types";
import BlogFeaturedCard from "@/components/blog/BlogFeaturedCard";
import BlogGridCard from "@/components/blog/BlogGridCard";
import BlogRowItem from "@/components/blog/BlogRowItem";
import { blogPostMatchesFilter, filterBlogPosts } from "@/components/blog/utils";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

type BlogListingSectionProps = {
  filters: string[];
  featured: BlogPost;
  gridPosts: BlogPost[];
  rowPosts: BlogPost[];
};

const BlogListingSection = ({ filters, featured, gridPosts, rowPosts }: BlogListingSectionProps) => {
  const [activeFilter, setActiveFilter] = useState(filters[0] ?? "All");

  const allPosts = useMemo(() => [...gridPosts, ...rowPosts], [gridPosts, rowPosts]);

  const filteredGridPosts = useMemo(() => filterBlogPosts(gridPosts, activeFilter), [gridPosts, activeFilter]);
  const filteredRowPosts = useMemo(() => filterBlogPosts(rowPosts, activeFilter), [rowPosts, activeFilter]);
  const showFeatured = blogPostMatchesFilter(featured, activeFilter);

  const articleCount = useMemo(() => {
    const listCount = filterBlogPosts(allPosts, activeFilter).length;
    return showFeatured ? listCount + 1 : listCount;
  }, [allPosts, activeFilter, showFeatured]);

  const rowStartIndex = filteredGridPosts.length + 1;

  return (
    <div className="flex flex-col">
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container flex flex-col gap-10 lg:gap-12">
          {showFeatured && <BlogFeaturedCard post={featured} />}

          {filteredGridPosts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {filteredGridPosts.map((post) => (
                <BlogGridCard key={post.slug ?? post.title} post={post} />
              ))}
            </div>
          )}

          {!showFeatured && filteredGridPosts.length === 0 && filteredRowPosts.length === 0 && (
            <p className="py-12 text-center font-sans text-base text-text-secondary">No articles found in this category.</p>
          )}
        </div>
      </section>

      <section className="border-t border-[#ece7e1] bg-[#fdfaf7]">
        <div className="container">
          <div className="flex flex-col gap-4 border-b border-[#ece7e1] py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-start sm:gap-8">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "relative cursor-pointer pb-1 font-sans text-sm font-medium transition-colors",
                    activeFilter === filter ? "text-text" : "text-text-secondary hover:text-text",
                  )}
                >
                  {filter}
                  {activeFilter === filter && <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary" aria-hidden />}
                </button>
              ))}
            </div>

            <p className="text-center font-sans text-xs font-medium uppercase tracking-[0.12em] text-text-secondary sm:text-right">
              {articleCount} {articleCount === 1 ? "Article" : "Articles"}
            </p>
          </div>

          {filteredRowPosts.length > 0 && (
            <div className="bg-white">
              {filteredRowPosts.map((post, index) => (
                <BlogRowItem key={post.slug ?? post.title} post={post} index={rowStartIndex + index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogListingSection;
