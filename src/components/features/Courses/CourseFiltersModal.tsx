import { Button } from "@/components/shared/Button";
import { Checkbox } from "@/components/shared/checkbox";
import { Label } from "@/components/shared/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import { Slider } from "@/components/shared/slider";

interface CourseFiltersModalProps {
  onOpenChange: (open: boolean) => void;
}

export function CourseFiltersModal({ onOpenChange }: CourseFiltersModalProps) {
  return (
    <>
      <div className="space-y-6 py-4">
        {/* Level Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Level</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox id="beginner" />
              <label
                htmlFor="beginner"
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Beginner (A1)
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="elementary" />
              <label
                htmlFor="elementary"
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Elementary (A2)
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="intermediate" />
              <label
                htmlFor="intermediate"
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Intermediate (B1)
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="advanced" />
              <label
                htmlFor="advanced"
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Advanced (C1)
              </label>
            </div>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Price Range (EGP)</Label>
          <div className="space-y-4 px-2">
            <Slider
              defaultValue={[0, 10000]}
              max={10000}
              step={100}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>0 EGP</span>
              <span>10,000 EGP</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <Label htmlFor="category" className="text-base font-semibold">
            Category
          </Label>
          <Select>
            <SelectTrigger id="category" className="w-full py-6">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="languages">Languages</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Duration Filter */}
        <div className="space-y-3">
          <Label htmlFor="duration" className="text-base font-semibold">
            Duration
          </Label>
          <Select>
            <SelectTrigger id="duration" className="w-full py-6">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-4">0-4 weeks</SelectItem>
              <SelectItem value="4-8">4-8 weeks</SelectItem>
              <SelectItem value="8-12">8-12 weeks</SelectItem>
              <SelectItem value="12+">12+ weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Minimum Rating</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox id="rating-4" />
              <label
                htmlFor="rating-4"
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                4+ Stars
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="rating-3" />
              <label
                htmlFor="rating-3"
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                3+ Stars
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 border-t pt-4">
        <Button
          variant="outline"
          className="flex-1 py-6"
          onClick={() => onOpenChange(false)}
        >
          Clear All
        </Button>
        <Button
          className="flex-1 bg-[#0A4275] py-6 hover:bg-[#083658]"
          onClick={() => onOpenChange(false)}
        >
          Apply Filters
        </Button>
      </div>
    </>
  );
}
