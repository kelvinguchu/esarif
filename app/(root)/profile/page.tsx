import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileActions } from "@/components/profile/profile-actions";
import { ProfileInfo } from "@/components/profile/profile-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "e-Sarif | My Profile",
  description: "Manage your personal information and account settings",
};

export default function ProfilePage() {
  return (
    <div className='w-full min-h-screen bg-gray-50 pb-12'>
      <div className='container mx-auto px-4 py-6 max-w-7xl'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>My Profile</h1>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
          {/* Left sidebar with account menu */}
          <div className='lg:col-span-3 order-2 lg:order-1'>
            <div className='sticky top-6'>
              <ProfileActions />
            </div>
          </div>

          {/* Main content area */}
          <div className='lg:col-span-9 order-1 lg:order-2 space-y-6'>
            <ProfileHeader />
            <ProfileInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
