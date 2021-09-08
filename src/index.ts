import type { Api } from "./worker";

import { initBackend } from "absurd-sql/dist/indexeddb-main-thread";
import { wrap } from "comlink";

async function init() {
  const worker = new Worker(new URL("./worker", import.meta.url));
  initBackend(worker);
  const api: Api = wrap(worker);
  await api.ensure();
  const data = [...Array(100).keys()].map((i) => [Math.random() * 1000, i]);
  await api.runMany("INSERT INTO kv (key, value) VALUES (?, ?)", data);

  const result = await api.run(`SELECT SUM(value) FROM kv`);
  console.log(result);
}

init().catch(console.error);
