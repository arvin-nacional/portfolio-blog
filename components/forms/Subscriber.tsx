"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubscriberFormSchema } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addSubscriber } from "@/lib/actions/subscriber.action";
import { usePathname } from "next/navigation";
import { toast } from "../ui/use-toast";

const Subscriber = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      await addSubscriber({ email: values.email, path: pathname });
      console.log(values);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        // 3. Clear the form after submitting.
        form.reset();
        toast({
          variant: "default",
          title: "Subscribed",
          description: "You have successfully subscribed to our newsletter",
        });
      }, 1000);
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
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              {/* <FormDescription>Enter your email</FormDescription> */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

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
