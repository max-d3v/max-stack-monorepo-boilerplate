import { tenantRole } from "@workspace/database/schema";
import { z } from "zod";

export const tenantRoleSchema = z.enum(tenantRole.enumValues);
export type TenantRole = z.infer<typeof tenantRoleSchema>;
