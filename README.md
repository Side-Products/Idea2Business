# Project2Product

https://project2product.vercel.app

## Start MongoDB locally

`brew services start mongodb-community`

## Stripe

`stripe listen --events checkout.session.completed --forward-to localhost:3000/api/stripe/webhook/checkout-session-completed`