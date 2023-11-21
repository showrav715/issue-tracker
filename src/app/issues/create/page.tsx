"use client";

import { Flex, Button, TextField, Card, Callout } from "@radix-ui/themes";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { useState } from "react";

type Inputs = {
  title: string;
  description: string;
};

function IssueCreate() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, control } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      fetch("/api/issue", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) {
          setError("Something went wrong");
        }else{
          router.push("/", { scroll: false });
        }
        
      });
    } catch (e) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="container px-44">
      <Flex direction="column" gap="4">
        <Link href="/">
          <Button ml="3" color="red" className="w-32">
            Back
          </Button>
        </Link>

        <Card className="flex flex-col p-5 ">
          {error && (
            <Callout.Root className="mb-2" color="red">
              <Callout.Text>
                {error}
              </Callout.Text>
            </Callout.Root>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl">Create Isshu</h1>
            <TextField.Root className="my-2">
              <TextField.Input
                placeholder="Search the docs…"
                {...register("title")}
              />
            </TextField.Root>

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <SimpleMDE placeholder="Descripion" {...field} />
              )}
            />

            <div className="text-right">
              <Button color="green" className="w-32">
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </Flex>
    </div>
  );
}

export default IssueCreate;
