import ProtectedLayout from "@/components/ProtectedLayout";
import Sidebar from "@/components/sidebar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ProtectedLayout>
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>        
      </ProtectedLayout>    
    </div>
  );
}
