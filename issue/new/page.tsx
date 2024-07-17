"use client";
import { TextField, Button } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issue");
    } catch (error) {
      console.error("Failed to submit issue", error);
    }
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root
        placeholder="Title…"
        {...register("title", { required: false })}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="Description…" />
        )}
      />
      <Button style={{ background: "yellowgreen" }} type="submit">
        Submit new issue
      </Button>
    </form>
  );
};

export default NewIssuePage;
