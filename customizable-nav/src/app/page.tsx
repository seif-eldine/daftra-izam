import { redirect } from "next/navigation";

export default function HomePage() {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  redirect("/dashboard");
}
