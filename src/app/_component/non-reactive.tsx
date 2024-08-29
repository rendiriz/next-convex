import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";

export default async function NonReactive() {
  const messages = await fetchQuery(api.messages.list);

  return (
    <main>{messages?.map(({ _id, body }) => <div key={_id}>{body}</div>)}</main>
  );
}
