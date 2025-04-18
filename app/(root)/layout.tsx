import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobilenav";
import { MainSidebar } from "@/components/layout/main-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className='min-h-screen min-w-[100%] bg-gradient-to-br from-[#05264c] to-[#041c38] text-foreground relative'>
        <MainSidebar />
        <Navbar />
        <main className='pt-16 pb-16 md:pb-0 md:pl-64 min-h-screen transition-all duration-500 px-2 sm:px-6 py-6'>
          {children}
        </main>
        <MobileNav />
      </div>
    </SidebarProvider>
  );
}

export function generateMetadata() {
  return {
    title: "e-Sarif | Multi-Wallet Financial Platform",
    description: "Manage your mobile money and crypto wallets in one place.",
  };
}
