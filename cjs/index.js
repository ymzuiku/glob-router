var S=Object.create;var g=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var D=Object.getOwnPropertyNames;var _=Object.getPrototypeOf,C=Object.prototype.hasOwnProperty;var x=e=>g(e,"__esModule",{value:!0});var j=(e,t)=>{for(var r in t)g(e,r,{get:t[r],enumerable:!0})},T=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of D(t))!C.call(e,a)&&(r||a!=="default")&&g(e,a,{get:()=>t[a],enumerable:!(s=A(t,a))||s.enumerable});return e},m=(e,t)=>T(x(g(e!=null?S(_(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),F=(e=>(t,r)=>e&&e.get(t)||(r=T(x({}),t,1),e&&e.set(t,r),r))(typeof WeakMap!="undefined"?new WeakMap:0);var N={};j(N,{default:()=>J});var y=m(require("fast-glob"));var P=m(require("fs-extra"));var f=m(require("fs-extra")),E=require("path"),G=(...e)=>(0,E.resolve)(process.cwd(),...e);async function c(e,t,r){let s=G(e,r);if(f.default.existsSync(s)){let a=await f.default.readFile(s);String(a)!=t&&await f.default.writeFile(s,t)}else await f.default.writeFile(s,t)}var L=/export const GET =/,k=/export const POST =/,H=/export const DELETE =/,I=/export const PUT =/,B=/export const PATCH =/;async function O(e,t){let r="",s="";for(let n of t){let i=n.replace(e,"").replace("/+serve.tsx","").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),o=n.replace(e+"/","").replace("/+serve.tsx","").replace("/+serve.ts","").split("/").join("_");o.indexOf("+serve.")>-1&&(o="_"),s+=`import * as ${o} from "${p}";  
`;let U=await P.default.readFile(n),l=String(U),v="",h="",d="",$="",u="";L.test(l)&&(v=`
    GET: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "GET", args);
    }) as any as typeof ${o}.GET,
      `),H.test(l)&&(h=`
    DELETE: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "DELETE", args);
    }) as any as typeof ${o}.DELETE,
      `),k.test(l)&&(d=`
    POST: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "POST", args);
    }) as any as typeof ${o}.POST,
      `),I.test(l)&&($=`
    PUT: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${o}.PUT,
      `),B.test(l)&&(u=`
    PATCH: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${o}.PATCH,
      `),r+=`
  ${o}: {
    ${v}${h}${d}${$}${u}
  },`}let a=`// Don't edit
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
};`;await c(e,a,"_apis.ts")}async function b(e,t){let r="";for(let a of t){let n=a.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=a.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=a.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),r+=`
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
`;await c(e,s,"_pages.ts")}async function w(e,t){let r="",s="";for(let n of t){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),o=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");s+=`import * as ${o} from "${p}";  
`,o.indexOf("+serve.")>-1&&(o="_"),r+=`
  ${o}: {
    path: "${i}",
    serve: ${o},
  },`}let a=`// Don't edit
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
`;await c(e,a,"_serves.ts")}async function R(e){let[t,r]=await Promise.all([(0,y.default)([`${e}/**/+page.(tsx|ts|vue)`]),(0,y.default)([`${e}/**/+serve.ts`])]);await Promise.all([t.length&&b(e,t),r.length&&w(e,r),r.length&&O(e,r)].filter(Boolean)),console.log("loaded glob-router")}var J=R;module.exports=F(N);0&&(module.exports={});
