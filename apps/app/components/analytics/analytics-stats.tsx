"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { BarChart3, Calendar, Target, TrendingUp } from "lucide-react";

interface AnalyticsStatsProps {
  readonly completedThisWeek: number;
  readonly completionRate: number;
  readonly tasksThisMonth: number;
  readonly tasksThisWeek: number;
  readonly total: number;
}

export function AnalyticsStats({
  tasksThisWeek,
  tasksThisMonth,
  completedThisWeek,
  completionRate,
  total,
}: AnalyticsStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 font-medium text-sm">
            <TrendingUp className="h-4 w-4" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">{tasksThisWeek}</div>
          <p className="text-muted-foreground text-xs">
            {completedThisWeek} completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 font-medium text-sm">
            <Calendar className="h-4 w-4" />
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">{tasksThisMonth}</div>
          <p className="text-muted-foreground text-xs">Tasks created</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 font-medium text-sm">
            <Target className="h-4 w-4" />
            Completion Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl text-green-500">
            {completionRate}%
          </div>
          <p className="text-muted-foreground text-xs">Overall progress</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 font-medium text-sm">
            <BarChart3 className="h-4 w-4" />
            Total Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">{total}</div>
          <p className="text-muted-foreground text-xs">All time</p>
        </CardContent>
      </Card>
    </div>
  );
}
