var A=Object.create;var y=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty;var G=(e,r)=>{for(var t in r)y(e,t,{get:r[t],enumerable:!0})},P=(e,r,t,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of C(r))!F.call(e,o)&&o!==t&&y(e,o,{get:()=>r[o],enumerable:!(a=O(r,o))||a.enumerable});return e};var h=(e,r,t)=>(t=e!=null?A(j(e)):{},P(r||!e||!e.__esModule?y(t,"default",{value:e,enumerable:!0}):t,e)),L=e=>P(y({},"__esModule",{value:!0}),e);var c=(e,r,t)=>new Promise((a,o)=>{var n=s=>{try{p(t.next(s))}catch(f){o(f)}},i=s=>{try{p(t.throw(s))}catch(f){o(f)}},p=s=>s.done?a(s.value):Promise.resolve(s.value).then(n,i);p((t=t.apply(e,r)).next())});var N={};G(N,{default:()=>J});module.exports=L(N);var d=h(require("../node_modules/fast-glob/out/index.js"));var b=h(require("../node_modules/fs-extra/lib/index.js"));var m=h(require("../node_modules/fs-extra/lib/index.js")),E=require("path"),k=(...e)=>(0,E.resolve)(process.cwd(),...e);function l(e,r,t){return c(this,null,function*(){let a=k(e,t);if(m.default.existsSync(a)){let o=yield m.default.readFile(a);String(o)!=r&&(yield m.default.writeFile(a,r))}else yield m.default.writeFile(a,r)})}var D=/export const GET =/,H=/export const POST =/,_=/export const DELETE =/,I=/export const PUT =/,B=/export const PATCH =/;function w(e,r){return c(this,null,function*(){let t="",a="";for(let n of r){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),s=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");s.indexOf("+serve.")>-1&&(s="_"),a+=`import * as ${s} from "${p}";  
`;let f=yield b.default.readFile(n),g=String(f),$="",v="",x="",T="",u="";D.test(g)&&($=`
    GET: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "GET", args);
    }) as any as typeof ${s}.GET,
      `),_.test(g)&&(v=`
    DELETE: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "DELETE", args);
    }) as any as typeof ${s}.DELETE,
      `),H.test(g)&&(x=`
    POST: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "POST", args);
    }) as any as typeof ${s}.POST,
      `),I.test(g)&&(T=`
    PUT: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${s}.PUT,
      `),B.test(g)&&(u=`
    PATCH: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${s}.PATCH,
      `),t+=`
  ${s}: {
    ${$}${v}${x}${T}${u}
  },`}let o=`// Auto create with glob-router
/* eslint-disable */

${a}
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

export const apis = {${t}
};`;yield l(e,o,"apis.ts")})}function U(e,r){return c(this,null,function*(){let t="";for(let o of r){let n=o.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=o.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=o.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),t+=`
  ${p}: {
    path: "${n}",
    render: () => import("${i}"),
  },`}let a=`// Auto create with glob-router
/* eslint-disable */

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
`;yield l(e,a,"pages.ts")})}function S(e,r){return c(this,null,function*(){let t="",a="";for(let n of r){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),s=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");a+=`import * as ${s} from "${p}";  
`,s.indexOf("+serve.")>-1&&(s="_"),t+=`
  ${s}: {
    path: "${i}",
    serve: ${s},
  },`}let o=`// Auto create with glob-router
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

export const serves = {${t}
};


export const serveArray: ServeItem[] = [];
Object.keys(serves).forEach((k) => {
  const item = (serves as any)[k];
  serveArray.push(item);
});
`;yield l(e,o,"serves.ts")})}function R(e){return c(this,null,function*(){let[r,t]=yield Promise.all([(0,d.default)([`${e}/**/+page.(tsx|ts|vue)`]),(0,d.default)([`${e}/**/+serve.ts`])]);yield Promise.all([r.length&&U(e,r),t.length&&S(e,t),t.length&&w(e,t)].filter(Boolean)),console.log("loaded glob-router")})}var J=R;0&&(module.exports={});
