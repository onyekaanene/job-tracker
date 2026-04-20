import AppLayout from "@/components/layout/AppLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import ApplicationsChart from "@/components/dashboard/ApplicationsChart";
import RecentApplications from "@/components/dashboard/RecentApplications";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back 👋</h2>
        <p className="text-gray-500 mt-1">
          Here's a summary of your job search.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationsChart />
        <RecentApplications />
      </div>
    </AppLayout>
  );
}
