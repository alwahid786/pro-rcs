const BlogCategoryBadge = ({ label }: { label: string }) => (
  <span className="inline-flex rounded bg-primary px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:text-xs">
    {label}
  </span>
);

export default BlogCategoryBadge;
