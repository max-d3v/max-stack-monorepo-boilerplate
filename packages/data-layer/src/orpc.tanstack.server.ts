import "server-only";

import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { client as server } from "@workspace/rpc/orpc/orpc.server";

export const orpcServer = createTanstackQueryUtils(server);
