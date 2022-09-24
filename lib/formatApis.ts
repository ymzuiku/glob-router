import fs from "fs-extra";
import saveFile from "./saveFile";

const hasGet =
  /(^|\n)(export const GET|export function GET|export async function GET)/;
const hasPOST =
  /(^|\n)(export const POST|export function POST|export async function POST)/;
const hasDELETE =
  /(^|\n)(export const DELETE|export function DELETE|export async function DELETE)/;
const hasPUT =
  /(^|\n)(export const PUT|export function PUT|export async function PUT)/;
const hasPATCH =
  /(^|\n)(export const PATCH|export function PATCH|export async function PATCH)/;

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

    importCodes += `import type * as ${name} from "${importUrl}";  
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
      return apiOptions.fetcher(apiOptions.baseUrl + "${pathUrl}", "GET", args);
    }) as any as typeof ${name}.GET,
      `;
    }
    if (hasDELETE.test(text)) {
      del = `
    DELETE: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${pathUrl}", "DELETE", args);
    }) as any as typeof ${name}.DELETE,
      `;
    }
    if (hasPOST.test(text)) {
      post = `
    POST: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${pathUrl}", "POST", args);
    }) as any as typeof ${name}.POST,
      `;
    }
    if (hasPUT.test(text)) {
      put = `
    PUT: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${pathUrl}", "PUT", args);
    }) as any as typeof ${name}.PUT,
      `;
    }
    if (hasPATCH.test(text)) {
      patch = `
    PATCH: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${pathUrl}", "PATCH", args);
    }) as any as typeof ${name}.PATCH,
      `;
    }

    code += `
  ${name}: {
    ${get}${del}${post}${put}${patch}
  },`;
  }

  const out = `// Don't edit
// Auto create with glob-router
/* eslint-disable */

${importCodes}
export const apiOptions = {
  fetcher: (url: string, method: string, body: any) => {
    if (typeof window == "undefined") {
      return null;
    }
    if (method === "GET") {
      let params = new URLSearchParams(body).toString()
      if (params) {
        params = "?" + params
      }
      return fetch(url + params, { method })
        .then((v) => {
          return v.json();
        })
        .then((v) => {
          if (v.error) {
            apiOptions.onError(v);
          }
          return v;
        }).catch(err=>{
          return err;
        });
    }
    return fetch(url, { method, body: JSON.stringify(body) })
      .then((v) => v.json())
      .then((v) => {
        if (v.error) {
          apiOptions.onError(v);
        }
        return v;
      }).catch(err=>{
        return err;
      });
  },
  onError: (error: any) => {},
  baseUrl: "",
};

export const apis = {${code}
};`;
  await saveFile(input, out, "_apis.ts");
}
