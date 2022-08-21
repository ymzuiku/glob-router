#!/usr/bin/env node
const globRouter = require("./cjs/index").default;
const argv = process.argv.splice(2);

globRouter(argv[0]);
