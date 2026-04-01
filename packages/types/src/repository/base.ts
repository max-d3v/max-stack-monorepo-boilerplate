import { z } from "zod";

export type ListBaseParams = {
  pageNum?: number;
  pageSize?: number;
  search?: string;
};

export const listBaseParamsSchema = z.object({
  pageNum: z.number().optional(),
  pageSize: z.number().optional(),
  search: z.string().optional(),
});
