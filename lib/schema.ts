import { z } from "zod";

export const slugSchema = z.object({
  url: z.string().url(),
});
