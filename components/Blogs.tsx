import * as React from "react";
import BlogContent from "./BlogContent";
import { getRecentlyAddedPosts } from "@/lib/actions/post.action";

const Blogs = async () => {
  const result = await getRecentlyAddedPosts();
  return (
    <section className="background-light400_dark300 flex items-center justify-center px-16 py-20 max-md:px-5">
      <div className="w-[1200px] max-w-full justify-between pb-6 max-md:mt-10">
        {/* @ts-ignore */}
        <BlogContent posts={result.posts} />
      </div>
    </section>
  );
};

export default Blogs;
