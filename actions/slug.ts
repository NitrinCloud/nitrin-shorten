"use server";

import { db } from "@/lib/db";
import { urls } from "@/lib/db/schema";
import { slugSchema } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function createSlug(prevState: any, formData: FormData) {
  const parsedData = slugSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    return {
      message: "Wrong format",
    };
  }

  const { url } = parsedData.data;
  const slug = await generateSlug();
  await db.insert(urls).values({
    url,
    slug,
  });

  return {
    success: true,
    slug,
  };
}

async function generateSlug() {
  const slug = generateRandomString(6);
  if (
    await db.query.urls.findFirst({
      where: eq(urls.slug, slug),
    })
  ) {
    return generateSlug();
  }
  return slug;
}

function generateRandomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
