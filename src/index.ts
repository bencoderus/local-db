import { LocalDB } from "./local-db";

const db = new LocalDB();
const database = db.createConnection({
  driver: "memory",
});

const table = database.createTable("users", {
  name: "string",
  age: "number",
});

const data1 = table.insert({
  name: "Chris",
  age: 133,
});

const data2 = table.insert({
  name: "Benjamin",
  age: 10,
});

const data3 = table.insert({
  name: "Kevin",
  age: 29,
});

table.update(data3._id, {
  age: 53,
});

const table2 = database.createTable(
  "posts",
  {
    title: "string",
    content: "string",
  },
  {
    addPrimaryKey: true,
  }
);

table2.insert({
  title: "Hello world",
  content: "Just live your life bro.",
});

console.log(table.getAll());

console.log(table2.getAll());
