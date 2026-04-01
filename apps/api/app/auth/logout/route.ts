import { logger, withAxiom } from "@workspace/observability";
import type { ApiErrorResponse, LogoutResponse } from "@workspace/types";
import { type NextRequest, NextResponse } from "next/server";

export const POST = withAxiom(
  async (
    req: NextRequest
  ): Promise<NextResponse<LogoutResponse | ApiErrorResponse>> => {
    const startTime = Date.now();

    const duration = Date.now() - startTime;
    logger.info("User logged out", {
      duration,
    });

    const responseData: LogoutResponse = {
      success: true,
      data: { loggedOut: true },
      message: "Logged out successfully",
    };

    // Return response without clearing cookies - client will clear localStorage
    return NextResponse.json(responseData);
  }
);
