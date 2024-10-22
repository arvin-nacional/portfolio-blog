"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { deletePost } from "@/lib/actions/post.action";
import { usePathname, useRouter } from "next/navigation";
import { deleteProject } from "@/lib/actions/project.action";

interface Props {
  id: string;
  type?: string;
}

const DeletePost = ({ id, type }: Props) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="text-dark100_light900 flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400">
          <Image
            src="/assets/icons/delete.svg"
            alt="delete"
            width={16}
            height={16}
          />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="background-light900_dark300 text-dark400_light700">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            member and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              if (type === "project") {
                try {
                  deleteProject({ path, projectId: id });
                  router.push("/projects");
                  return toast({
                    title: "Project Removed",
                    variant: "default",
                  });
                } catch (error) {
                  return toast({
                    title: "Error",
                    variant: "destructive",
                  });
                }
              } else if (type === "post") {
                deletePost({ path, postId: id });

                router.push("/blog");
                return toast({
                  title: "Article Removed",
                  variant: "default",
                });
              }
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePost;
