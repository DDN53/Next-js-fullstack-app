"use client";
import { TextField, Button, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "@/app/validationSchema";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Snipper from "@/app/components/Snipper";
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = async (data: IssueForm) => {
    try {
      setIsLoading(true);
      await axios.post("/api/issues", data);
      router.push("/issue");
    } catch (error) {
      setIsLoading(false);
      setError("An unexpeted error occured");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className=" mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          placeholder="Title…"
          {...register("title", { required: false })}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div>
              <SimpleMDE {...field} placeholder="Description…" />

              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </div>
          )}
        />
        <Button
          style={{ background: "yellowgreen" }}
          type="submit"
          disabled={isLoading}
        >
          Submit new issue{isLoading && <Snipper></Snipper>}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
