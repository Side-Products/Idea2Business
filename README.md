# Idea2Business

<img src="./public/product_image_1.png" alt="Product Image" />

<br />

Production: https://idea2business.xyz

Latest Dev Updates: https://idea2business.vercel.app


## Instructions

### Start MongoDB locally

On MacOS: `brew services start mongodb-community`

### Environment Variables

```
Note: .env.example is an example of the secrets file. .env.*.local should be added to .gitignore, as those files are intended to be ignored. .env.development.local is where secrets can be stored.

Defaults are set in .env.example

Create .env.development.local file and replace env variables with your own taking reference from .env.example
```

Environment variables load order- https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order

Change env variables on Vercel from CLI- https://vercel.com/docs/cli/env

To turn on dev server-
```sh
npm run dev
```

#### Using Docker

Build a docker container- 
```sh
docker-compose up -d --build
```

To turn off dev server-
```sh
docker-compose down
```

Turn on dev server-
```sh
docker-compose up
```

### Stripe

`stripe listen --events checkout.session.completed --forward-to localhost:3000/api/stripe/webhook/checkout-session-completed`

### MongoDB

`https://cloud.mongodb.com/v2/6412a28af4469f464b79439a#/metrics/replicaSet/6412a30a91bfdb60b1d488a9/explorer/project2product/users/find`

