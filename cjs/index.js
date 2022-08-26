var A=Object.create;var g=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty;var T=e=>g(e,"__esModule",{value:!0});var G=(e,t)=>{for(var r in t)g(e,r,{get:t[r],enumerable:!0})},u=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of C(t))!F.call(e,a)&&(r||a!=="default")&&g(e,a,{get:()=>t[a],enumerable:!(s=O(t,a))||s.enumerable});return e},m=(e,t)=>u(T(g(e!=null?A(j(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),L=(e=>(t,r)=>e&&e.get(t)||(r=u(T({}),t,1),e&&e.set(t,r),r))(typeof WeakMap!="undefined"?new WeakMap:0);var N={};G(N,{default:()=>J});var y=m(require("fast-glob"));var E=m(require("fs-extra"));var f=m(require("fs-extra")),P=require("path"),k=(...e)=>(0,P.resolve)(process.cwd(),...e);async function c(e,t,r){let s=k(e,r);if(f.default.existsSync(s)){let a=await f.default.readFile(s);String(a)!=t&&await f.default.writeFile(s,t)}else await f.default.writeFile(s,t)}var D=/export const GET =/,H=/export const POST =/,_=/export const DELETE =/,I=/export const PUT =/,B=/export const PATCH =/;async function b(e,t){let r="",s="";for(let n of t){let i=n.replace(e,"").replace("/+serve.tsx","").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),o=n.replace(e+"/","").replace("/+serve.tsx","").replace("/+serve.ts","").split("/").join("_");o.indexOf("+serve.")>-1&&(o="_"),s+=`import * as ${o} from "${p}";  
`;let S=await E.default.readFile(n),l=String(S),h="",d="",v="",x="",$="";D.test(l)&&(h=`
    GET: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "GET", args);
    }) as any as typeof ${o}.GET,
      `),_.test(l)&&(d=`
    DELETE: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "DELETE", args);
    }) as any as typeof ${o}.DELETE,
      `),H.test(l)&&(v=`
    POST: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "POST", args);
    }) as any as typeof ${o}.POST,
      `),I.test(l)&&(x=`
    PUT: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${o}.PUT,
      `),B.test(l)&&($=`
    PATCH: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${o}.PATCH,
      `),r+=`
  ${o}: {
    ${h}${d}${v}${x}${$}
  },`}let a=`// Auto create with glob-router
/* eslint-disable */

${s}
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

export const apis = {${r}
};`;await c(e,a,"apis.ts")}async function w(e,t){let r="";for(let a of t){let n=a.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=a.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=a.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),r+=`
  ${p}: {
    path: "${n}",
    render: () => import("${i}"),
  },`}let s=`// Auto create with glob-router
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
`;await c(e,s,"pages.ts")}async function U(e,t){let r="",s="";for(let n of t){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),o=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");s+=`import * as ${o} from "${p}";  
`,o.indexOf("+serve.")>-1&&(o="_"),r+=`
  ${o}: {
    path: "${i}",
    serve: ${o},
  },`}let a=`// Auto create with glob-router
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
`;await c(e,a,"serves.ts")}async function R(e){let[t,r]=await Promise.all([(0,y.default)([`${e}/**/+page.(tsx|ts|vue)`]),(0,y.default)([`${e}/**/+serve.(ts|tsx)`])]);await Promise.all([t.length&&w(e,t),r.length&&U(e,r),r.length&&b(e,r)].filter(Boolean)),console.log("loaded glob-router")}var J=R;module.exports=L(N);0&&(module.exports={});
