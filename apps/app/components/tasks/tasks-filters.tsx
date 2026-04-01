"use client";

import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import { Filter, Search, X } from "lucide-react";
import { type StatusFilter, statusConfig } from "./task-status-config";

interface TasksFiltersProps {
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (filter: StatusFilter) => void;
  searchQuery: string;
  statusFilter: StatusFilter;
}

export function TasksFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: TasksFiltersProps) {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pr-9 pl-9"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          value={searchQuery}
        />
        {searchQuery && (
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => onSearchChange("")}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2" variant="outline">
            <Filter className="h-4 w-4" />
            {statusFilter === "all" ? "All" : statusConfig[statusFilter].label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onStatusFilterChange("all")}>
            All Tasks
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilterChange("todo")}>
            To Do
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilterChange("in-progress")}>
            In Progress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilterChange("completed")}>
            Completed
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilterChange("cancelled")}>
            Cancelled
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
