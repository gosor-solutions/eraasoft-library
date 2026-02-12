"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { useState } from "react";
import { CoursesTab } from "./CoursesTab";
import { LanguagesTab } from "./LanguagesTab";
import { PersonalDataTab } from "./PersonalDataTab";

export function ProfileTabs() {
  const [selectedTab, setSelectedTab] = useState("personal-data");

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-20">
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="mb-8 w-full justify-start border-b bg-transparent p-0">
          <TabsTrigger
            value="personal-data"
            className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-b-brand-primary data-[state=active]:bg-transparent data-[state=active]:text-brand-primary"
          >
            Personal Data
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-b-brand-primary data-[state=active]:bg-transparent data-[state=active]:text-brand-primary"
          >
            Courses
          </TabsTrigger>
          <TabsTrigger
            value="language"
            className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-b-brand-primary data-[state=active]:bg-transparent data-[state=active]:text-brand-primary"
          >
            Language
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal-data" className="mt-0">
          <PersonalDataTab />
        </TabsContent>

        <TabsContent value="courses" className="mt-0">
          <CoursesTab />
        </TabsContent>

        <TabsContent value="language" className="mt-0">
          <LanguagesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
