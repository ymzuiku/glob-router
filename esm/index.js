import x from"fast-glob";import O from"fs-extra";import f from"fs-extra";import{resolve as E}from"path";var P=(...e)=>E(process.cwd(),...e);async function c(e,s,t){let a=P(e,t);if(f.existsSync(a)){let n=await f.readFile(a);String(n)!=s&&await f.writeFile(a,s)}else await f.writeFile(a,s)}var b=/export const GET =/,w=/export const POST =/,U=/export const DELETE =/,S=/export const PUT =/,A=/export const PATCH =/;async function d(e,s){let t="",a="";for(let o of s){let i=o.replace(e,"").replace("/+serve.tsx","").replace("/+serve.ts",""),p=o.replace(e,".").replace(".tsx","").replace(".ts",""),r=o.replace(e+"/","").replace("/+serve.tsx","").replace("/+serve.ts","").split("/").join("_");r.indexOf("+serve.")>-1&&(r="_"),a+=`import * as ${r} from "${p}";  
`;let T=await O.readFile(o),l=String(T),g="",m="",y="",v="",h="";b.test(l)&&(g=`
    GET: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "GET", args);
    }) as any as typeof ${r}.GET,
      `),U.test(l)&&(m=`
    DELETE: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "DELETE", args);
    }) as any as typeof ${r}.DELETE,
      `),w.test(l)&&(y=`
    POST: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "POST", args);
    }) as any as typeof ${r}.POST,
      `),S.test(l)&&(v=`
    PUT: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${r}.PUT,
      `),A.test(l)&&(h=`
    PATCH: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${r}.PATCH,
      `),t+=`
  ${r}: {
    ${g}${m}${y}${v}${h}
  },`}let n=`// Auto create with glob-router
/* eslint-disable */

${a}
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
};`;await c(e,n,"apis.ts")}async function $(e,s){let t="";for(let n of s){let o=n.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=n.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=n.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),t+=`
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
`;await c(e,a,"pages.ts")}async function u(e,s){let t="",a="";for(let o of s){let i=o.replace(e,"").replace("/+serve.ts",""),p=o.replace(e,".").replace(".tsx","").replace(".ts",""),r=o.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");a+=`import * as ${r} from "${p}";  
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
`;await c(e,n,"serves.ts")}async function C(e){let[s,t]=await Promise.all([x([`${e}/**/+page.(tsx|ts|vue)`]),x([`${e}/**/+serve.ts`])]);await Promise.all([s.length&&$(e,s),t.length&&u(e,t),t.length&&d(e,t)].filter(Boolean)),console.log("loaded glob-router")}var z=C;export{z as default};
