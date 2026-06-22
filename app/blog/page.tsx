import { blogPageContent, BlogListingSection } from "@/components/blog";
import IndustryBlockSection from "@/components/ui/IndustryBlockSection";
import StandForSection from "@/components/ui/StandForSection";
import HeroSection from "@/components/ui/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: blogPageContent.meta.title,
  description: blogPageContent.meta.description,
};

const heroSection = blogPageContent.sections.find((section) => section.type === "hero");
const blogListSection = blogPageContent.sections.find((section) => section.type === "blog-list");
const blogRowsSection = blogPageContent.sections.find((section) => section.type === "blog-rows");
const industryBlocks = blogPageContent.sections.filter((section) => section.type === "industry-block");
const standForSection = blogPageContent.sections.find((section) => section.type === "stand-for");

const BlogPage = () => {
  return (
    <main className="flex-1 overflow-x-clip">
      {heroSection && (
        <HeroSection
          heading={heroSection.heading}
          description={heroSection.description}
          primaryButton={heroSection.primaryButton}
          secondaryButton={heroSection.secondaryButton}
        />
      )}

      {blogListSection && blogRowsSection && (
        <BlogListingSection
          filters={blogListSection.filters}
          featured={blogListSection.featured}
          gridPosts={blogListSection.posts}
          rowPosts={blogRowsSection.posts}
        />
      )}

      {industryBlocks.map((block) => (
        <IndustryBlockSection
          key={block.title}
          contentWidth="container"
          variant={block.variant}
          badge={block.badge}
          title={block.title}
          description={block.description}
          highlight={block.highlight}
          cta={block.cta}
          helpItems={block.helpItems}
        />
      ))}

      {standForSection && (
        <StandForSection
          badge={standForSection.badge}
          heading={standForSection.heading}
          description={standForSection.description}
          items={standForSection.items}
        />
      )}
    </main>
  );
};

export default BlogPage;
