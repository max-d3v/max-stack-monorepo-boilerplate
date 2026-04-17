import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { client } from "@workspace/rpc/orpc/orpc.client";
import { client as server } from "@workspace/rpc/orpc/orpc.server";

export const orpcServer = createTanstackQueryUtils(server);
export const orpcClient = createTanstackQueryUtils(client);
