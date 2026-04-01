import { getCurrentUser } from "@workspace/auth/server";
import { logger, withAxiom } from "@workspace/observability";
import type { ApiErrorResponse, AuthResponse } from "@workspace/types";
import { type NextRequest, NextResponse } from "next/server";

export const GET = withAxiom(
  async (
    req: NextRequest
  ): Promise<NextResponse<AuthResponse | ApiErrorResponse>> => {
    const startTime = Date.now();

    const user = await getCurrentUser(req);

    const duration = Date.now() - startTime;
    logger.info("User profile requested", {
      userId: user?.id,
      duration,
    });

    const response: AuthResponse = {
      success: true,
      data: user,
    };

    return NextResponse.json(response);
  }
);
