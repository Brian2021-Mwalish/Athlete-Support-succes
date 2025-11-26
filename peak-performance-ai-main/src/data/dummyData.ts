export const athleteData = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.j@example.com",
  age: 28,
  sport: "Running",
  
  metrics: {
    hrv: 65,
    sleep: 7.5,
    hydration: 85,
    stress: 35,
    restingHeartRate: 52,
    trainingLoad: 450,
  },
  
  injuryRisk: 28,
  trainingReadiness: 82,
  recoveryScore: 78,
  
  weeklyProgress: [
    { day: "Mon", readiness: 75, load: 420 },
    { day: "Tue", readiness: 78, load: 380 },
    { day: "Wed", readiness: 72, load: 500 },
    { day: "Thu", readiness: 85, load: 350 },
    { day: "Fri", readiness: 82, load: 450 },
    { day: "Sat", readiness: 88, load: 300 },
    { day: "Sun", readiness: 82, load: 400 },
  ],
  
  todaysWorkout: {
    type: "Interval Training",
    duration: "45 minutes",
    intensity: "Moderate-High",
    description: "5 min warmup, 6x (3 min at tempo, 2 min recovery), 5 min cooldown",
    expectedCalories: 520,
  },
  
  recovery: {
    sleepRecommendation: "Target 8-9 hours tonight",
    hydrationTarget: "3.2L throughout the day",
    nutritionFocus: "High protein post-workout (30g within 30 mins)",
    activeRecovery: "Light yoga or 20-min walk recommended",
  },
  
  nutrition: {
    dailyCalories: 2400,
    currentIntake: 1850,
    macros: {
      protein: { current: 110, target: 150 },
      carbs: { current: 220, target: 280 },
      fats: { current: 65, target: 70 },
    },
    mealSuggestions: [
      {
        meal: "Pre-Workout",
        time: "1 hour before training",
        suggestion: "Banana with peanut butter, or oatmeal with berries",
      },
      {
        meal: "Post-Workout",
        time: "Within 30 minutes",
        suggestion: "Grilled chicken with quinoa and vegetables, or protein shake with fruit",
      },
      {
        meal: "Dinner",
        time: "2-3 hours before bed",
        suggestion: "Salmon with sweet potato and broccoli",
      },
    ],
  },
};

export const coachAthletes = [
  {
    id: "1",
    name: "Sarah Johnson",
    sport: "Running",
    injuryRisk: 28,
    readiness: 82,
    lastWorkout: "2 hours ago",
    status: "success" as const,
  },
  {
    id: "2",
    name: "Mike Chen",
    sport: "Weightlifting",
    injuryRisk: 65,
    readiness: 45,
    lastWorkout: "1 day ago",
    status: "warning" as const,
  },
  {
    id: "3",
    name: "Emma Davis",
    sport: "CrossFit",
    injuryRisk: 42,
    readiness: 68,
    lastWorkout: "5 hours ago",
    status: "success" as const,
  },
  {
    id: "4",
    name: "James Wilson",
    sport: "Swimming",
    injuryRisk: 78,
    readiness: 38,
    lastWorkout: "12 hours ago",
    status: "destructive" as const,
  },
  {
    id: "5",
    name: "Lisa Anderson",
    sport: "Cycling",
    injuryRisk: 35,
    readiness: 75,
    lastWorkout: "3 hours ago",
    status: "success" as const,
  },
];

export const adminStats = {
  totalUsers: 1247,
  activeAthletes: 892,
  activeCoaches: 156,
  totalWorkouts: 15634,
  avgInjuryRisk: 42,
  
  userGrowth: [
    { month: "Jan", users: 850 },
    { month: "Feb", users: 920 },
    { month: "Mar", users: 1050 },
    { month: "Apr", users: 1120 },
    { month: "May", users: 1180 },
    { month: "Jun", users: 1247 },
  ],
  
  riskDistribution: [
    { level: "Low Risk", count: 534, color: "hsl(var(--success))" },
    { level: "Medium Risk", count: 489, color: "hsl(var(--warning))" },
    { level: "High Risk", count: 224, color: "hsl(var(--destructive))" },
  ],
};
