var c=(e,s,r)=>new Promise((a,o)=>{var n=t=>{try{p(r.next(t))}catch(f){o(f)}},i=t=>{try{p(r.throw(t))}catch(f){o(f)}},p=t=>t.done?a(t.value):Promise.resolve(t.value).then(n,i);p((r=r.apply(e,s)).next())});import x from"fast-glob";import k from"fs-extra";import{resolve as q}from"path";import U from"fs-extra";import y from"fs-extra";import{resolve as E}from"path";var w=(...e)=>E(process.cwd(),...e);function l(e,s,r){return c(this,null,function*(){let a=w(e,r);if(y.existsSync(a)){let o=yield y.readFile(a);String(o)!=s&&(yield y.writeFile(a,s))}else yield y.writeFile(a,s)})}var S=/export const GET =/,j=/export const POST =/,A=/export const DELETE =/,O=/export const PUT =/,_=/export const PATCH =/;function b(e,s){return c(this,null,function*(){let r="",a="";for(let n of s){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),t=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");t.indexOf("+serve.")>-1&&(t="_"),a+=`import * as ${t} from "${p}";  
`;let f=yield U.readFile(n),m=String(f),g="",u="",d="",h="",v="";S.test(m)&&(g=`
    GET: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "GET", args);
    }) as any as typeof ${t}.GET,
      `),A.test(m)&&(u=`
    DELETE: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "DELETE", args);
    }) as any as typeof ${t}.DELETE,
      `),j.test(m)&&(d=`
    POST: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "POST", args);
    }) as any as typeof ${t}.POST,
      `),O.test(m)&&(h=`
    PUT: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PUT", args);
    }) as any as typeof ${t}.PUT,
      `),_.test(m)&&(v=`
    PATCH: ((args: any) => {
      return options.fetcher(options.baseUrl + "${i}", "PATCH", args);
    }) as any as typeof ${t}.PATCH,
      `),r+=`
  ${t}: {
    ${g}${u}${d}${h}${v}
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
};`;yield l(e,o,"apis.ts")})}function P(e,s){return c(this,null,function*(){let r="";for(let o of s){let n=o.replace(e,"").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue",""),i=o.replace(e,".").replace(".tsx","").replace(".ts","").replace(".vue",""),p=o.replace(e+"/","").replace("/+page.tsx","").replace("/+page.ts","").replace("/+page.vue","").split("/").join("_");p.indexOf("+page.")>-1&&(p="_"),r+=`
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
`;yield l(e,a,"pages.ts")})}var T=`
export const fastifyApi = (app: any, baseUrl = "") => {
  serveArray.forEach((item) => {
    Object.keys(item.serve).forEach((method) => {
      const fn = (item.serve as any)[method];
      const url = baseUrl + item.path;
      console.log("__debug__", item.path, method);
      switch (method) {
        case "GET":
          app.get(url, async (req: any, rej: any) => {
            const out = await Promise.resolve(fn(req.query));
            return rej.send(out);
          });
          break;
        case "POST":
          app.post(url, async (req: any, rej: any) => {
            const out = await Promise.resolve(fn(JSON.parse(req.body as never)));
            return rej.send(out);
          });
          break;
        case "PUT":
          app.put(url, async (req: any, rej: any) => {
            const out = await Promise.resolve(fn(JSON.parse(req.body as never)));
            return rej.send(out);
          });
          break;
        case "DELETE":
          app.delete(url, async (req: any, rej: any) => {
            const out = await Promise.resolve(fn(JSON.parse(req.body as never)));
            return rej.send(out);
          });
          break;
        case "PATCH":
          app.patch(url, async (req: any, rej: any) => {
            const out = await Promise.resolve(fn(JSON.parse(req.body as never)));
            return rej.send(out);
          });
          break;
        default:
      }
    });
  });
};
`;function $(e,s){return c(this,null,function*(){let r="",a="";for(let n of s){let i=n.replace(e,"").replace("/+serve.ts",""),p=n.replace(e,".").replace(".tsx","").replace(".ts",""),t=n.replace(e+"/","").replace("/+serve.ts","").split("/").join("_");a+=`import * as ${t} from "${p}";  
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

${T}
`;yield l(e,o,"serves.ts")})}var C=(...e)=>q(process.cwd(),...e);function G(e,s){L(e),s&&k.watch(C(e),r=>{console.log("__debug__",r)})}function L(e){return c(this,null,function*(){let[s,r]=yield Promise.all([x([`${e}/**/+page.(tsx|ts|vue)`]),x([`${e}/**/+serve.ts`])]);yield Promise.all([P(e,s),$(e,r),b(e,r)]),console.log("loaded glob-router")})}var re=G;export{re as default};
