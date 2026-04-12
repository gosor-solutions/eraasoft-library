import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useSearchParams } from "react-router";
import { Button } from "./button";

interface PaginationProps {
  meta: {
    current_page: number;
    last_page: number;
  };
}

export function Pagination({
  meta: { current_page, last_page },
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (last_page <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > last_page) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const pages: (number | string)[] = [];
  for (let i = 1; i <= last_page; i++) {
    if (
      i === 1 ||
      i === last_page ||
      (i >= current_page - 1 && i <= current_page + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(current_page - 1)}
        disabled={current_page <= 1}
      >
        <ChevronLeft className="size-4" />
      </Button>

      {pages.map((p, idx) => (
        <Button
          key={idx}
          variant={p === current_page ? "default" : "outline"}
          size={typeof p === "number" ? "icon" : "sm"}
          onClick={() =>
            typeof p === "number" ? handlePageChange(p) : undefined
          }
          disabled={p === "..."}
          className={
            p === "..."
              ? "border-transparent bg-transparent shadow-none pointer-events-none"
              : ""
          }
        >
          {p === "..." ? <MoreHorizontal className="size-4" /> : p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(current_page + 1)}
        disabled={current_page >= last_page}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
