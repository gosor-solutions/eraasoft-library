import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { useState } from "react";
import { CoursesTab } from "./CoursesTab";
import { PersonalDataTab } from "./PersonalDataTab";

const triggerClass =
  "rounded-none border-b-2 border-transparent px-3 sm:px-6 py-3 text-sm sm:text-base whitespace-nowrap data-[state=active]:border-b-brand-primary data-[state=active]:bg-transparent data-[state=active]:text-brand-primary";

export function ProfileTabs() {
  const [selectedTab, setSelectedTab] = useState("personal-data");

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12">
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="mb-6 w-full justify-start border-b bg-transparent p-0 overflow-x-auto scrollbar-none">
          <TabsTrigger value="personal-data" className={triggerClass}>
            Personal Data
          </TabsTrigger>
          <TabsTrigger value="courses" className={triggerClass}>
            Courses
          </TabsTrigger>
          {/* <TabsTrigger value="language" className={triggerClass}>
            Language
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="personal-data" className="mt-0">
          <PersonalDataTab />
        </TabsContent>

        <TabsContent value="courses" className="mt-0">
          <CoursesTab />
        </TabsContent>
{/* 
        <TabsContent value="language" className="mt-0">
          <LanguagesTab />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
