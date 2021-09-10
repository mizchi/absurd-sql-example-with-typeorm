import type { InitSqlJsStatic } from "sql.js";
import initSqlJs from "@jlongster/sql.js";
import { SQLiteFS } from "absurd-sql";
import IndexedDBBackend from "absurd-sql/dist/indexeddb-backend";
import { Connection, createConnection, Repository } from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { expose } from "comlink";

async function setupTypeormEnvWithSqljs(dbPath: string) {
  const SQL = await (initSqlJs as InitSqlJsStatic)({
    locateFile: (file: string) => file,
  });
  // @ts-ignore
  const sqlFS = new SQLiteFS(SQL.FS, new IndexedDBBackend());
  // @ts-ignore
  SQL.register_for_idb(sqlFS);
  // @ts-ignore
  SQL.FS.mkdir("/sql");
  // @ts-ignore
  SQL.FS.mount(sqlFS, {}, "/sql");
  class PatchedDatabase extends SQL.Database {
    constructor() {
      // @ts-ignore
      super(dbPath, { filename: true });
      // Set indexeddb page size
      this.exec(`PRAGMA page_size=8192;PRAGMA journal_mode=MEMORY;`);
    }
  }
  const localStorageMock = {
    getItem() {
      return undefined;
    },
    setItem() {
      return undefined;
    },
  };
  // setup global env
  Object.assign(globalThis as any, {
    SQL: {
      ...SQL,
      Database: PatchedDatabase,
    },
    localStorage: localStorageMock,
    window: globalThis,
  });
}

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}

let conn: Connection;
let userRepository: Repository<User>;
async function setup() {
  // with /sql/ namespace
  const DBNAME = "/sql/db.sqlite";
  await setupTypeormEnvWithSqljs(DBNAME);
  conn = await createConnection({
    type: "sqljs", // this connection search window.SQL on browser
    location: DBNAME,
    autoSave: false, // commit by absurd-sql
    synchronize: true,
    entities: [User],
    logging: ["query", "schema"],
  });
  userRepository = conn.getRepository(User);
}

async function createUser() {
  const user = new User();
  user.id = Math.floor(Math.random() * 10000);
  user.name = "dummy-user-" + Math.random().toString();
  await userRepository.save(user);
  return true;
}

async function getUsers() {
  const users = await userRepository.find();
  return users;
}

const api = { setup, createUser, getUsers };
export type Api = typeof api;

expose(api);
