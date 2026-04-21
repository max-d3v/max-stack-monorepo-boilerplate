"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination";
import { useTasksContext } from "./context";

export function TasksPagination() {
  const {
    currentPage,
    totalPages,
    setCurrentPage: onPageChange,
  } = useTasksContext();

  if (totalPages <= 1) {
    return null;
  }
  const getVisiblePages = () => {
    const delta = 2;
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const shouldShowStartEllipsis = currentPage - delta > 2;
    const shouldShowEndEllipsis = currentPage + delta < totalPages - 1;

    return [
      ...(shouldShowStartEllipsis ? [1, "..."] : [1]),
      ...range,
      ...(shouldShowEndEllipsis
        ? ["...", totalPages]
        : showTotalPages(totalPages)),
    ];
  };

  function showTotalPages(pages: number) {
    return pages > 1 ? [pages] : [];
  }

  const visiblePages = getVisiblePages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                className="cursor-pointer"
                isActive={currentPage === page}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
