declare module "absurd-sql";
declare module "absurd-sql/dist/*";

// import static, {} from "sql.js";
// import initSqlJs, { SqlJsStatic, Database } from "sql.js";
declare module "@jlongster/sql.js" {
  const t: any;
  export default t;
}
