import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import type { BlogPost } from "@/components/content/types";
import BlogCategoryBadge from "@/components/blog/BlogCategoryBadge";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type BlogGridCardProps = {
  post: BlogPost;
};

const BlogGridCard = ({ post }: BlogGridCardProps) => {
  const href = post.href ?? "#";

  return (
    <article className="flex flex-col overflow-hidden bg-white">
      <div className="relative aspect-16/10 overflow-hidden">
        {post.image && (
          <Image
            src={post.image as StaticImageData}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <div className="absolute top-4 left-4">
          <BlogCategoryBadge label={post.category} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <p className="font-sans text-sm text-text-secondary">
          {post.date} &bull; {post.readTime}
        </p>

        <h3 className="font-sans text-lg font-bold leading-snug text-text sm:text-xl">{post.title}</h3>

        <p className="line-clamp-3 font-sans text-sm leading-relaxed text-text-secondary sm:text-base">{post.excerpt}</p>

        <Link href={href} className="mt-auto inline-flex items-center gap-2 font-sans text-sm font-medium text-text">
          Read Article
          <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
};

export default BlogGridCard;
