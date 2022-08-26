var c=(e,s,r)=>new Promise((a,o)=>{var n=t=>{try{p(r.next(t))}catch(f){o(f)}},i=t=>{try{p(r.throw(t))}catch(f){o(f)}},p=t=>t.done?a(t.value):Promise.resolve(t.value).then(n,i);p((r=r.apply(e,s)).next())});import P from"fast-glob";import w from"fs-extra";import m from"fs-extra";import{resolve as E}from"path";var b=(...e)=>E(process.cwd(),...e);function l(e,s,r){return c(this,null,function*(){let a=b(e,r);if(m.existsSync(a)){let o=yield m.readFile(a);String(o)!=s&&(yield m.writeFile(a,s))}else yield m.writeFile(a,s)})}var U=/export const GET =/,S=/export const POST =/,A=/export const DELETE =/,O=/export const PUT =/,C=/export const PATCH =/;function $(e,s){return c(this,null,function*(){let r="",a="";for(let n of s){let i=n.replace(e,"").replace("/+serve.tsx","").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),t=n.replace(e+"/","").replace("/+serve.tsx","").replace("/+serve.ts","").split("/").join("_");t.indexOf("+serve.")>-1&&(t="_"),a+=`import * as ${t} from "${p}";  
`;let f=yield w.readFile(n),g=String(f),y="",h="",d="",v="",x="";U.test(g)&&(y=`
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
      `),O.test(g)&&(v=`
    PUT: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${t}.PUT,
      `),C.test(g)&&(x=`
    PATCH: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${t}.PATCH,
      `),r+=`
  ${t}: {
    ${y}${h}${d}${v}${x}
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

export const apis = {${r}
};`;yield l(e,o,"apis.ts")})}function T(e,s){return c(this,null,function*(){let r="";for(let o of s){let n=o.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=o.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=o.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),r+=`
  ${p}: {
    path: "${n}",
    render: () => import("${i}"),
  },`}let a=`// Auto create with glob-router
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
`;yield l(e,a,"pages.ts")})}function u(e,s){return c(this,null,function*(){let r="",a="";for(let n of s){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),t=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");a+=`import * as ${t} from "${p}";  
`,t.indexOf("+serve.")>-1&&(t="_"),r+=`
  ${t}: {
    path: "${i}",
    serve: ${t},
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

export const serves = {${r}
};


export const serveArray: ServeItem[] = [];
Object.keys(serves).forEach((k) => {
  const item = (serves as any)[k];
  serveArray.push(item);
});
`;yield l(e,o,"serves.ts")})}function j(e){return c(this,null,function*(){let[s,r]=yield Promise.all([P([`${e}/**/+page.(tsx|ts|vue)`]),P([`${e}/**/+serve.(ts|tsx)`])]);yield Promise.all([s.length&&T(e,s),r.length&&u(e,r),r.length&&$(e,r)].filter(Boolean)),console.log("loaded glob-router")})}var M=j;export{M as default};
