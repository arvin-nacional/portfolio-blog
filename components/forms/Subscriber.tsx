"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubscriberFormSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addSubscriber } from "@/lib/actions/subscriber.action";
import { usePathname } from "next/navigation";
import { toast } from "../ui/use-toast";

interface Props {
  type: string;
}
const Subscriber = ({ type }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const pathname = usePathname();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SubscriberFormSchema>>({
    resolver: zodResolver(SubscriberFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SubscriberFormSchema>) {
    try {
      // Do something with the form values.
      setIsSubmitting(true);
      setSubmitError("");
      const result = await addSubscriber({
        email: values.email,
        path: pathname,
      });
      if (!result.success) {
        setSubmitError(result.message || "Please try again.");
        return;
      }
      form.reset();
      toast({
        title: "Subscribed",
        description: "You have successfully subscribed to the newsletter.",
      });
    } catch (error) {
      setSubmitError("We couldn't save your subscription. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark300_light700">
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  disabled={isSubmitting}
                  placeholder="Enter your email address"
                  {...field}
                  className={cn(
                    type === "sidebar"
                      ? "paragraph-regular min-h-[56px] border border-light-500 text-dark-200 bg-light-800 focus-visible:ring-blue-400"
                      : "paragraph-regular min-h-[56px] border border-dark-500 bg-dark-300 text-light-700 focus-visible:ring-blue-400",
                  )}
                />
              </FormControl>
              {/* <FormDescription>Enter your email</FormDescription> */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {submitError && (
          <p role="alert" className="text-sm text-red-400">
            {submitError}
          </p>
        )}
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
};

export default Subscriber;
