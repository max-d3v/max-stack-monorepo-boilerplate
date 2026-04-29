import { tenantRoles } from "@workspace/database/schema";
import { z } from "zod";

export const tenantRolesSchema = z.enum(tenantRoles.enumValues);
export type TenantRole = z.infer<typeof tenantRolesSchema>;