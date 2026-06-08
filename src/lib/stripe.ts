import Stripe from "stripe";

const apiKey = process.env.STRIPE_API_KEY && process.env.STRIPE_API_KEY.trim() !== ""
  ? process.env.STRIPE_API_KEY
  : "sk_test_dummy_stripe_key_for_build";

const stripe = new Stripe(apiKey, {
  apiVersion: "2024-12-18.acacia" as any,
});

export default stripe;
