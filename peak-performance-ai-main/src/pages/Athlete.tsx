import { Navigation } from "@/components/Navigation";
import { MetricCard } from "@/components/MetricCard";
import { RiskScoreCard } from "@/components/RiskScoreCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { athleteData } from "@/data/dummyData";
import { 
  Heart, 
  Moon, 
  Droplets, 
  Brain, 
  Activity, 
  TrendingUp,
  Apple,
  Dumbbell,
  Clock
} from "lucide-react";

const Athlete = () => {
  const { metrics, injuryRisk, trainingReadiness, recoveryScore, todaysWorkout, recovery, nutrition, weeklyProgress } = athleteData;

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="athlete" userName={athleteData.name} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, {athleteData.name.split(" ")[0]}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's your performance overview for today
          </p>
        </div>

        {/* Main Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <RiskScoreCard score={injuryRisk} />
          
          <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Training Readiness</h3>
              <div className="p-3 rounded-xl bg-primary/20">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-foreground">{trainingReadiness}%</span>
                <span className="text-lg font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary">
                  Good to Go
                </span>
              </div>
              <Progress value={trainingReadiness} className="h-3 [&>div]:bg-primary" />
            </div>
          </Card>

          <Card className="p-6 border-2 border-success/30 bg-gradient-to-br from-success/10 to-transparent">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recovery Score</h3>
              <div className="p-3 rounded-xl bg-success/20">
                <Activity className="w-6 h-6 text-success" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-foreground">{recoveryScore}%</span>
                <span className="text-lg font-semibold px-3 py-1 rounded-full bg-success/20 text-success">
                  Well Recovered
                </span>
              </div>
              <Progress value={recoveryScore} className="h-3 [&>div]:bg-success" />
            </div>
          </Card>
        </div>

        {/* Health Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Today's Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="HRV (Heart Rate Variability)"
              value={metrics.hrv}
              icon={Heart}
              status="success"
              trend={{ value: 5, isPositive: true }}
            />
            <MetricCard
              title="Sleep Quality"
              value={`${metrics.sleep}h`}
              icon={Moon}
              status="success"
              trend={{ value: 8, isPositive: true }}
            />
            <MetricCard
              title="Hydration Level"
              value={`${metrics.hydration}%`}
              icon={Droplets}
              status="warning"
            />
            <MetricCard
              title="Stress Level"
              value={metrics.stress}
              icon={Brain}
              status="success"
              trend={{ value: 10, isPositive: false }}
            />
            <MetricCard
              title="Resting Heart Rate"
              value={`${metrics.restingHeartRate} bpm`}
              icon={Heart}
            />
            <MetricCard
              title="Training Load"
              value={metrics.trainingLoad}
              icon={Dumbbell}
              status="warning"
              trend={{ value: 12, isPositive: true }}
            />
          </div>
        </div>

        {/* Today's Workout */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Today's Recommended Workout</h2>
          <Card className="p-6 bg-primary border-none text-primary-foreground">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{todaysWorkout.type}</h3>
                <div className="flex items-center space-x-4 text-sm opacity-90">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {todaysWorkout.duration}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20">
                    {todaysWorkout.intensity}
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-primary-foreground/20">
                <Dumbbell className="w-8 h-8" />
              </div>
            </div>
            <p className="text-primary-foreground/90 mb-4">{todaysWorkout.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-primary-foreground/20">
              <span className="text-sm">Expected Calories</span>
              <span className="text-xl font-bold">{todaysWorkout.expectedCalories} kcal</span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recovery Guidance */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Recovery Guidance</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Moon className="w-5 h-5 mr-2 text-primary" />
                    Sleep
                  </h4>
                  <p className="text-muted-foreground">{recovery.sleepRecommendation}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Droplets className="w-5 h-5 mr-2 text-primary" />
                    Hydration
                  </h4>
                  <p className="text-muted-foreground">{recovery.hydrationTarget}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Apple className="w-5 h-5 mr-2 text-primary" />
                    Nutrition
                  </h4>
                  <p className="text-muted-foreground">{recovery.nutritionFocus}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Active Recovery
                  </h4>
                  <p className="text-muted-foreground">{recovery.activeRecovery}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Nutrition */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Nutrition Plan</h2>
            <Card className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Daily Calories</span>
                  <span className="text-lg font-bold text-foreground">
                    {nutrition.currentIntake} / {nutrition.dailyCalories} kcal
                  </span>
                </div>
                <Progress 
                  value={(nutrition.currentIntake / nutrition.dailyCalories) * 100} 
                  className="h-2"
                />
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Protein</span>
                    <span className="text-sm font-medium">{nutrition.macros.protein.current}g / {nutrition.macros.protein.target}g</span>
                  </div>
                  <Progress value={(nutrition.macros.protein.current / nutrition.macros.protein.target) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Carbs</span>
                    <span className="text-sm font-medium">{nutrition.macros.carbs.current}g / {nutrition.macros.carbs.target}g</span>
                  </div>
                  <Progress value={(nutrition.macros.carbs.current / nutrition.macros.carbs.target) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Fats</span>
                    <span className="text-sm font-medium">{nutrition.macros.fats.current}g / {nutrition.macros.fats.target}g</span>
                  </div>
                  <Progress value={(nutrition.macros.fats.current / nutrition.macros.fats.target) * 100} className="h-2" />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <h4 className="font-semibold text-foreground">Meal Suggestions</h4>
                {nutrition.mealSuggestions.map((meal, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{meal.meal}</span>
                      <span className="text-xs text-muted-foreground">{meal.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{meal.suggestion}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Athlete;
