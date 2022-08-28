import fg from "fast-glob";
import { formatApis } from "./formatApis";
import { formatPages } from "./formatPages";
import { formatServes } from "./formatServes";

async function globRouter(input: string) {
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

  console.log("loaded glob-router");
}

export default globRouter;
