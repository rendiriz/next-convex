"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation } from "convex/react";
import { navigate } from "./actions";
import { api } from "../../../convex/_generated/api";

export default function Signup() {
  const { signIn } = useAuthActions();
  const register = useMutation(api.users.register);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    signIn("password", formData)
      .then(async () => {
        // navigate();
        await register({
          name: formData.get("name") as string,
        });
        window.location.replace("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        setSubmitting(false);
      });
  };

  return (
    <main className="p-6">
      <h1>Signup Page</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input name="name" id="name" type="text" />
        </div>
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
        <input name="flow" value="signUp" type="hidden" />

        <button type="submit" disabled={submitting}>
          Sign up
        </button>
      </form>
    </main>
  );
}
