export type ApplicationStatus =
  | "wishlist"
  | "applied"
  | "interview"
  | "offer"
  | "rejected";

export type Application = {
  id: string;
  companyName: string;
  role: string;
  status: ApplicationStatus;
  appliedDate: string;
  jobUrl?: string; // the ? means this field is optional
  notes?: string;
  salary?: string;
  location?: string;
  createdAt: string;
};
