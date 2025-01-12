"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";

import { usePathname, useRouter } from "next/navigation";
import { PostSchema } from "@/lib/validations";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { createPost, editPost } from "@/lib/actions/post.action";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  type?: string;
  postDetails?: string;
  postId?: string;
}

const Post = ({ type, postDetails, postId }: Props) => {
  // convert postDetails to object
  const parsedPostDetails = postDetails ? JSON.parse(postDetails || "") : null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const [preview, setPreview] = useState({
    name: "default",
    url: `${
      parsedPostDetails?.image
        ? parsedPostDetails.image
        : "https://res.cloudinary.com/dey07xuvf/image/upload/v1729222998/Slide_16_9_-_2_ro7dnm.png"
    }`,
  });

  const [previewImages, setPreviewImages] = useState(
    parsedPostDetails?.images ? parsedPostDetails.images : []
  );

  const groupedTags = parsedPostDetails?.tags.map((tag: any) => tag.name);

  // convert image to string
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPreview({ name: file?.name, url: result })
    );
  };

  // Handle multiple images and convert them to strings
  const handleMultipleImageChange = (files: FileList) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.onerror = reject;
        fileReader.readAsDataURL(readFile);
      });

    const promises = Array.from(files).map((file) => reader(file));

    Promise.all(promises).then((results: string[]) => {
      setPreviewImages((prevImages: any) => [
        ...prevImages,
        ...results.map((result, index) => ({
          alt: files[index]?.name,
          src: result,
          _id: Math.floor(Math.random() * 1000),
        })),
      ]);
    });
  };

  // removeImagefromListButton
  const handleRemoveImageFromList = (item: string) => {
    const updatedImages = previewImages.filter(
      (image: any) => image.src !== item
    );
    setPreviewImages(updatedImages);
  };

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: parsedPostDetails?.title || "",
      content: parsedPostDetails?.content || "",
      image: parsedPostDetails?.image || "",
      tags: groupedTags || [],
      images: previewImages,
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 50) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 50 characters.",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue("tags", newTags);
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostSchema>) {
    setIsSubmitting(true);

    try {
      // console.log(values, preview.url);
      if (type === "Edit") {
        await editPost({
          postId: parsedPostDetails._id,
          title: values.title,
          content: values.content,
          image: preview.url,
          path: pathname,
          images: previewImages,
        });
        router.push(`/blog/${parsedPostDetails._id}`);
      } else {
        await createPost({
          title: values.title,
          content: values.content,
          tags: values.tags,
          image: preview.url,
          path: pathname,
          images: previewImages,
        });
        router.push(`/blog`);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Post Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Article Content <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={parsedPostDetails?.content || ""}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter |" +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Write the article content.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* photo preview */}
        <Avatar className="w-full">
          <AvatarImage
            src={preview.url}
            className="object-cover object-left-top"
          />
          <AvatarFallback>Your Photo</AvatarFallback>
        </Avatar>
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem>
                <FormLabel className="paragraph-semibold">
                  Article Photo <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...rest}
                    onChange={(e) => {
                      // @ts-ignore
                      handleImageChange(e.target.files[0]);
                    }}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border align-baseline"
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Maximum size of 10mb.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            </>
          )}
        />

        <div className="flex w-full flex-wrap">
          {previewImages &&
            previewImages.map((item: any) => (
              <TooltipProvider key={item._id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="w-1/3 p-2">
                      <AvatarImage
                        src={item.src}
                        className="object-cover object-left-top"
                      />
                      <AvatarFallback>Your Photo</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent className="background-light900_dark300">
                    <p
                      onClick={() => handleRemoveImageFromList(item.src)}
                      className="text-dark400_light800  cursor-pointer"
                    >
                      Remove
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem>
                <FormLabel className="paragraph-semibold">
                  Related Photos <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...rest}
                    multiple // Allow multiple file selection
                    onChange={(e) => {
                      // @ts-ignore
                      handleMultipleImageChange(e.target.files);
                    }}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border align-baseline"
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Maximum size of 10mb.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={type === "Edit"}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="mt-2.5 flex justify-start gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="subtle-medium background-light400_dark700 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize "
                          onClick={() =>
                            type !== "Edit"
                              ? handleTagRemove(tag, field)
                              : () => {}
                          }
                        >
                          {tag}
                          {type !== "Edit" && (
                            <Image
                              src="/assets/icons/close.svg"
                              alt="Close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain text-white "
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your article is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "Edit" ? "Saving..." : "Creating"}</>
          ) : (
            <>{type === "Edit" ? "Save" : "Create Article"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Post;
