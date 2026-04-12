import { ProfileHeader } from "@/components/features/Profile/ProfileHeader";
import { ProfileTabs } from "@/components/features/Profile/ProfileTabs/ProfileTabs";

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <ProfileHeader />
      <div className="pt-20 md:pt-28">
        <ProfileTabs />
      </div>
    </div>
  );
}
