import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, Moon, Droplets, TrendingUp, AlertTriangle, CheckCircle, Menu, X, Home, BarChart3, Utensils, Settings, User, MapPin, Clock, Dumbbell, Zap, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUser } from "@/contexts/UserContext";
import { getAthleteData } from "@/data/dummyData";

const AthleteDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [animateDashboard, setAnimateDashboard] = useState(false);
  const { user } = useUser();

  // Generate varied dummy data
  const dummyData = getAthleteData();

  // Use user data from context, fallback to varied dummy data if not available
  const athleteData = user ? {
    name: user.name,
    injuryRisk: user.injuryRisk || dummyData.injuryRisk,
    readinessScore: user.trainingReadiness || dummyData.trainingReadiness,
    hrv: user.metrics?.hrv || dummyData.metrics.hrv,
    sleepHours: user.metrics?.sleep || dummyData.metrics.sleep,
    hydration: user.metrics?.hydration || dummyData.metrics.hydration,
    trainingLoad: user.metrics?.trainingLoad || dummyData.metrics.trainingLoad,
    stressLevel: user.metrics?.stress || dummyData.metrics.stress,
    recoveryScore: user.recoveryScore || dummyData.recoveryScore
  } : {
    name: dummyData.name,
    injuryRisk: dummyData.injuryRisk,
    readinessScore: dummyData.trainingReadiness,
    hrv: dummyData.metrics.hrv,
    sleepHours: dummyData.metrics.sleep,
    hydration: dummyData.metrics.hydration,
    trainingLoad: dummyData.metrics.trainingLoad,
    stressLevel: dummyData.metrics.stress,
    recoveryScore: dummyData.recoveryScore
  };

  // Nutrition dummy data
  const nutritionData = {
    dailyCalories: 2450,
    targetCalories: 2800,
    protein: 145,
    carbs: 280,
    fats: 75,
    waterIntake: 2.8,
    targetWater: 3.5,
    meals: [
      {
        name: "Breakfast",
        time: "07:30 AM",
        calories: 620,
        protein: 35,
        carbs: 75,
        fats: 18,
        items: ["Oatmeal with berries", "Greek yogurt", "Scrambled eggs", "Orange juice"]
      },
      {
        name: "Lunch",
        time: "12:45 PM",
        calories: 850,
        protein: 48,
        carbs: 95,
        fats: 28,
        items: ["Grilled chicken breast", "Brown rice", "Mixed vegetables", "Avocado salad"]
      },
      {
        name: "Pre-Workout Snack",
        time: "03:30 PM",
        calories: 280,
        protein: 12,
        carbs: 45,
        fats: 8,
        items: ["Banana", "Protein bar", "Almonds"]
      },
      {
        name: "Dinner",
        time: "07:00 PM",
        calories: 700,
        protein: 50,
        carbs: 65,
        fats: 21,
        items: ["Salmon fillet", "Sweet potato", "Steamed broccoli", "Quinoa"]
      }
    ],
    recommendations: [
      "Increase protein intake by 20g for optimal recovery",
      "Add 500ml more water before training",
      "Consider complex carbs 2 hours pre-workout",
      "Post-workout meal within 30 minutes recommended"
    ],
    supplements: [
      { name: "Whey Protein", amount: "30g", timing: "Post-workout" },
      { name: "Creatine", amount: "5g", timing: "Daily" },
      { name: "Omega-3", amount: "2g", timing: "With meals" },
      { name: "Vitamin D", amount: "2000 IU", timing: "Morning" }
    ]
  };

  // Animated progress states
  const [animatedTrainingLoad, setAnimatedTrainingLoad] = useState(0);
  const [animatedStressLevel, setAnimatedStressLevel] = useState(0);
  const [animatedRecoveryScore, setAnimatedRecoveryScore] = useState(0);
  const [animatedCalories, setAnimatedCalories] = useState(0);
  const [animatedProtein, setAnimatedProtein] = useState(0);
  const [animatedCarbs, setAnimatedCarbs] = useState(0);
  const [animatedFats, setAnimatedFats] = useState(0);
  const [animatedWater, setAnimatedWater] = useState(0);
  const [animatedInjuryRisk, setAnimatedInjuryRisk] = useState(0);
  const [animatedHrv, setAnimatedHrv] = useState(0);
  const [animatedSleep, setAnimatedSleep] = useState(0);
  const [animatedHydration, setAnimatedHydration] = useState(0);

  // Trigger animation on component mount
  useEffect(() => {
    setAnimateDashboard(true);
  }, []);

  // Animation effect for progress bars
  useEffect(() => {
    if (!animateDashboard) return;

    const animateProgress = (setter, target, isFloat = false) => {
      const increment = isFloat ? 0.1 : 1;
      const steps = isFloat ? Math.ceil(target / increment) : target;
      let current = 0;
      let count = 0;
      const timer = setInterval(() => {
        count++;
        current = increment * count;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
        }
      }, 1000); // Update every 1000ms (1 second) for slow counting
    };

    // Reset animated values to 0 before animating
    setAnimatedTrainingLoad(0);
    setAnimatedStressLevel(0);
    setAnimatedRecoveryScore(0);
    setAnimatedCalories(0);
    setAnimatedProtein(0);
    setAnimatedCarbs(0);
    setAnimatedFats(0);
    setAnimatedWater(0);
    setAnimatedInjuryRisk(0);
    setAnimatedHrv(0);
    setAnimatedSleep(0);
    setAnimatedHydration(0);

    // Animate training load metrics
    animateProgress(setAnimatedTrainingLoad, athleteData.trainingLoad);
    animateProgress(setAnimatedStressLevel, athleteData.stressLevel);
    animateProgress(setAnimatedRecoveryScore, athleteData.recoveryScore);

    // Animate nutrition metrics
    animateProgress(setAnimatedCalories, nutritionData.dailyCalories);
    animateProgress(setAnimatedProtein, nutritionData.protein);
    animateProgress(setAnimatedCarbs, nutritionData.carbs);
    animateProgress(setAnimatedFats, nutritionData.fats);
    animateProgress(setAnimatedWater, nutritionData.waterIntake);

    // Animate metric card values with staggered delays
    setTimeout(() => animateProgress(setAnimatedInjuryRisk, athleteData.injuryRisk), 0);
    setTimeout(() => animateProgress(setAnimatedHrv, athleteData.hrv), 200);
    setTimeout(() => animateProgress(setAnimatedSleep, athleteData.sleepHours, true), 400); // Float for sleep hours
    setTimeout(() => animateProgress(setAnimatedHydration, athleteData.hydration), 600);
    // Animate metric card values
    animateProgress(setAnimatedInjuryRisk, athleteData.injuryRisk);
    animateProgress(setAnimatedHrv, athleteData.hrv);
    animateProgress(setAnimatedSleep, athleteData.sleepHours, true); // Float for sleep hours
    animateProgress(setAnimatedHydration, athleteData.hydration);
  }, [animateDashboard, user]); // Depend on animateDashboard and user

  const getRiskColor = (risk) => {
    if (risk < 30) return 'text-green-500';
    if (risk < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskBg = (risk) => {
    if (risk < 30) return 'bg-green-100';
    if (risk < 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getReadinessColor = (score) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const MetricCard = ({ icon: Icon, title, value, subtitle, color, animatedValue }: { icon: any; title: string; value: string; subtitle: string; color: string; animatedValue?: string | number }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className={`text-3xl font-bold ${color} mb-1`}>{animatedValue !== undefined ? animatedValue : value}</p>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );

  const NutritionProgress = ({ label, current, target, unit }) => {
    const percentage = (current / target) * 100;
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-600">{current}{unit} / {target}{unit}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Activity className="w-8 h-8 text-blue-400" />
            <h1 className="text-xl font-bold">StrydeAI</h1>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setAnimateDashboard(true);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'nutrition' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <Utensils className="w-5 h-5" />
              <span>Nutrition</span>
            </button>
            <Link to="/stress-map">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <MapPin className="w-5 h-5" />
                <span>Stress Map</span>
              </button>
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">{athleteData.name}</p>
              <p className="text-sm text-gray-400">Athlete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <p className="text-lg text-gray-600">Welcome, {athleteData.name}!</p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeTab === 'dashboard' ? 'Performance Dashboard' : activeTab === 'nutrition' ? 'Nutrition Tracker' : 'Stress Map'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Training Readiness</p>
                <p className={`text-2xl font-bold ${getReadinessColor(athleteData.readinessScore)}`}>
                  {athleteData.readinessScore}%
                </p>
              </div>
              <Link to="/onboarding">
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Onboarding
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="p-6">
            {/* Alert Banner */}
            <div className={`${getRiskBg(athleteData.injuryRisk)} border-l-4 ${athleteData.injuryRisk < 30 ? 'border-green-500' : athleteData.injuryRisk < 70 ? 'border-yellow-500' : 'border-red-500'} p-4 rounded-lg mb-6`}>
              <div className="flex items-center gap-3">
                {athleteData.injuryRisk < 30 ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <AlertTriangle className={`w-6 h-6 ${athleteData.injuryRisk < 70 ? 'text-yellow-500' : 'text-red-500'}`} />
                )}
                <div>
                  <h3 className="font-bold text-gray-800">
                    {athleteData.injuryRisk < 30 ? 'Low Injury Risk' : athleteData.injuryRisk < 70 ? 'Moderate Injury Risk' : 'High Injury Risk'}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {athleteData.injuryRisk < 30 
                      ? 'Your body is well-recovered. Great time for intense training!'
                      : athleteData.injuryRisk < 70 
                      ? 'Consider moderate intensity today. Focus on form and recovery.'
                      : 'Rest or light recovery recommended. Your body needs time to adapt.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <MetricCard
                icon={AlertTriangle}
                title="Injury Risk"
                value={`${athleteData.injuryRisk}%`}
                subtitle="Current risk level"
                color={getRiskColor(athleteData.injuryRisk)}
                animatedValue={animateDashboard ? `${animatedInjuryRisk}%` : undefined}
              />
              <MetricCard
                icon={Heart}
                title="HRV Score"
                value={athleteData.hrv.toString()}
                subtitle="Heart Rate Variability"
                color="text-purple-500"
                animatedValue={animateDashboard ? animatedHrv.toString() : undefined}
              />
              <MetricCard
                icon={Moon}
                title="Sleep Quality"
                value={`${athleteData.sleepHours}h`}
                subtitle="Last night"
                color="text-indigo-500"
                animatedValue={animateDashboard ? `${animatedSleep}h` : undefined}
              />
              <MetricCard
                icon={Droplets}
                title="Hydration"
                value={`${athleteData.hydration}%`}
                subtitle="Daily target"
                color="text-cyan-500"
                animatedValue={animateDashboard ? `${animatedHydration}%` : undefined}
              />
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Training Load</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Current Load</span>
                      <span className="text-sm text-gray-600">{animatedTrainingLoad}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${animatedTrainingLoad}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Stress Level</span>
                      <span className="text-sm text-gray-600">{animatedStressLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${animatedStressLevel}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Recovery Score</span>
                      <span className="text-sm text-gray-600">{animatedRecoveryScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${animatedRecoveryScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Moderate Intensity Workout</p>
                      <p className="text-sm text-gray-600">45-60 min cardio or strength training</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Focus on Recovery</p>
                      <p className="text-sm text-gray-600">Stretching, foam rolling, 8+ hours sleep</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
                    <Droplets className="w-5 h-5 text-cyan-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Hydration Reminder</p>
                      <p className="text-sm text-gray-600">Drink 500ml before your workout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nutrition Content */}
        {activeTab === 'nutrition' && (
          <div className="p-6">
            {/* Nutrition Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Daily Macros</h3>
                <NutritionProgress label="Calories" current={nutritionData.dailyCalories} target={nutritionData.targetCalories} unit=" kcal" />
                <NutritionProgress label="Protein" current={nutritionData.protein} target={165} unit="g" />
                <NutritionProgress label="Carbs" current={nutritionData.carbs} target={320} unit="g" />
                <NutritionProgress label="Fats" current={nutritionData.fats} target={85} unit="g" />
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Hydration</h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Droplets className="w-24 h-24 text-cyan-400" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-cyan-600">{nutritionData.waterIntake}L</span>
                    </div>
                  </div>
                </div>
                <NutritionProgress label="Water Intake" current={animatedWater} target={nutritionData.targetWater} unit="L" />
                <p className="text-sm text-gray-600 mt-2">Goal: {nutritionData.targetWater}L per day</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Supplements</h3>
                <div className="space-y-3">
                  {nutritionData.supplements.map((supp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-800">{supp.name}</p>
                        <p className="text-xs text-gray-600">{supp.timing}</p>
                      </div>
                      <span className="text-sm font-medium text-blue-600">{supp.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Meals */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Meals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nutritionData.meals.map((meal, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-800">{meal.name}</h4>
                        <p className="text-sm text-gray-600">{meal.time}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {meal.calories} kcal
                      </span>
                    </div>
                    <div className="flex gap-4 mb-3 text-sm">
                      <span className="text-gray-600">P: <span className="font-medium">{meal.protein}g</span></span>
                      <span className="text-gray-600">C: <span className="font-medium">{meal.carbs}g</span></span>
                      <span className="text-gray-600">F: <span className="font-medium">{meal.fats}g</span></span>
                    </div>
                    <div className="space-y-1">
                      {meal.items.map((item, i) => (
                        <p key={i} className="text-sm text-gray-600">• {item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">AI Nutrition Recommendations</h3>
              <div className="space-y-3">
                {nutritionData.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AthleteDashboard;