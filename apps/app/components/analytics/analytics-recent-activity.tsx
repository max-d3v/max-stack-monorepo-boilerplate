"use client";

import type { Task } from "@workspace/types/use-cases/tasks";
import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

interface RecentActivityItem {
  readonly date: string;
  readonly status: Task["status"];
  readonly title: string;
}

interface AnalyticsRecentActivityProps {
  readonly recentActivity: readonly RecentActivityItem[];
}

const getStatusLabel = (status: Task["status"]): string => {
  switch (status) {
    case "todo":
      return "To Do";
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
  }
};

const getStatusVariant = (
  status: Task["status"]
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export function AnalyticsRecentActivity({
  recentActivity,
}: AnalyticsRecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest task updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, idx) => (
              <div
                className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
                key={idx}
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm leading-none">
                    {activity.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {activity.date}
                  </p>
                </div>
                <Badge variant={getStatusVariant(activity.status)}>
                  {getStatusLabel(activity.status)}
                </Badge>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-muted-foreground text-sm">
              No recent activity
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
