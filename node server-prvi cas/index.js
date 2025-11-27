const os = require("os");
const path = require("path");
const fs = require("fs");

console.log(os.platform());
console.log(os.totalmem());
console.log(path.basename(__filename));
console.log(path.basename(__dirname));
// fs.writeFileSync("text.txt", "Fajl - demir 16");
