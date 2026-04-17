import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { client } from "@workspace/rpc/orpc/orpc.client";

export const orpcClient = createTanstackQueryUtils(client);
