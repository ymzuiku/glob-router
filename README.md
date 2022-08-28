# glob-router

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

```tsx
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

## Run glob-router

In your project run:

```sh
glob-router router
```

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
