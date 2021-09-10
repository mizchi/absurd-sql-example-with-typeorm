import type { Remote } from "comlink";
import type { Api } from "./worker";
import { initBackend } from "absurd-sql/dist/indexeddb-main-thread";
import { wrap } from "comlink";

const worker = new Worker(new URL("./worker", import.meta.url));
initBackend(worker);
const api: Remote<Api> = wrap(worker);

async function init() {
  document.body.innerHTML = "Loading...";
  await api.setup();
  document.body.innerHTML = "Worker Ready";

  await api.createUser();
  const users = await api.getUsers();
  document.body.innerHTML = "Result:" + JSON.stringify(users);
  console.log(users);
}

init().catch(console.error);
