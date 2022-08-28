import saveFile from "./saveFile";

export async function formatServes(input: string, files: string[]) {
  let code = "";
  let importCodes = "";
  for (const file of files) {
    const pathUrl = file.replace(input, "").replace("/+serve.ts", "");
    const importUrl = file
      .replace(input, ".")
      .replace(".tsx", "")
      .replace(".ts", "");
    let name = file
      .replace(input + "/", "")
      .replace("/+serve.ts", "")
      .split("/")
      .join("_");

    importCodes += `import * as ${name} from "${importUrl}";  
`;

    if (name.indexOf("+serve.") > -1) {
      name = "_";
    }

    code += `
  ${name}: {
    path: "${pathUrl}",
    serve: ${name},
  },`;
  }
  const out = `// Don't edit
// Auto create with glob-router
/* eslint-disable */

${importCodes}

export interface ServeItem {
  path: string;
  serve: {
    GET?: (input: any) => any;
    DELETE?: (input: any) => any;
    POST?: (input: any) => any;
    PUT?: (input: any) => any;
    PATCH?: (input: any) => any;
  };
}

export const serves = {${code}
};


export const serveArray: ServeItem[] = [];
Object.keys(serves).forEach((k) => {
  const item = (serves as any)[k];
  serveArray.push(item);
});
`;
  await saveFile(input, out, "_serves.ts");
}
