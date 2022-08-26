import fs from "fs-extra";
import saveFile from "./saveFile";

const hasGet = /export const GET =/;
const hasPOST = /export const POST =/;
const hasDELETE = /export const DELETE =/;
const hasPUT = /export const PUT =/;
const hasPATCH = /export const PATCH =/;

export async function formatApis(input: string, files: string[]) {
  let code = "";
  let importCodes = "";
  for (const file of files) {
    const pathUrl = file
      .replace(input, "")
      .replace("/+serve.tsx", "")
      .replace("/+serve.ts", "");
    const importUrl = file
      .replace(input, ".")
      .replace(".tsx", "")
      .replace(".ts", "");
    let name = file
      .replace(input + "/", "")
      .replace("/+serve.tsx", "")
      .replace("/+serve.ts", "")
      .split("/")
      .join("_");

    if (name.indexOf("+serve.") > -1) {
      name = "_";
    }

    importCodes += `import * as ${name} from "${importUrl}";  
`;
    const textBy = await fs.readFile(file);
    const text = String(textBy);
    let get = "";
    let del = "";
    let post = "";
    let put = "";
    let patch = "";
    if (hasGet.test(text)) {
      get = `
    GET: ((args: any) => {
      return options.fetcher(options.baseUrl + "${pathUrl}", "GET", args);
    }) as any as typeof ${name}.GET,
      `;
    }
    if (hasDELETE.test(text)) {
      del = `
    DELETE: ((args: any) => {
      return options.fetcher(options.baseUrl + "${pathUrl}", "DELETE", args);
    }) as any as typeof ${name}.DELETE,
      `;
    }
    if (hasPOST.test(text)) {
      post = `
    POST: ((args: any) => {
      return options.fetcher(options.baseUrl + "${pathUrl}", "POST", args);
    }) as any as typeof ${name}.POST,
      `;
    }
    if (hasPUT.test(text)) {
      put = `
    PUT: ((args: any) => {
      return options.fetcher(options.baseUrl + "${pathUrl}", "PUT", args);
    }) as any as typeof ${name}.PUT,
      `;
    }
    if (hasPATCH.test(text)) {
      patch = `
    PATCH: ((args: any) => {
      return options.fetcher(options.baseUrl + "${pathUrl}", "PATCH", args);
    }) as any as typeof ${name}.PATCH,
      `;
    }

    code += `
  ${name}: {
    ${get}${del}${post}${put}${patch}
  },`;
  }

  const out = `// Auto create with glob-router
/* eslint-disable */

${importCodes}
export const options = {
  fetcher: (url: string, method: string, body: any) => {
    if (typeof window == "undefined") {
      return null;
    }
    if (method === "GET") {
      return fetch(url + "?" + new URLSearchParams(body).toString(), { method }).then((v) => v.json());
    }
    return fetch(url, { method, body: JSON.stringify(body) }).then((v) => v.json());
  },
  baseUrl: "",
};

export const apis = {${code}
};`;
  await saveFile(input, out, "apis.ts");
}
