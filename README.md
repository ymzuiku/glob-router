# glob-router

- Zero dependency
- Any frontend/backend framework
- Only prebuild

Use glob create client's router map and service's controller, Ignore the any framework

Your product like this:

```sh
src/
  routers/
    home/
      +page.tsx
      +serve.ts
      register
        +page.tsx
        +serve.ts
    market/
      +page.tsx
      +serve.ts
    user/
      +page.tsx
      +serve.ts
  index.ts
  serve.ts
```

file `+page.tsx` is a client's route:

```tsx
export default () => {
  // any react or solid or any can use tsx / ts framework
};
```

file `+serve.tsx` is a serve's route:

Case1, use RESTFull names:

```tsx
/*
Create - POST
Read - GET
Update - PATCH
Delete - DELETE
Create or update - PUT
*/

export const GET = () => {
  // do your service
};
export const POST = () => {
  // do your service
};
// export const DELETE ...
// export const PUT ...
// export const PATCH ...
```

Case2, use function name and .(GET|POST|PUT|PATCH|DELETE) url:

```tsx
export const getTasks = () => {
  // do your service
};
// use .GET, create GET router
getTasks.GET = true;

export const getTaskDetail = () => {
  // do your service
};
getTaskDetail.GET = true;

export const addTask = () => {
  // do your service
};
addTask.POST = true;
```

## Run glob-router

In your project run:

```sh
glob-router router
```

If you need watch:

```sh
glob-router router -w
```

### If Use webpack / vite:

```js
import globRouter from "glob-router";

const isProd = process.env.NODE_ENV === "production";
// If not production, use watch
globRouter("./src/routers", !isProd);

export default viteConfig / webpackConfig;
```

## Effect

We can get:

```sh
router/
  /<old dirs>
  _apis.ts
  _serves.ts
  _pages.ts
```

## That's all

- Use pages.ts in your client's project, and use apis.ts in your `fetch data`
- Use serves.ts in your nodejs service, use fastify / example or any web framework
