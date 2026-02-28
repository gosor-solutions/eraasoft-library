import { Button } from "@/components/shared/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/dialog";
import { Input } from "@/components/shared/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { CourseFiltersModal } from "./CourseFiltersModal";

export function CoursePageHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        {/* Search Input */}
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search"
            className="w-full py-6 pl-4 pr-12"
          />
          <Button
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#0A4275] hover:bg-[#083658]"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Button */}
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="flex items-center gap-2 px-6 py-6"
        >
          <span>Filter</span>
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Filters</DialogTitle>
          </DialogHeader>
          <CourseFiltersModal onOpenChange={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
