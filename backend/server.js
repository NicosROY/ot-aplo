// Plans d'abonnement Stripe
const STRIPE_PLANS = {
  small_commune: {
    priceId: process.env.STRIPE_SMALL_COMMUNE_PRICE_ID,
    name: 'Petite commune',
    price: 99
  },
  medium_commune: {
    priceId: process.env.STRIPE_MEDIUM_COMMUNE_PRICE_ID,
    name: 'Commune moyenne',
    price: 199
  },
  large_commune: {
    priceId: process.env.STRIPE_LARGE_COMMUNE_PRICE_ID,
    name: 'Grande commune',
    price: 299
  }
}; 