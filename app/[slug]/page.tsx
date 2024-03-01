import { db } from "@/lib/db";
import { urls } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await db.query.urls.findFirst({
    where: eq(urls.slug, params.slug),
  });

  if (data) {
    redirect(data.url);
  }

  return (
    <div>
      <h1>Page</h1>
    </div>
  );
};

export default Page;
