"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") return <p>Login first</p>;
  if (status === "loading") return <p>Loading</p>;
  return <h3>Welcome to Dashboard , {session.user.name}</h3>;
};

export default Dashboard;
