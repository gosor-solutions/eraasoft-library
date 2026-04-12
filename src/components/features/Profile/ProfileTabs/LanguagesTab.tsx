import { Label } from "@/components/shared/label";
import { RadioGroup, RadioGroupItem } from "@/components/shared/radio-group";

export function LanguagesTab() {
  return (
    <div className="rounded-lg bg-white p-6 border-2 md:p-8">
      <h2 className="text-xl font-bold">Language</h2>

      <div className="w-full space-y-4">
        <h3 className="text-base font-semibold">Language</h3>

        <RadioGroup defaultValue="english" className="space-y-3">
          {/* Arabic Option */}
          <Label
            htmlFor="arabic"
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🇸🇦</span>
              <p className="cursor-pointer text-base font-normal">Arabic</p>
            </div>
            <RadioGroupItem value="arabic" id="arabic" />
          </Label>

          {/* English Option */}
          <Label
            htmlFor="english"
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-blue-50 p-4 transition-colors hover:bg-blue-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🇺🇸</span>
              <p className="cursor-pointer text-basye font-normal">English</p>
            </div>
            <RadioGroupItem value="english" id="english" />
          </Label>
        </RadioGroup>
      </div>
    </div>
  );
}
