"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { Bell } from "lucide-react";

interface SettingsNotificationsProps {
  readonly emailNotifications: string | null | undefined;
  readonly onEmailNotificationsChange: (enabled: boolean) => void;
  readonly onTaskRemindersChange: (enabled: boolean) => void;
  readonly onWeeklyDigestChange: (enabled: boolean) => void;
  readonly taskReminders: string | null | undefined;
  readonly weeklyDigest: string | null | undefined;
}

export function SettingsNotifications({
  emailNotifications,
  taskReminders,
  weeklyDigest,
  onEmailNotificationsChange,
  onTaskRemindersChange,
  onWeeklyDigestChange,
}: SettingsNotificationsProps) {
  const isEmailEnabled = emailNotifications === "enabled";
  const isRemindersEnabled = taskReminders === "enabled";
  const isDigestEnabled = weeklyDigest === "enabled";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription>
          Choose what notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium text-sm">Email Notifications</div>
            <div className="text-muted-foreground text-sm">
              Get notified about important updates
            </div>
          </div>
          <Button
            onClick={() => onEmailNotificationsChange(!isEmailEnabled)}
            size="sm"
            variant={isEmailEnabled ? "default" : "outline"}
          >
            {isEmailEnabled ? "Enabled" : "Disabled"}
          </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium text-sm">Task Reminders</div>
            <div className="text-muted-foreground text-sm">
              Reminders for tasks with due dates
            </div>
          </div>
          <Button
            onClick={() => onTaskRemindersChange(!isRemindersEnabled)}
            size="sm"
            variant={isRemindersEnabled ? "default" : "outline"}
          >
            {isRemindersEnabled ? "Enabled" : "Disabled"}
          </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium text-sm">Weekly Digest</div>
            <div className="text-muted-foreground text-sm">
              Summary of your tasks every Monday
            </div>
          </div>
          <Button
            onClick={() => onWeeklyDigestChange(!isDigestEnabled)}
            size="sm"
            variant={isDigestEnabled ? "default" : "outline"}
          >
            {isDigestEnabled ? "Enabled" : "Disabled"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
