import{watch as k}from"chokidar";import b from"fast-glob";import G from"fs-extra";import g from"fs-extra";import{resolve as D}from"path";var C=(...e)=>D(process.cwd(),...e);async function l(e,s,t){let a=C(e,t);if(g.existsSync(a)){let i=await g.readFile(a);String(i)!=s&&await g.writeFile(a,s)}else await g.writeFile(a,s)}var L=/(^|\n)(export const GET|export function GET|export async function GET)/,H=/(^|\n)(export const POST|export function POST|export async function POST)/,_=/(^|\n)(export const DELETE|export function DELETE|export async function DELETE)/,j=/(^|\n)(export const PUT|export function PUT|export async function PUT)/,F=/(^|\n)(export const PATCH|export function PATCH|export async function PATCH)/,$=/(.*)\.(GET|POST|DELETE|PUT|PATCH) =/g;async function P(e,s){let t="",a="";for(let o of s){let n=o.replace(e,"").replace("/+serve.tsx","").replace("/+serve.ts",""),p=o.replace(e,".").replace(".tsx","").replace(".ts",""),r=o.replace(e+"/","").replace("/+serve.tsx","").replace("/+serve.ts","").split("/").join("_");r.indexOf("+serve.")>-1&&(r="_"),a+=`import type * as ${r} from "${p}";  
`;let S=await G.readFile(o),c=String(S),u="",d="",T="",v="",x="";L.test(c)&&(u=`
    GET: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${n}", "GET", args);
    }) as any as typeof ${r}.GET,
      `),_.test(c)&&(d=`
    DELETE: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${n}", "DELETE", args);
    }) as any as typeof ${r}.DELETE,
      `),H.test(c)&&(T=`
    POST: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${n}", "POST", args);
    }) as any as typeof ${r}.POST,
      `),j.test(c)&&(v=`
    PUT: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${n}", "PUT", args);
    }) as any as typeof ${r}.PUT,
      `),F.test(c)&&(x=`
    PATCH: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "${n}", "PATCH", args);
    }) as any as typeof ${r}.PATCH,
      `);let E="";$.test(c)&&c.match($)?.forEach(A=>{let[f,m]=A.split(".");f=f.trim(),m=m.replace("=","").trim(),E+=`${f}: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "${n}/${f}", "${m}", args);
		}) as any as typeof ${r}.${f},
`}),t+=`
  ${r}: {
    ${E}${u}${d}${T}${v}${x}
  },`}let i=`// Don't edit
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

export const apis = {${t}
};`;await l(e,i,"_apis.ts")}async function O(e,s){let t="";for(let i of s){let o=i.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),n=i.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=i.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),t+=`
  ${p}: {
    path: "${o}",
    render: () => import("${n}"),
  },`}let a=`// Don't edit
// Auto create with glob-router
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
`;await l(e,a,"_pages.ts")}async function U(e,s){let t="",a="";for(let o of s){let n=o.replace(e,"").replace("/+serve.ts",""),p=o.replace(e,".").replace(".tsx","").replace(".ts",""),r=o.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");a+=`import * as ${r} from "${p}";  
`,r.indexOf("+serve.")>-1&&(r="_"),t+=`
  ${r}: {
    path: "${n}",
    serve: ${r},
  },`}let i=`// Don't edit
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

export const serves = {${t}
};


export const serveArray: ServeItem[] = [];
Object.keys(serves).forEach((k) => {
  const item = (serves as any)[k];
  serveArray.push(item);
});
`;await l(e,i,"_serves.ts")}var y=!1;async function h(e){if(y)return;y=!0;let[s,t]=await Promise.all([b([`${e}/**/+page.(tsx|ts|vue)`]),b([`${e}/**/+serve.ts`])]);await Promise.all([s.length&&O(e,s),t.length&&U(e,t),t.length&&P(e,t)].filter(Boolean)),y=!1}var w=/(\+page|\+serve)/;async function I(e,s=!1){if(h(e),!s){console.log("loaded glob-router");return}k(e,{persistent:!0}).on("add",t=>{w.test(t)&&h(e)}).on("change",t=>{w.test(t)&&h(e)})}var re=I;export{re as default};
