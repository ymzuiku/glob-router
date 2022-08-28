import saveFile from "./saveFile";

export async function formatPages(input: string, files: string[]) {
  let code = "";
  for (const file of files) {
    const pathUrl = file
      .replace(input, "")
      .replace("/+page.tsx", "")
      .replace("/+page.ts", "")
      .replace("/+page.vue", "");
    const importUrl = file
      .replace(input, ".")
      .replace(".tsx", "")
      .replace(".ts", "")
      .replace(".vue", "");
    let name = file
      .replace(input + "/", "")
      .replace("/+page.tsx", "")
      .replace("/+page.ts", "")
      .replace("/+page.vue", "")
      .split("/")
      .join("_");

    if (name.indexOf("+page.") > -1) {
      name = "_";
    }

    code += `
  ${name}: {
    path: "${pathUrl}",
    render: () => import("${importUrl}"),
  },`;
  }
  const out = `// Don't edit
// Auto create with glob-router
/* eslint-disable */

export interface PageItem {
  path: string;
  render: () => Promise<any>;
}

export const pages = {${code}
};

export const pageArray: PageItem[] = [];
Object.keys(pages).forEach((k) => {
  const item = (pages as any)[k];
  pageArray.push(item);
});
`;
  await saveFile(input, out, "_pages.ts");
}
