var F=Object.create;var m=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var B=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var U=e=>m(e,"__esModule",{value:!0});var R=(e,t)=>{for(var r in t)m(e,r,{get:t[r],enumerable:!0})},b=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of I(t))!N.call(e,o)&&(r||o!=="default")&&m(e,o,{get:()=>t[o],enumerable:!(a=k(t,o))||a.enumerable});return e},h=(e,t)=>b(U(m(e!=null?F(B(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),J=(e=>(t,r)=>e&&e.get(t)||(r=b(U({}),t,1),e&&e.set(t,r),r))(typeof WeakMap!="undefined"?new WeakMap:0);var Y={};R(Y,{default:()=>X});var L=require("chokidar"),u=h(require("fast-glob"));var S=h(require("fs-extra"));var g=h(require("fs-extra")),w=require("path"),M=(...e)=>(0,w.resolve)(process.cwd(),...e);async function l(e,t,r){let a=M(e,r);if(g.default.existsSync(a)){let o=await g.default.readFile(a);String(o)!=t&&await g.default.writeFile(a,t)}else await g.default.writeFile(a,t)}var q=/(^|\n)(export const GET|export function GET|export async function GET)/,z=/(^|\n)(export const POST|export function POST|export async function POST)/,K=/(^|\n)(export const DELETE|export function DELETE|export async function DELETE)/,Q=/(^|\n)(export const PUT|export function PUT|export async function PUT)/,V=/(^|\n)(export const PATCH|export function PATCH|export async function PATCH)/,A=/(.*)\.(GET|POST|DELETE|PUT|PATCH) =/g;async function D(e,t){let r="",a="";for(let n of t){let i=n.replace(e,"").replace("/+serve.tsx","").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),s=n.replace(e+"/","").replace("/+serve.tsx","").replace("/+serve.ts","").split("/").join("_");s.indexOf("+serve.")>-1&&(s="_"),a+=`import type * as ${s} from "${p}";  
`;let _=await S.default.readFile(n),c=String(_),v="",x="",E="",$="",P="";q.test(c)&&(v=`
    GET: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "GET", args);
    }) as any as typeof ${s}.GET,
      `),K.test(c)&&(x=`
    DELETE: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "DELETE", args);
    }) as any as typeof ${s}.DELETE,
      `),z.test(c)&&(E=`
    POST: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "POST", args);
    }) as any as typeof ${s}.POST,
      `),Q.test(c)&&($=`
    PUT: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${s}.PUT,
      `),V.test(c)&&(P=`
    PATCH: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${s}.PATCH,
      `);let O="";A.test(c)&&c.match(A)?.forEach(j=>{let[f,y]=j.split(".");f=f.trim(),y=y.replace("=","").trim(),O+=`${f}: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "${i}/${f}", "${y}", args);
		}) as any as typeof ${s}.${f},
`}),r+=`
  ${s}: {
    ${O}${v}${x}${E}${$}${P}
  },`}let o=`// Don't edit
// Auto create with glob-router
/* eslint-disable */

${a}
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
    return fetch(url, { method, body: body ? JSON.stringify(body): void 0 })
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

export const apis = {${r}
};`;await l(e,o,"_apis.ts")}async function C(e,t){let r="";for(let o of t){let n=o.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=o.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=o.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),r+=`
  ${p}: {
    path: "${n}",
    render: () => import("${i}"),
  },`}let a=`// Don't edit
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
`;await l(e,a,"_pages.ts")}async function G(e,t){let r="",a="";for(let n of t){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),s=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");a+=`import * as ${s} from "${p}";  
`,s.indexOf("+serve.")>-1&&(s="_"),r+=`
  ${s}: {
    path: "${i}",
    serve: ${s},
  },`}let o=`// Don't edit
// Auto create with glob-router
/* eslint-disable */

${a}

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
`;await l(e,o,"_serves.ts")}var d=!1;async function T(e){if(d)return;d=!0;let[t,r]=await Promise.all([(0,u.default)([`${e}/**/+page.(tsx|ts|vue)`]),(0,u.default)([`${e}/**/+serve.ts`])]);await Promise.all([t.length&&C(e,t),r.length&&G(e,r),r.length&&D(e,r)].filter(Boolean)),d=!1}var H=/(\+page|\+serve)/;async function W(e,t=!1){if(T(e),!t){console.log("loaded glob-router");return}(0,L.watch)(e,{persistent:!0}).on("add",r=>{H.test(r)&&T(e)}).on("change",r=>{H.test(r)&&T(e)})}var X=W;module.exports=J(Y);0&&(module.exports={});
