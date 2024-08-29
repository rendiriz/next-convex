"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { navigate } from "./actions";

export default function Signup() {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const flow = formData.get("flow") as string;

    try {
      await signIn("password-code", {
        email,
        password,
        flow,
      });
      // Manually update the URL without navigating
      window.history.pushState({}, "", "/dashboard");
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <main className="p-6">
      <h1>Signin Page</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input name="email" id="email" type="text" autoComplete="email" />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            autoComplete="new-password"
          />
        </div>
        <input name="flow" value="signIn" type="hidden" />

        <button type="submit" disabled={submitting}>
          Sign in
        </button>
      </form>
    </main>
  );
}
