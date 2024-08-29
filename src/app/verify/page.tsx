"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { navigate } from "./actions";

export default function Verify() {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    signIn("password-code", formData)
      .then(() => {
        navigate();
      })
      .catch((error) => {
        console.error(error);
        setSubmitting(false);
      });
  };

  return (
    <main>
      <div>Verify Page</div>
      <div>Check your email</div>
      <div>Enter the 8-digit code we sent to your email address.</div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="code">Code</label>
          <input name="code" id="code" type="text" />
        </div>
        <input name="email" value="test@gmail.com" />
        <input name="flow" value="email-verification" type="hidden" />

        <button type="submit" disabled={submitting}>
          Continue
        </button>
      </form>
    </main>
  );
}
