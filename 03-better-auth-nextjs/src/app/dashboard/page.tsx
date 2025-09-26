import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/signin");
  }
  console.log("session", session);
  return <div>Welcome, {session.user.name}!</div>;
};

export default Dashboard;
