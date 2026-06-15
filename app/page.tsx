import { redirect } from "next/navigation";

// Redirect to Dashboard page
export default function Home() {
  redirect("/dashboard");
}
