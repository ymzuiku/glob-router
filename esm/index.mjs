var c=(e,s,r)=>new Promise((o,a)=>{var n=t=>{try{p(r.next(t))}catch(f){a(f)}},i=t=>{try{p(r.throw(t))}catch(f){a(f)}},p=t=>t.done?o(t.value):Promise.resolve(t.value).then(n,i);p((r=r.apply(e,s)).next())});import P from"../node_modules/fast-glob/out/index.js";import w from"../node_modules/fs-extra/lib/index.js";import m from"../node_modules/fs-extra/lib/index.js";import{resolve as E}from"path";var b=(...e)=>E(process.cwd(),...e);function l(e,s,r){return c(this,null,function*(){let o=b(e,r);if(m.existsSync(o)){let a=yield m.readFile(o);String(a)!=s&&(yield m.writeFile(o,s))}else yield m.writeFile(o,s)})}var U=/export const GET =/,S=/export const POST =/,A=/export const DELETE =/,O=/export const PUT =/,C=/export const PATCH =/;function x(e,s){return c(this,null,function*(){let r="",o="";for(let n of s){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),t=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");t.indexOf("+serve.")>-1&&(t="_"),o+=`import * as ${t} from "${p}";  
`;let f=yield w.readFile(n),g=String(f),y="",h="",d="",$="",v="";U.test(g)&&(y=`
    GET: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "GET", args);
    }) as any as typeof ${t}.GET,
      `),A.test(g)&&(h=`
    DELETE: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "DELETE", args);
    }) as any as typeof ${t}.DELETE,
      `),S.test(g)&&(d=`
    POST: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "POST", args);
    }) as any as typeof ${t}.POST,
      `),O.test(g)&&($=`
    PUT: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${t}.PUT,
      `),C.test(g)&&(v=`
    PATCH: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${t}.PATCH,
      `),r+=`
  ${t}: {
    ${y}${h}${d}${$}${v}
  },`}let a=`// Auto create with glob-router
/* eslint-disable */

${o}
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
};`;yield l(e,a,"apis.ts")})}function T(e,s){return c(this,null,function*(){let r="";for(let a of s){let n=a.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=a.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=a.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),r+=`
  ${p}: {
    path: "${n}",
    render: () => import("${i}"),
  },`}let o=`// Auto create with glob-router
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
`;yield l(e,o,"pages.ts")})}function u(e,s){return c(this,null,function*(){let r="",o="";for(let n of s){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),t=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");o+=`import * as ${t} from "${p}";  
`,t.indexOf("+serve.")>-1&&(t="_"),r+=`
  ${t}: {
    path: "${i}",
    serve: ${t},
  },`}let a=`// Auto create with glob-router
/* eslint-disable */

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

export const serves = {${r}
};


export const serveArray: ServeItem[] = [];
Object.keys(serves).forEach((k) => {
  const item = (serves as any)[k];
  serveArray.push(item);
});
`;yield l(e,a,"serves.ts")})}function j(e){return c(this,null,function*(){let[s,r]=yield Promise.all([P([`${e}/**/+page.(tsx|ts|vue)`]),P([`${e}/**/+serve.ts`])]);yield Promise.all([s.length&&T(e,s),r.length&&u(e,r),r.length&&x(e,r)].filter(Boolean)),console.log("loaded glob-router")})}var M=j;export{M as default};
