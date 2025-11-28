// Function to generate varied athlete data with randomization and time-based factors
export const getAthleteData = () => {
  // Base values
  const baseHrv = 65;
  const baseSleep = 7.5;
  const baseHydration = 85;
  const baseStress = 35;
  const baseRestingHeartRate = 52;
  const baseTrainingLoad = 450;
  const baseInjuryRisk = 28;
  const baseTrainingReadiness = 82;
  const baseRecoveryScore = 78;

  // Randomization factor (±5%)
  const randomFactor = () => (Math.random() - 0.5) * 0.1;

  // Time-based cyclic variation (e.g., daily cycle)
  const timeFactor = Math.sin(Date.now() / (1000 * 60 * 60 * 24)) * 0.05;

  // Apply variations
  const variedHrv = Math.max(20, Math.min(100, baseHrv * (1 + randomFactor() + timeFactor)));
  const variedSleep = Math.max(4, Math.min(12, baseSleep * (1 + randomFactor() + timeFactor)));
  const variedHydration = Math.max(50, Math.min(100, baseHydration * (1 + randomFactor())));
  const variedStress = Math.max(10, Math.min(90, baseStress * (1 + randomFactor())));
  const variedRestingHeartRate = Math.max(40, Math.min(80, baseRestingHeartRate * (1 + randomFactor())));
  const variedTrainingLoad = Math.max(200, Math.min(800, baseTrainingLoad * (1 + randomFactor())));
  const variedInjuryRisk = Math.max(10, Math.min(90, baseInjuryRisk * (1 + randomFactor())));
  const variedTrainingReadiness = Math.max(20, Math.min(100, baseTrainingReadiness * (1 + randomFactor())));
  const variedRecoveryScore = Math.max(20, Math.min(100, baseRecoveryScore * (1 + randomFactor())));

  return {
    id: "1",
    name: "Mwalish Brian",
    email: "Mwalish@example.com",
    age: 28,
    sport: "Running",

    metrics: {
      hrv: Math.round(variedHrv),
      sleep: parseFloat(variedSleep.toFixed(1)),
      hydration: Math.round(variedHydration),
      stress: Math.round(variedStress),
      restingHeartRate: Math.round(variedRestingHeartRate),
      trainingLoad: Math.round(variedTrainingLoad),
    },

    injuryRisk: Math.round(variedInjuryRisk),
    trainingReadiness: Math.round(variedTrainingReadiness),
    recoveryScore: Math.round(variedRecoveryScore),

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
};

// For backward compatibility, export a static version (though it will be varied on each import)
export const athleteData = getAthleteData();

export const coachAthletes = [
  {
    id: "1",
    name: "Mwalish Brian",
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

// Function to generate body-specific stress data based on overall stress level
export const generateBodyStressData = (baseStress: number = 35) => {
  // Base stress levels for different body parts (relative to overall stress)
  const baseBodyStress = {
    front: {
      head: { level: 25, fatigue: 20, jointLoad: 15, stress: 25 },
      neck: { level: 35, fatigue: 30, jointLoad: 25, stress: 35 },
      shoulders: { level: 45, fatigue: 40, jointLoad: 35, stress: 45 },
      chest: { level: 30, fatigue: 25, jointLoad: 20, stress: 30 },
      arms: { level: 40, fatigue: 35, jointLoad: 30, stress: 40 },
      elbows: { level: 50, fatigue: 45, jointLoad: 40, stress: 50 },
      wrists: { level: 35, fatigue: 30, jointLoad: 25, stress: 35 },
      hands: { level: 30, fatigue: 25, jointLoad: 20, stress: 30 },
      abdomen: { level: 25, fatigue: 20, jointLoad: 15, stress: 25 },
      hips: { level: 55, fatigue: 50, jointLoad: 45, stress: 55 },
      thighs: { level: 60, fatigue: 55, jointLoad: 50, stress: 60 },
      knees: { level: 65, fatigue: 60, jointLoad: 55, stress: 65 },
      shins: { level: 40, fatigue: 35, jointLoad: 30, stress: 40 },
      ankles: { level: 45, fatigue: 40, jointLoad: 35, stress: 45 },
      feet: { level: 35, fatigue: 30, jointLoad: 25, stress: 35 },
    },
    back: {
      head: { level: 25, fatigue: 20, jointLoad: 15, stress: 25 },
      neck: { level: 35, fatigue: 30, jointLoad: 25, stress: 35 },
      upperBack: { level: 50, fatigue: 45, jointLoad: 40, stress: 50 },
      midBack: { level: 40, fatigue: 35, jointLoad: 30, stress: 40 },
      lowerBack: { level: 70, fatigue: 65, jointLoad: 60, stress: 70 },
      glutes: { level: 55, fatigue: 50, jointLoad: 45, stress: 55 },
      hamstrings: { level: 60, fatigue: 55, jointLoad: 50, stress: 60 },
      calves: { level: 45, fatigue: 40, jointLoad: 35, stress: 45 },
      heels: { level: 30, fatigue: 25, jointLoad: 20, stress: 30 },
    }
  };

  // Apply overall stress modifier and randomization
  const stressModifier = baseStress / 35; // Normalize to base stress of 35
  const randomFactor = () => (Math.random() - 0.5) * 0.2; // ±10% randomization

  const applyStressVariation = (bodyPart: any) => ({
    level: Math.max(10, Math.min(100, Math.round(bodyPart.level * stressModifier * (1 + randomFactor())))),
    fatigue: Math.max(10, Math.min(100, Math.round(bodyPart.fatigue * stressModifier * (1 + randomFactor())))),
    jointLoad: Math.max(10, Math.min(100, Math.round(bodyPart.jointLoad * stressModifier * (1 + randomFactor())))),
    stress: Math.max(10, Math.min(100, Math.round(bodyPart.stress * stressModifier * (1 + randomFactor())))),
  });

  return {
    front: Object.fromEntries(
      Object.entries(baseBodyStress.front).map(([key, value]) => [key, applyStressVariation(value)])
    ),
    back: Object.fromEntries(
      Object.entries(baseBodyStress.back).map(([key, value]) => [key, applyStressVariation(value)])
    ),
  };
};

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
