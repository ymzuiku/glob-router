import T from"fast-glob";import b from"fs-extra";import f from"fs-extra";import{resolve as P}from"path";var E=(...e)=>P(process.cwd(),...e);async function c(e,s,t){let a=E(e,t);if(f.existsSync(a)){let n=await f.readFile(a);String(n)!=s&&await f.writeFile(a,s)}else await f.writeFile(a,s)}var w=/export const GET =/,U=/export const POST =/,S=/export const DELETE =/,A=/export const PUT =/,O=/export const PATCH =/;async function v(e,s){let t="",a="";for(let o of s){let i=o.replace(e,"").replace("/+serve.tsx","").replace("/+serve.ts",""),p=o.replace(e,".").replace(".tsx","").replace(".ts",""),r=o.replace(e+"/","").replace("/+serve.tsx","").replace("/+serve.ts","").split("/").join("_");r.indexOf("+serve.")>-1&&(r="_"),a+=`import * as ${r} from "${p}";  
`;let u=await b.readFile(o),l=String(u),g="",m="",y="",h="",d="";w.test(l)&&(g=`
    GET: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "GET", args);
    }) as any as typeof ${r}.GET,
      `),S.test(l)&&(m=`
    DELETE: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "DELETE", args);
    }) as any as typeof ${r}.DELETE,
      `),U.test(l)&&(y=`
    POST: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "POST", args);
    }) as any as typeof ${r}.POST,
      `),A.test(l)&&(h=`
    PUT: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${r}.PUT,
      `),O.test(l)&&(d=`
    PATCH: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${r}.PATCH,
      `),t+=`
  ${r}: {
    ${g}${m}${y}${h}${d}
  },`}let n=`// Auto create with glob-router
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
};`;await c(e,n,"apis.ts")}async function x(e,s){let t="";for(let n of s){let o=n.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=n.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=n.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),t+=`
  ${p}: {
    path: "${o}",
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
`;await c(e,a,"pages.ts")}async function $(e,s){let t="",a="";for(let o of s){let i=o.replace(e,"").replace("/+serve.ts",""),p=o.replace(e,".").replace(".tsx","").replace(".ts",""),r=o.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");a+=`import * as ${r} from "${p}";  
`,r.indexOf("+serve.")>-1&&(r="_"),t+=`
  ${r}: {
    path: "${i}",
    serve: ${r},
  },`}let n=`// Auto create with glob-router
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
`;await c(e,n,"serves.ts")}async function C(e){let[s,t]=await Promise.all([T([`${e}/**/+page.(tsx|ts|vue)`]),T([`${e}/**/+serve.(ts|tsx)`])]);await Promise.all([s.length&&x(e,s),t.length&&$(e,t),t.length&&v(e,t)].filter(Boolean)),console.log("loaded glob-router")}var z=C;export{z as default};
