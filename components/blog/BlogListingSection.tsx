"use client";

import type { BlogPost } from "@/components/content/types";
import BlogFeaturedCard from "@/components/blog/BlogFeaturedCard";
import BlogGridCard from "@/components/blog/BlogGridCard";
import BlogRowItem from "@/components/blog/BlogRowItem";
import { filterBlogPosts } from "@/components/blog/utils";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

type BlogListingSectionProps = {
  filters: string[];
  featured: BlogPost;
  gridPosts: BlogPost[];
  rowPosts: BlogPost[];
};

const BlogListingSection = ({ filters, featured, gridPosts, rowPosts }: BlogListingSectionProps) => {
  const [activeFilter, setActiveFilter] = useState(filters[0] ?? "All");

  const filteredRowPosts = useMemo(() => filterBlogPosts(rowPosts, activeFilter), [rowPosts, activeFilter]);

  const articleCount = useMemo(() => {
    return filteredRowPosts.length;
  }, [filteredRowPosts]);

  const rowStartIndex = gridPosts.length + 1;

  return (
    <div className="flex flex-col">
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="w-full">
          <div className="flex flex-col gap-0">
            <BlogFeaturedCard post={featured} />

            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-0.5 bg-[#ece7e1] md:grid-cols-2">
                {gridPosts.map((post) => (
                  <BlogGridCard key={post.slug ?? post.title} post={post} />
                ))}
              </div>
            )}
          </div>

          {filteredRowPosts.length === 0 && (
            <p className="py-12 text-center font-sans text-base text-text-secondary">No articles found in this category.</p>
          )}
        </div>
      </section>

      <section className="border-t border-[#ece7e1] bg-[#fdfaf7]">
        <div className="w-full">
          <div className="flex flex-col gap-4 border-b border-[#ece7e1] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6 lg:px-8 xl:px-12">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-start sm:gap-8">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "relative cursor-pointer pb-1 font-sans text-sm font-medium transition-colors duration-200",
                    activeFilter === filter ? "text-text" : "text-text-secondary hover:text-text",
                  )}
                >
                  {filter}
                  {activeFilter === filter && (
                    <motion.span layoutId="active-blog-filter" className="absolute right-0 bottom-0 left-0 h-0.5 bg-primary" aria-hidden />
                  )}
                </button>
              ))}
            </div>

            <p className="text-center font-sans text-xs font-medium uppercase tracking-[0.12em] text-text-secondary sm:text-right">
              {articleCount} {articleCount === 1 ? "Article" : "Articles"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {filteredRowPosts.length > 0 && (
              <motion.div
                key={`rows-${activeFilter}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="w-full bg-white"
              >
                {filteredRowPosts.map((post, index) => (
                  <BlogRowItem key={post.slug ?? post.title} post={post} index={rowStartIndex + index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default BlogListingSection;
