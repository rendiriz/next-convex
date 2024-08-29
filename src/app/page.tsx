import Reactive from "./_component/reactive";
import NonReactive from "./_component/non-reactive";

export default async function Home() {
  return (
    <main>
      <Reactive />
      <br />
      <br />
      <NonReactive />
    </main>
  );
}
