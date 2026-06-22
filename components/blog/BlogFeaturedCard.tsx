import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import type { BlogPost } from "@/components/content/types";
import BlogCategoryBadge from "@/components/blog/BlogCategoryBadge";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type BlogFeaturedCardProps = {
  post: BlogPost;
};

const BlogFeaturedCard = ({ post }: BlogFeaturedCardProps) => {
  const href = post.href ?? "#";

  return (
    <article className="grid overflow-hidden rounded-2xl lg:grid-cols-2">
      <div className="relative min-h-[280px] lg:min-h-[420px]">
        {post.image && (
          <Image
            src={post.image as StaticImageData}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        )}
        <span className="absolute top-4 left-4 rounded bg-primary px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white sm:text-xs">
          Featured
        </span>
      </div>

      <div className="flex flex-col gap-6 bg-[#1A1612] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <BlogCategoryBadge label={post.category} />
          <span className="font-sans text-sm text-white/50">
            {post.date} &bull; {post.readTime}
          </span>
        </div>

        <h2 className="font-sans text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">{post.title}</h2>

        <p className="font-sans text-base leading-relaxed text-white/60 sm:text-lg sm:leading-8">{post.excerpt}</p>

        <div className="mt-auto flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {post.author && (
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-sm font-bold text-white">
                {post.author.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-sans text-sm font-bold text-white">{post.author.name}</p>
                <p className="font-sans text-xs text-white/50">{post.author.role}</p>
              </div>
            </div>
          )}

          <Link href={href} className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary sm:text-base">
            Read Article
            <ArrowRightIcon className="text-primary" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogFeaturedCard;
