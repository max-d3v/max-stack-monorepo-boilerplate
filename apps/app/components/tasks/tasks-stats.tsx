"use client";

import type { TasksListResponse } from "@workspace/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

interface TasksStatsProps {
  data: TasksListResponse;
}

export function TasksStats({ data }: TasksStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-medium text-sm">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">{data.total || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-medium text-sm">To Do</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl text-muted-foreground">
            {data.todo || 0}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-medium text-sm">In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl text-blue-500">
            {data.inProgress || 0}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-medium text-sm">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl text-green-500">
            {data.completed || 0}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
