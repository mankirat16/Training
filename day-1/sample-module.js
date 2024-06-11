const fs = require("fs");
const users = fs.readFileSync("./users.txt" , "utf-8");
JSON.parse(users);
console.log(users);
