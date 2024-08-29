"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Dashboard() {
  const { signOut } = useAuthActions();
  const user = useQuery(api.users.viewer);

  return (
    <main>
      <div>Dashboard Page</div>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <button
        onClick={() => signOut().then(() => window.location.replace("/signin"))}
      >
        Sign out
      </button>
    </main>
  );
}
