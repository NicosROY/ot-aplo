// Plans d'abonnement
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'small_commune',
    name: 'Petite commune',
    price: 99,
    description: 'Pour les communes de moins de 10 000 habitants',
    features: [
      'Publication d\'événements illimitée',
      'Support client',
      'Jusqu\'à 5 utilisateurs',
      'Sans billetterie'
    ],
    populationLimit: 10000
  },
  {
    id: 'medium_commune',
    name: 'Commune moyenne',
    price: 199,
    description: 'Pour les communes de 10 000 à 100 000 habitants',
    features: [
      'Publication d\'événements illimitée',
      'Support client prioritaire',
      'Jusqu\'à 10 utilisateurs',
      'Sans billetterie'
    ],
    populationLimit: 100000
  },
  {
    id: 'large_commune',
    name: 'Grande commune',
    price: 299,
    description: 'Pour les communes de plus de 100 000 habitants',
    features: [
      'Publication d\'événements illimitée',
      'Support client prioritaire',
      'Jusqu\'à 15 utilisateurs',
      'Sans billetterie'
    ],
    populationLimit: 999999
  }
]; 