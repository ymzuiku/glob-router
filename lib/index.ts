import { watch } from "chokidar";
import fg from "fast-glob";
import { formatApis } from "./formatApis";
import { formatPages } from "./formatPages";
import { formatServes } from "./formatServes";

let loading = false;

async function write(input: string) {
  if (loading) {
    return;
  }
  loading = true;
  const [pages, serves] = await Promise.all([
    fg([`${input}/**/+page.(tsx|ts|vue)`]),
    fg([`${input}/**/+serve.ts`]),
  ]);
  await Promise.all(
    [
      pages.length && formatPages(input, pages),
      serves.length && formatServes(input, serves),
      serves.length && formatApis(input, serves),
    ].filter(Boolean)
  );
  loading = false;
}

const regs = /(\+page|\+serve)/;
async function globRouter(input: string, isWatch = false) {
  write(input);

  if (!isWatch) {
    console.log("loaded glob-router");
    return;
  }

  watch(input, { persistent: true })
    .on("add", (f) => {
      if (regs.test(f)) {
        write(input);
      }
    })
    .on("change", (f) => {
      if (regs.test(f)) {
        write(input);
      }
    });
}

export default globRouter;
