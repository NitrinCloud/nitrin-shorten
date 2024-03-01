"use client";

import { createSlug } from "@/actions/slug";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Copy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Home() {
  const [value, setValue] = useState<string | null>(null);
  const [state, formAction] = useFormState(createSlug, undefined);

  useEffect(() => {
    if (state?.success) {
      setValue(null);
    }
  }, [state]);

  return (
    <main className="flex h-full flex-col items-center justify-center p-24">
      <div className="flex flex-col gap-12">
        <h1 className="text-6xl font-bold">Shorten your link</h1>
        {state?.success && (
          <Alert className="relative">
            <AlertTitle>Link shortened!</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col gap-2">
                <p>Your new link is ready to use!</p>
                <Link
                  href={"/" + state.slug}
                  target="_blank"
                  className="underline"
                >
                  https://short.nitrin.dev/{state.slug}
                </Link>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-0 m-2"
                onClick={() =>
                  navigator.clipboard.writeText(
                    "https://short.nitrin.dev/" + state.slug,
                  )
                }
              >
                <Copy className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}
        {state?.message && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Could not shorten link</AlertDescription>
          </Alert>
        )}
        <form
          className="flex items-center justify-center gap-6"
          action={formAction}
        >
          <div>
            <Label htmlFor="url" className="sr-only">
              URL
            </Label>
            <Input
              type="url"
              placeholder="URL"
              name="url"
              id="url"
              className="min-w-96"
              value={value ?? ""}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <SubmitButton />
        </form>
      </div>
    </main>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "..." : "Create"}
    </Button>
  );
};
