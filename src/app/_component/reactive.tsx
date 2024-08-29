"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Reactive() {
  const messages = useQuery(api.messages.list);

  return (
    <main>{messages?.map(({ _id, body }) => <div key={_id}>{body}</div>)}</main>
  );
}
