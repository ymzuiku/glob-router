var G=Object.create;var g=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertyNames;var H=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var P=e=>g(e,"__esModule",{value:!0});var F=(e,t)=>{for(var r in t)g(e,r,{get:t[r],enumerable:!0})},$=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of _(t))!j.call(e,o)&&(r||o!=="default")&&g(e,o,{get:()=>t[o],enumerable:!(s=L(t,o))||s.enumerable});return e},m=(e,t)=>$(P(g(e!=null?G(H(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),k=(e=>(t,r)=>e&&e.get(t)||(r=$(P({}),t,1),e&&e.set(t,r),r))(typeof WeakMap!="undefined"?new WeakMap:0);var M={};F(M,{default:()=>K});var A=require("chokidar"),y=m(require("fast-glob"));var w=m(require("fs-extra"));var f=m(require("fs-extra")),O=require("path"),I=(...e)=>(0,O.resolve)(process.cwd(),...e);async function c(e,t,r){let s=I(e,r);if(f.default.existsSync(s)){let o=await f.default.readFile(s);String(o)!=t&&await f.default.writeFile(s,t)}else await f.default.writeFile(s,t)}var B=/(^|\n)(export const GET|export function GET|export async function GET)/,R=/(^|\n)(export const POST|export function POST|export async function POST)/,J=/(^|\n)(export const DELETE|export function DELETE|export async function DELETE)/,N=/(^|\n)(export const PUT|export function PUT|export async function PUT)/,q=/(^|\n)(export const PATCH|export function PATCH|export async function PATCH)/;async function U(e,t){let r="",s="";for(let n of t){let i=n.replace(e,"").replace("/+serve.tsx","").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),a=n.replace(e+"/","").replace("/+serve.tsx","").replace("/+serve.ts","").split("/").join("_");a.indexOf("+serve.")>-1&&(a="_"),s+=`import type * as ${a} from "${p}";  
`;let C=await w.default.readFile(n),l=String(C),v="",x="",d="",T="",E="";B.test(l)&&(v=`
    GET: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "GET", args);
    }) as any as typeof ${a}.GET,
      `),J.test(l)&&(x=`
    DELETE: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "DELETE", args);
    }) as any as typeof ${a}.DELETE,
      `),R.test(l)&&(d=`
    POST: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "POST", args);
    }) as any as typeof ${a}.POST,
      `),N.test(l)&&(T=`
    PUT: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${a}.PUT,
      `),q.test(l)&&(E=`
    PATCH: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${a}.PATCH,
      `),r+=`
  ${a}: {
    ${v}${x}${d}${T}${E}
  },`}let o=`// Don't edit
// Auto create with glob-router
/* eslint-disable */

${s}
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

export const apis = {${r}
};`;await c(e,o,"_apis.ts")}async function b(e,t){let r="";for(let o of t){let n=o.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=o.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=o.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),r+=`
  ${p}: {
    path: "${n}",
    render: () => import("${i}"),
  },`}let s=`// Don't edit
// Auto create with glob-router
/* eslint-disable */

export interface PageItem {
  path: string;
  render: () => Promise<any>;
}

export const pages = {${r}
};

export const pageArray: PageItem[] = [];
Object.keys(pages).forEach((k) => {
  const item = (pages as any)[k];
  pageArray.push(item);
});
`;await c(e,s,"_pages.ts")}async function S(e,t){let r="",s="";for(let n of t){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),a=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");s+=`import * as ${a} from "${p}";  
`,a.indexOf("+serve.")>-1&&(a="_"),r+=`
  ${a}: {
    path: "${i}",
    serve: ${a},
  },`}let o=`// Don't edit
// Auto create with glob-router
/* eslint-disable */

${s}

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

export const serves = {${r}
};


export const serveArray: ServeItem[] = [];
Object.keys(serves).forEach((k) => {
  const item = (serves as any)[k];
  serveArray.push(item);
});
`;await c(e,o,"_serves.ts")}var u=!1;async function h(e){if(u)return;u=!0;let[t,r]=await Promise.all([(0,y.default)([`${e}/**/+page.(tsx|ts|vue)`]),(0,y.default)([`${e}/**/+serve.ts`])]);await Promise.all([t.length&&b(e,t),r.length&&S(e,r),r.length&&U(e,r)].filter(Boolean)),u=!1}var D=/(\+page|\+serve)/;async function z(e,t=!1){if(h(e),!t){console.log("loaded glob-router");return}(0,A.watch)(e,{persistent:!0}).on("add",r=>{D.test(r)&&h(e)}).on("change",r=>{D.test(r)&&h(e)})}var K=z;module.exports=k(M);0&&(module.exports={});
