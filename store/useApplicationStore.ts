import { create } from "zustand";
import { Application, ApplicationStatus } from "@/types";
import {
  fetchApplications,
  insertApplication,
  updateApplicationInDb,
  deleteApplicationFromDb,
} from "@/lib/applications";

type ApplicationStore = {
  applications: Application[];
  loading: boolean;
  loadApplications: () => Promise<void>;
  addApplication: (app: Omit<Application, "id" | "createdAt">) => Promise<void>;
  updateApplication: (
    id: string,
    updates: Partial<Application>,
  ) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  moveApplication: (id: string, newStatus: ApplicationStatus) => Promise<void>;
};

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
  applications: [],
  loading: false,

  loadApplications: async () => {
    set({ loading: true });
    const applications = await fetchApplications();
    set({ applications, loading: false });
  },

  addApplication: async (app) => {
    const newApp = await insertApplication(app);
    set((state) => ({ applications: [newApp, ...state.applications] }));
  },

  updateApplication: async (id, updates) => {
    await updateApplicationInDb(id, updates);
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, ...updates } : app,
      ),
    }));
  },

  deleteApplication: async (id) => {
    await deleteApplicationFromDb(id);
    set((state) => ({
      applications: state.applications.filter((app) => app.id !== id),
    }));
  },

  moveApplication: async (id, newStatus) => {
    await updateApplicationInDb(id, { status: newStatus });
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app,
      ),
    }));
  },
}));
