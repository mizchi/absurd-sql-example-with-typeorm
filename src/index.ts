import type { Api } from "./worker";

import { initBackend } from "absurd-sql/dist/indexeddb-main-thread";
import { wrap } from "comlink";

async function init() {
  let worker = new Worker(new URL("./worker", import.meta.url));
  initBackend(worker);

  const api: Api = wrap(worker);
  console.log(api);
  const x = await api.runQueries();
  console.log("server result", x);
}

init().then(console.error);
