#!/usr/bin/env node
const globRouter = require("./cjs/index").default;
const argv = process.argv.splice(2);

let isWatch = false;

for (const key in argv) {
  if (key == "-w") {
    isWatch = true;
  }
}
globRouter(argv[0], isWatch);
