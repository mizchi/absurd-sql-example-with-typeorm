import type { Remote } from "comlink";
import type { Api } from "./worker";
import { initBackend } from "absurd-sql/dist/indexeddb-main-thread";
import { wrap } from "comlink";

const worker = new Worker(new URL("./worker", import.meta.url));
initBackend(worker);
const api: Remote<Api> = wrap(worker);

async function init() {
  await api.setup();
  await api.createUser();
  const users = await api.getUsers();
  console.log(users);
}

init().catch(console.error);
