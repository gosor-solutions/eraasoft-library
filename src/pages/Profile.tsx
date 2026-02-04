import { ProfileHeader } from "@/components/features/Profile/ProfileHeader";
import { ProfileTabs } from "@/components/features/Profile/ProfileTabs/ProfileTabs";

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  );
}
