import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import type { BlogPost } from "@/components/content/types";
import BlogCategoryBadge from "@/components/blog/BlogCategoryBadge";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type BlogRowItemProps = {
  post: BlogPost;
  index: number;
};

const BlogRowItem = ({ post, index }: BlogRowItemProps) => {
  const href = post.href ?? "#";

  return (
    <article className="grid grid-cols-1 border-b border-[#ece7e1] last:border-b-0 lg:grid-cols-[72px_minmax(0,1fr)_280px] xl:grid-cols-[96px_minmax(0,1fr)_320px]">
      <div className="hidden items-start border-r border-[#ece7e1] px-4 py-10 lg:flex lg:py-12">
        <span className="font-sans text-3xl font-light text-text-secondary/40 xl:text-4xl">{String(index).padStart(2, "0")}</span>
      </div>

      <div className="flex flex-col gap-4 px-5 py-8 sm:py-10 lg:border-r lg:border-[#ece7e1] lg:px-8 lg:py-12">
        <div className="flex flex-wrap items-center gap-3">
          <BlogCategoryBadge label={post.category} />
          <span className="font-sans text-sm text-text-secondary">{post.date}</span>
        </div>

        <h3 className="font-sans text-xl font-bold leading-tight text-text sm:text-2xl lg:text-3xl">{post.title}</h3>

        <p className="max-w-3xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-8 lg:max-w-[90%]">{post.excerpt}</p>
      </div>

      <div className="flex flex-col gap-0 py-0">
        <div className="relative aspect-4/3 overflow-hidden">
          {post.image && <Image src={post.image as StaticImageData} alt={post.title} fill className="object-cover" sizes="320px" />}
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-5 lg:px-6">
          <span className="font-sans text-sm text-text-secondary">{post.readTime}</span>
          <Link href={href} className="inline-flex items-center gap-2 font-sans text-sm font-medium text-text">
            Read
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogRowItem;
