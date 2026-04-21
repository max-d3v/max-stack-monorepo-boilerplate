"use client";

import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";

const STAT_CARD_KEYS = ["stat-1", "stat-2", "stat-3", "stat-4"];
const TASK_PREVIEW_KEYS = ["task-1", "task-2", "task-3"];

export function DashboardLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center gap-4 rounded-lg border p-6">
        <Skeleton className="h-16 w-16 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {STAT_CARD_KEYS.map((key) => (
          <Card key={key}>
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {TASK_PREVIEW_KEYS.map((key) => (
              <div
                className="flex items-start gap-3 rounded-lg border p-4"
                key={key}
              >
                <Skeleton className="mt-0.5 h-5 w-5 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
