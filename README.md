# Project2Product

https://project2product.vercel.app

## Start MongoDB locally

`brew services start mongodb-community`

## Stripe

`stripe listen --events checkout.session.completed --forward-to localhost:3000/api/stripe/webhook/checkout-session-completed`

## MongoDB

`https://cloud.mongodb.com/v2/6412a28af4469f464b79439a#/metrics/replicaSet/6412a30a91bfdb60b1d488a9/explorer/project2product/users/find`