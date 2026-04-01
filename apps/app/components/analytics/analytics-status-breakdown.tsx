"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import type { LucideIcon } from "lucide-react";

interface StatusBreakdownItem {
  readonly color: string;
  readonly count: number;
  readonly icon: LucideIcon;
  readonly percentage: number;
  readonly status: string;
}

interface AnalyticsStatusBreakdownProps {
  readonly statusBreakdown: readonly StatusBreakdownItem[];
}

export function AnalyticsStatusBreakdown({
  statusBreakdown,
}: AnalyticsStatusBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Breakdown</CardTitle>
        <CardDescription>
          Distribution of tasks by current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statusBreakdown.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.status}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${item.color}`} />
                    <span className="font-medium text-sm">{item.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{item.count}</span>
                    <span className="text-muted-foreground text-xs">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
