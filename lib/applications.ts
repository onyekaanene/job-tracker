import { createClient } from "@/lib/supabase/client";
import { Application, ApplicationStatus } from "@/types";

const supabase = createClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toApplication(row: Record<string, any>): Application {
  return {
    id: row.id,
    companyName: row.company_name,
    role: row.role,
    status: row.status as ApplicationStatus,
    appliedDate: row.applied_date || "",
    jobUrl: row.job_url || "",
    salary: row.salary || "",
    location: row.location || "",
    notes: row.notes || "",
    createdAt: row.created_at,
  };
}

export async function fetchApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(toApplication);
}

export async function insertApplication(
  app: Omit<Application, "id" | "createdAt">,
): Promise<Application> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: user!.id,
      company_name: app.companyName,
      role: app.role,
      status: app.status,
      applied_date: app.appliedDate,
      job_url: app.jobUrl,
      salary: app.salary,
      location: app.location,
      notes: app.notes,
    })
    .select()
    .single();

  if (error) throw error;
  return toApplication(data);
}

export async function updateApplicationInDb(
  id: string,
  updates: Partial<Application>,
): Promise<void> {
  const { error } = await supabase
    .from("applications")
    .update({
      ...(updates.companyName && { company_name: updates.companyName }),
      ...(updates.role && { role: updates.role }),
      ...(updates.status && { status: updates.status }),
      ...(updates.appliedDate !== undefined && {
        applied_date: updates.appliedDate,
      }),
      ...(updates.jobUrl !== undefined && { job_url: updates.jobUrl }),
      ...(updates.salary !== undefined && { salary: updates.salary }),
      ...(updates.location !== undefined && { location: updates.location }),
      ...(updates.notes !== undefined && { notes: updates.notes }),
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteApplicationFromDb(id: string): Promise<void> {
  const { error } = await supabase.from("applications").delete().eq("id", id);
  if (error) throw error;
}
