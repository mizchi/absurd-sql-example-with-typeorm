## PoC: typeorm + sqljs + absurd-sql + comlink

- sql.js: wasm sqlite
- absurd-sql: indexeddb backend sql.js adapter
- comlink: WebWorker RPC
- typeorm: ORM with sqlite(sql.js) adapter

![](https://gyazo.com/2afcba1d33bd0d2699cf94323119a8a8.png)

## LICENSE

MIT

---

This is a project to get quickly setup with [absurd-sql](https://github.com/jlongster/absurd-sql). With this you well get a SQLite db that persistently stores data.

## Running

After cloning this project:

```
$ yarn
$ yarn serve
```

You should be able to go to [http://localhost:8080/](http://localhost:8080/), and open the console to see some query results.