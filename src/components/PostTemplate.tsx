import React, { useState, useTransition } from "react";
import * as z from "zod";
import { createPostSchema } from "../../schemas";
import { TextField, Button } from "@mui/material";
import FormError from "@/components/Form-error";
import FormSuccess from "@/components/Form-success";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "../../actions/create-post";
import { useCurrentUser } from "@/hooks/use-current-user";

function PostTemplate() {
  type FormData = z.infer<typeof createPostSchema>;
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const user = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      description: "",
      userId: user?.id,
      department: user?.department,
    },
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createPost(data).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <form
      className="mb-8 bg-white p-6 rounded-xl w-[1693px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        id="filled-basic"
        placeholder="Title"
        variant="filled"
        className="w-full p-4 mb-2 border rounded text-gray"
        {...register("title")}
        disabled={isPending}
      />
      <TextField
        id="filled-basic"
        placeholder="Describe everything about this post here... #Tags"
        variant="filled"
        className="w-full p-4 border rounded h-32"
        multiline
        rows={3}
        {...register("description")}
        disabled={isPending}
      />
      <div className="flex justify-between items-center mt-2">
        <label className="p-2 border rounded">
          Attach
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={isPending}
          />
        </label>
        {fileName && <span className="ml-2">{fileName}</span>}
        <div>
          <Button className="p-2 mr-2 border rounded hover:bg-page-background">
            Cancel
          </Button>

          <Button
            type="submit"
            className="p-2 bg-secondary-color-blue text-white rounded hover:bg-sign-in-first-color"
          >
            Post
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </form>
  );
}

export default PostTemplate;
