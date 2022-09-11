import{watch as L}from"chokidar";import P from"fast-glob";import U from"fs-extra";import f from"fs-extra";import{resolve as b}from"path";var w=(...e)=>b(process.cwd(),...e);async function c(e,s,t){let o=w(e,t);if(f.existsSync(o)){let n=await f.readFile(o);String(n)!=s&&await f.writeFile(o,s)}else await f.writeFile(o,s)}var S=/(^|\n)(export const GET|export function GET|export async function GET)/,A=/(^|\n)(export const POST|export function POST|export async function POST)/,D=/(^|\n)(export const DELETE|export function DELETE|export async function DELETE)/,C=/(^|\n)(export const PUT|export function PUT|export async function PUT)/,G=/(^|\n)(export const PATCH|export function PATCH|export async function PATCH)/;async function x(e,s){let t="",o="";for(let a of s){let i=a.replace(e,"").replace("/+serve.tsx","").replace("/+serve.ts",""),p=a.replace(e,".").replace(".tsx","").replace(".ts",""),r=a.replace(e+"/","").replace("/+serve.tsx","").replace("/+serve.ts","").split("/").join("_");r.indexOf("+serve.")>-1&&(r="_"),o+=`import type * as ${r} from "${p}";  
`;let O=await U.readFile(a),l=String(O),y="",u="",d="",h="",v="";S.test(l)&&(y=`
    GET: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "GET", args);
    }) as any as typeof ${r}.GET,
      `),D.test(l)&&(u=`
    DELETE: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "DELETE", args);
    }) as any as typeof ${r}.DELETE,
      `),A.test(l)&&(d=`
    POST: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "POST", args);
    }) as any as typeof ${r}.POST,
      `),C.test(l)&&(h=`
    PUT: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${r}.PUT,
      `),G.test(l)&&(v=`
    PATCH: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${r}.PATCH,
      `),t+=`
  ${r}: {
    ${y}${u}${d}${h}${v}
  },`}let n=`// Don't edit
// Auto create with glob-router
/* eslint-disable */
/* tslint:disable */ 
/* prettier-ignore */

${o}
export const apiOptions = {
  fetcher: (url: string, method: string, body: any) => {
    if (typeof window == "undefined") {
      return null;
    }
    if (method === "GET") {
      return fetch(url + "?" + new URLSearchParams(body).toString(), { method })
        .then((v) => {
          return v.json();
        })
        .then((v) => {
          if (v.error) {
            apiOptions.onError(v);
          }
          return v;
        });
    }
    return fetch(url, { method, body: JSON.stringify(body) })
      .then((v) => v.json())
      .then((v) => {
        if (v.error) {
          apiOptions.onError(v);
        }
        return v;
      });
  },
  onError: (error: any) => {},
  baseUrl: "",
};

export const apis = {${t}
};`;await c(e,n,"_apis.ts")}async function T(e,s){let t="";for(let n of s){let a=n.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=n.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=n.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),t+=`
  ${p}: {
    path: "${a}",
    render: () => import("${i}"),
  },`}let o=`// Don't edit
// Auto create with glob-router
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore */

export interface PageItem {
  path: string;
  render: () => Promise<any>;
}

export const pages = {${t}
};

export const pageArray: PageItem[] = [];
Object.keys(pages).forEach((k) => {
  const item = (pages as any)[k];
  pageArray.push(item);
});
`;await c(e,o,"_pages.ts")}async function E(e,s){let t="",o="";for(let a of s){let i=a.replace(e,"").replace("/+serve.ts",""),p=a.replace(e,".").replace(".tsx","").replace(".ts",""),r=a.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");o+=`import * as ${r} from "${p}";  
`,r.indexOf("+serve.")>-1&&(r="_"),t+=`
  ${r}: {
    path: "${i}",
    serve: ${r},
  },`}let n=`// Don't edit
// Auto create with glob-router
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore */

${o}

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

export const serves = {${t}
};


export const serveArray: ServeItem[] = [];
Object.keys(serves).forEach((k) => {
  const item = (serves as any)[k];
  serveArray.push(item);
});
`;await c(e,n,"_serves.ts")}var g=!1;async function m(e){if(g)return;g=!0;let[s,t]=await Promise.all([P([`${e}/**/+page.(tsx|ts|vue)`]),P([`${e}/**/+serve.ts`])]);await Promise.all([s.length&&T(e,s),t.length&&E(e,t),t.length&&x(e,t)].filter(Boolean)),g=!1}var $=/(\+page|\+serve)/;async function _(e,s=!1){if(m(e),!s){console.log("loaded glob-router");return}L(e,{persistent:!0}).on("add",t=>{$.test(t)&&m(e)}).on("change",t=>{$.test(t)&&m(e)})}var W=_;export{W as default};
