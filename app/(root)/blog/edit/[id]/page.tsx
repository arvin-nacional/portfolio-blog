import Post from "@/components/forms/Post";
import { getPostById } from "@/lib/actions/post.action";
import { ParamsProps } from "@/types";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const { id } = await params;
  const result = await getPostById({ postId: id });
  return (
    <div>
      <section className=" flex items-center justify-center px-16 max-md:px-5 sm:py-20">
        <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10">
          <h4 className="base-bold mb-10">Edit Blog</h4>
          <div className="w-[600px] max-sm:w-full">
            <Post
              type="Edit"
              postId={params.id}
              postDetails={JSON.stringify(result?.post)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
