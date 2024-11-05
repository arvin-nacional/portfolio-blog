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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ProjectSchema } from "@/lib/validations";
import { createProject, updateProject } from "@/lib/actions/project.action";
import { formatDateInput } from "@/lib/utils";

interface Props {
  type?: string;
  projectDetails?: string;
  projectId?: string;
}

const Project = ({ type, projectDetails, projectId }: Props) => {
  // convert projectDetails to object
  const parsedProjectDetails = projectDetails
    ? JSON.parse(projectDetails || "")
    : null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const [preview, setPreview] = useState({
    name: "default",
    url: `${
      parsedProjectDetails?.mainImage
        ? parsedProjectDetails.mainImage
        : "https://res.cloudinary.com/dey07xuvf/image/upload/v1729222998/Slide_16_9_-_2_ro7dnm.png"
    }`,
  });

  const [previewImages, setPreviewImages] = useState(
    parsedProjectDetails?.images ? parsedProjectDetails.images : []
  );

  const groupedCategories = parsedProjectDetails?.category.map(
    (tag: any) => tag.name
  );

  const groupedSoftwareUsed = parsedProjectDetails?.softwareUsed.map(
    (item: any) => item
  );

  // convert image to string
  const handleMainImageChange = (file: File) => {
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

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: parsedProjectDetails?.title || "",
      content: parsedProjectDetails?.content || "",
      mainImage: parsedProjectDetails?.mainImage || "",
      category: groupedCategories || [],
      clientName: parsedProjectDetails?.clientName || "",
      softwareUsed: groupedSoftwareUsed || [],
      images: previewImages,
      dateFinished:
        formatDateInput(parsedProjectDetails?.dateFinished.toString()) || "",
      url: parsedProjectDetails?.url || "",
    },
  });

  // removeImagefromListButton
  const handleRemoveImageFromList = (item: string) => {
    const updatedImages = previewImages.filter(
      (image: any) => image.src !== item
    );
    setPreviewImages(updatedImages);
  };

  const handleInputKeyDownCategory = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "category") {
      e.preventDefault();

      const categoryInput = e.target as HTMLInputElement;
      const categoryValue = categoryInput.value.trim();

      if (categoryValue !== "") {
        if (categoryValue.length > 30) {
          return form.setError("category", {
            type: "required",
            message: "Cateogry must be less than 30 characters.",
          });
        }

        if (!field.value.includes(categoryValue as never)) {
          form.setValue("category", [...field.value, categoryValue]);
          categoryInput.value = "";
          form.clearErrors("category");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleInputKeyDownSoftwareUsed = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "softwareUsed") {
      e.preventDefault();

      const softwareUsedInput = e.target as HTMLInputElement;
      const softwareUsedValue = softwareUsedInput.value.trim();

      if (softwareUsedValue !== "") {
        if (softwareUsedValue.length > 30) {
          return form.setError("softwareUsed", {
            type: "required",
            message: "Tag must be less than 30 characters.",
          });
        }

        if (!field.value.includes(softwareUsedValue as never)) {
          form.setValue("softwareUsed", [...field.value, softwareUsedValue]);
          softwareUsedInput.value = "";
          form.clearErrors("softwareUsed");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemoveCategory = (tag: string, field: any) => {
    const newCategories = field.value.filter((t: string) => t !== tag);

    form.setValue("category", newCategories);
  };
  const handleTagRemoveSoftwareUsed = (tag: string, field: any) => {
    const newSoftwareUsed = field.value.filter((t: string) => t !== tag);

    form.setValue("softwareUsed", newSoftwareUsed);
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProjectSchema>) {
    setIsSubmitting(true);

    try {
      if (type === "Edit") {
        await updateProject({
          projectId: parsedProjectDetails._id,
          title: values.title,
          content: values.content,
          mainImage: preview.url,
          clientName: values.clientName,
          softwareUsed: values.softwareUsed,
          images: previewImages,
          dateFinished: values.dateFinished,
          path: pathname,
          url: values.url,
        });
        router.push(`/projects/${parsedProjectDetails._id}`);
      } else {
        await createProject({
          title: values.title,
          content: values.content,
          category: values.category,
          mainImage: preview.url,
          clientName: values.clientName,
          softwareUsed: values.softwareUsed,
          images: previewImages,
          dateFinished: values.dateFinished,
          path: pathname,
          url: values.url,
        });
        router.push("/projects");
      }

      // router.push(`/projects/${parsedProjectDetails?._id}`);
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
                Project Title <span className="text-primary-500">*</span>
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
          name="category"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Category <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={type === "Edit"}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add category..."
                    onKeyDown={(e) => handleInputKeyDownCategory(e, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="mt-2.5 flex justify-start gap-2.5">
                      {field.value.map((category: any) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="subtle-medium  flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize "
                          onClick={() =>
                            type !== "Edit"
                              ? handleTagRemoveCategory(category, field)
                              : () => {}
                          }
                        >
                          {category}
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
                Add up to 3 category to describe what your project is about. You
                need to press enter to add a category.
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
                Project Content <span className="text-primary-500">*</span>
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
                  initialValue={parsedProjectDetails?.content || ""}
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
          name="mainImage"
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem>
                <FormLabel className="paragraph-semibold">
                  Project Photo <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...rest}
                    onChange={(e) => {
                      // @ts-ignore
                      handleMainImageChange(e.target.files[0]);
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
          name="dateFinished"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Date Finished MM/DD/YYYY{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your the date you finished the project.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="softwareUsed"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Sotware Used <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={type === "Edit"}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDownSoftwareUsed(e, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="mt-2.5 flex justify-start gap-2.5">
                      {field.value.map((softwareUsed: any) => (
                        <Badge
                          key={softwareUsed}
                          variant="secondary"
                          className="subtle-medium background-light400_dark700 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize "
                          onClick={() =>
                            type !== "Edit"
                              ? handleTagRemoveSoftwareUsed(softwareUsed, field)
                              : () => {}
                          }
                        >
                          {softwareUsed}
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
                Add up to 3 category to describe what your project is about. You
                need to press enter to add a category.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Client Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter client name.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Website Link <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter website link.
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
            <>{type === "Edit" ? "Save" : "Create Project"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Project;
