import AppLayout from "@/components/layout/AppLayout";
import SettingsForm from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account preferences.</p>
      </div>
      <SettingsForm />
    </AppLayout>
  );
}
