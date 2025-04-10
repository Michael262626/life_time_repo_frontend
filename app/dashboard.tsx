import DashboardContent from "@/components/dashboard-content";
import DashboardWelcome from "@/components/dashboard-welcome";
import DashboardHeader from "@/components/navbar";
import Sidebar from "@/components/sidebar";


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <DashboardWelcome />
          <div className="border-t border-b py-4 mb-8">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
