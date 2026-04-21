"use client";

import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";

const STAT_CARD_KEYS = ["stat-1", "stat-2", "stat-3", "stat-4"];
const CHART_CARD_KEYS = ["chart-1", "chart-2"];
const CHART_ROW_KEYS = ["row-1", "row-2", "row-3", "row-4"];

export function AnalyticsLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
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
      <div className="grid gap-6 lg:grid-cols-2">
        {CHART_CARD_KEYS.map((key) => (
          <Card key={key}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {CHART_ROW_KEYS.map((rowKey) => (
                  <Skeleton className="h-12 w-full" key={`${key}-${rowKey}`} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
