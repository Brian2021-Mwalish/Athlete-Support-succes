import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUser } from "@/contexts/UserContext";
import { generateBodyStressData, getAthleteData } from "@/data/dummyData";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Dumbbell,
  Heart,
  MapPin,
  TrendingUp,
  Zap,
  Play,
  Pause
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const StressMap = () => {
  const { user } = useUser();
  const [stressData, setStressData] = useState(() => generateBodyStressData(getAthleteData().metrics.stress));
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Update stress data periodically
  useEffect(() => {
    if (!isSimulationActive) return;

    const interval = setInterval(() => {
      const athleteData = getAthleteData();
      setStressData(generateBodyStressData(athleteData.metrics.stress));
      setLastUpdate(Date.now());
    }, 8000); // Update every 8 seconds

    return () => clearInterval(interval);
  }, [isSimulationActive]);

  // Function to simulate stress spike
  const simulateStressSpike = useCallback(() => {
    const athleteData = getAthleteData();
    const spikedStress = Math.min(90, athleteData.metrics.stress + Math.floor(Math.random() * 20) + 10);
    setStressData(generateBodyStressData(spikedStress));
    setLastUpdate(Date.now());
  }, []);

  const getStressColor = (level: number) => {
    // Human skin tone colors with stress overlay
    const baseSkin = "#D4A574"; // Base skin tone
    if (level < 30) return `fill-[${baseSkin}]`; // Low stress - normal skin
    if (level < 50) return "fill-[#E6B17A]"; // Medium stress - slightly warmer
    return "fill-[#F4C2A1]"; // High stress - stressed skin tone
  };

  const getStressLabel = (level: number) => {
    if (level < 30) return "Low";
    if (level < 50) return "Medium";
    return "High";
  };

  // Dynamic recommendations based on current stress levels
  const getDynamicRecommendations = () => {
    const allBodyParts = { ...stressData.front, ...stressData.back };
    const highStressAreas = Object.entries(allBodyParts)
      .filter(([_, data]) => data.level >= 50)
      .sort((a, b) => b[1].level - a[1].level)
      .slice(0, 3);

    const recommendations = [];

    highStressAreas.forEach(([area, data]) => {
      let recommendation = "";
      let icon = Activity;

      switch (area) {
        case "lowerBack":
          recommendation = "Reduce training volume by 20% and incorporate core strengthening exercises";
          icon = Dumbbell;
          break;
        case "knees":
          recommendation = "Focus on proper form during squats and lunges, consider adding knee support";
          icon = Activity;
          break;
        case "shoulders":
          recommendation = "Include shoulder mobility work and reduce overhead pressing volume";
          icon = TrendingUp;
          break;
        case "hips":
          recommendation = "Incorporate hip mobility exercises and reduce high-impact activities";
          icon = Activity;
          break;
        case "thighs":
          recommendation = "Include more recovery time between leg workouts and add foam rolling";
          icon = Dumbbell;
          break;
        case "upperBack":
          recommendation = "Focus on posture correction and include upper back strengthening";
          icon = TrendingUp;
          break;
        case "neck":
          recommendation = "Practice neck mobility exercises and improve sleeping posture";
          icon = Activity;
          break;
        default:
          recommendation = "Monitor closely and consider reducing training intensity in this area";
          icon = AlertTriangle;
      }

      recommendations.push({
        area: area.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        level: getStressLabel(data.level),
        recommendation,
        icon
      });
    });

    // If no high stress areas, show general recommendations
    if (recommendations.length === 0) {
      recommendations.push({
        area: "General",
        level: "Low",
        recommendation: "Maintain current training regimen and continue monitoring stress levels",
        icon: CheckCircle
      });
    }

    return recommendations;
  };

  const recommendations = getDynamicRecommendations();

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {user?.name || "Athlete"}!</h1>
            <p className="text-lg text-muted-foreground">
              Visualize your body's stress levels and get personalized recovery recommendations
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Body Visualization */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Body Stress Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Simulation Controls */}
                  <div className="mb-6 p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Live Simulation</h3>
                      </div>
                      <Badge variant={isSimulationActive ? "default" : "secondary"}>
                        {isSimulationActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => setIsSimulationActive(!isSimulationActive)}
                        variant={isSimulationActive ? "destructive" : "default"}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {isSimulationActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isSimulationActive ? "Stop Simulation" : "Start Simulation"}
                      </Button>

                      <Button
                        onClick={simulateStressSpike}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Heart className="w-4 h-4" />
                        Simulate Stress Spike
                      </Button>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Last Update: {new Date(lastUpdate).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="front" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="front">Front View</TabsTrigger>
                      <TabsTrigger value="back">Back View</TabsTrigger>
                    </TabsList>

                    <TabsContent value="front" className="mt-6">
                      <div className="relative w-full max-w-md mx-auto">
                        {/* Front Body SVG */}
                        <svg viewBox="0 0 200 400" className="w-full h-auto">
                          {/* Head */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <circle
                                cx="100"
                                cy="30"
                                r="20"
                                className={`${getStressColor(stressData.front.head.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Head</p>
                                <p>Stress: {getStressLabel(stressData.front.head.level)}</p>
                                <p>Fatigue: {stressData.front.head.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Neck */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="90"
                                y="50"
                                width="20"
                                height="15"
                                className={`${getStressColor(stressData.front.neck.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Neck</p>
                                <p>Stress: {getStressLabel(stressData.front.neck.level)}</p>
                                <p>Fatigue: {stressData.front.neck.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Shoulders */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="60"
                                y="65"
                                width="80"
                                height="20"
                                className={`${getStressColor(stressData.front.shoulders.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Shoulders</p>
                                <p>Stress: {getStressLabel(stressData.front.shoulders.level)}</p>
                                <p>Fatigue: {stressData.front.shoulders.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Chest */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="75"
                                y="85"
                                width="50"
                                height="30"
                                className={`${getStressColor(stressData.front.chest.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Chest</p>
                                <p>Stress: {getStressLabel(stressData.front.chest.level)}</p>
                                <p>Fatigue: {stressData.front.chest.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Arms */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="45"
                                y="85"
                                width="15"
                                height="60"
                                className={`${getStressColor(stressData.front.arms.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Arm</p>
                                <p>Stress: {getStressLabel(stressData.front.arms.level)}</p>
                                <p>Fatigue: {stressData.front.arms.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="140"
                                y="85"
                                width="15"
                                height="60"
                                className={`${getStressColor(stressData.front.arms.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Arm</p>
                                <p>Stress: {getStressLabel(stressData.front.arms.level)}</p>
                                <p>Fatigue: {stressData.front.arms.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Elbows */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <circle
                                cx="52.5"
                                cy="155"
                                r="8"
                                className={`${getStressColor(stressData.front.elbows.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Elbow</p>
                                <p>Stress: {getStressLabel(stressData.front.elbows.level)}</p>
                                <p>Fatigue: {stressData.front.elbows.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <circle
                                cx="147.5"
                                cy="155"
                                r="8"
                                className={`${getStressColor(stressData.front.elbows.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Elbow</p>
                                <p>Stress: {getStressLabel(stressData.front.elbows.level)}</p>
                                <p>Fatigue: {stressData.front.elbows.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Wrists */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="45"
                                y="175"
                                width="15"
                                height="15"
                                className={`${getStressColor(stressData.front.wrists.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Wrist</p>
                                <p>Stress: {getStressLabel(stressData.front.wrists.level)}</p>
                                <p>Fatigue: {stressData.front.wrists.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="140"
                                y="175"
                                width="15"
                                height="15"
                                className={`${getStressColor(stressData.front.wrists.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Wrist</p>
                                <p>Stress: {getStressLabel(stressData.front.wrists.level)}</p>
                                <p>Fatigue: {stressData.front.wrists.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Hands */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="40"
                                y="190"
                                width="20"
                                height="20"
                                className={`${getStressColor(stressData.front.hands.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Hand</p>
                                <p>Stress: {getStressLabel(stressData.front.hands.level)}</p>
                                <p>Fatigue: {stressData.front.hands.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="140"
                                y="190"
                                width="20"
                                height="20"
                                className={`${getStressColor(stressData.front.hands.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Hand</p>
                                <p>Stress: {getStressLabel(stressData.front.hands.level)}</p>
                                <p>Fatigue: {stressData.front.hands.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Abdomen */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="80"
                                y="115"
                                width="40"
                                height="40"
                                className={`${getStressColor(stressData.front.abdomen.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Abdomen</p>
                                <p>Stress: {getStressLabel(stressData.front.abdomen.level)}</p>
                                <p>Fatigue: {stressData.front.abdomen.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Hips */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="70"
                                y="155"
                                width="60"
                                height="20"
                                className={`${getStressColor(stressData.front.hips.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Hips</p>
                                <p>Stress: {getStressLabel(stressData.front.hips.level)}</p>
                                <p>Fatigue: {stressData.front.hips.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Thighs */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="75"
                                y="175"
                                width="20"
                                height="60"
                                className={`${getStressColor(stressData.front.thighs.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Thigh</p>
                                <p>Stress: {getStressLabel(stressData.front.thighs.level)}</p>
                                <p>Fatigue: {stressData.front.thighs.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="105"
                                y="175"
                                width="20"
                                height="60"
                                className={`${getStressColor(stressData.front.thighs.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Thigh</p>
                                <p>Stress: {getStressLabel(stressData.front.thighs.level)}</p>
                                <p>Fatigue: {stressData.front.thighs.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Knees */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <circle
                                cx="85"
                                cy="245"
                                r="10"
                                className={`${getStressColor(stressData.front.knees.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Knee</p>
                                <p>Stress: {getStressLabel(stressData.front.knees.level)}</p>
                                <p>Fatigue: {stressData.front.knees.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <circle
                                cx="115"
                                cy="245"
                                r="10"
                                className={`${getStressColor(stressData.front.knees.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Knee</p>
                                <p>Stress: {getStressLabel(stressData.front.knees.level)}</p>
                                <p>Fatigue: {stressData.front.knees.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Shins */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="75"
                                y="255"
                                width="20"
                                height="50"
                                className={`${getStressColor(stressData.front.shins.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Shin</p>
                                <p>Stress: {getStressLabel(stressData.front.shins.level)}</p>
                                <p>Fatigue: {stressData.front.shins.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="105"
                                y="255"
                                width="20"
                                height="50"
                                className={`${getStressColor(stressData.front.shins.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Shin</p>
                                <p>Stress: {getStressLabel(stressData.front.shins.level)}</p>
                                <p>Fatigue: {stressData.front.shins.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Ankles */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <circle
                                cx="85"
                                cy="315"
                                r="8"
                                className={`${getStressColor(stressData.front.ankles.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Ankle</p>
                                <p>Stress: {getStressLabel(stressData.front.ankles.level)}</p>
                                <p>Fatigue: {stressData.front.ankles.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <circle
                                cx="115"
                                cy="315"
                                r="8"
                                className={`${getStressColor(stressData.front.ankles.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Ankle</p>
                                <p>Stress: {getStressLabel(stressData.front.ankles.level)}</p>
                                <p>Fatigue: {stressData.front.ankles.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Feet */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="70"
                                y="323"
                                width="30"
                                height="20"
                                className={`${getStressColor(stressData.front.feet.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Foot</p>
                                <p>Stress: {getStressLabel(stressData.front.feet.level)}</p>
                                <p>Fatigue: {stressData.front.feet.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="100"
                                y="323"
                                width="30"
                                height="20"
                                className={`${getStressColor(stressData.front.feet.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Foot</p>
                                <p>Stress: {getStressLabel(stressData.front.feet.level)}</p>
                                <p>Fatigue: {stressData.front.feet.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </svg>
                      </div>
                    </TabsContent>

                    <TabsContent value="back" className="mt-6">
                      <div className="relative w-full max-w-md mx-auto">
                        {/* Back Body SVG */}
                        <svg viewBox="0 0 200 400" className="w-full h-auto">
                          {/* Head */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <circle
                                cx="100"
                                cy="30"
                                r="20"
                                className={`${getStressColor(stressData.back.head.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Head</p>
                                <p>Stress: {getStressLabel(stressData.back.head.level)}</p>
                                <p>Fatigue: {stressData.back.head.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Neck */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="90"
                                y="50"
                                width="20"
                                height="15"
                                className={`${getStressColor(stressData.back.neck.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Neck</p>
                                <p>Stress: {getStressLabel(stressData.back.neck.level)}</p>
                                <p>Fatigue: {stressData.back.neck.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Upper Back */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="70"
                                y="65"
                                width="60"
                                height="30"
                                className={`${getStressColor(stressData.back.upperBack.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Upper Back</p>
                                <p>Stress: {getStressLabel(stressData.back.upperBack.level)}</p>
                                <p>Fatigue: {stressData.back.upperBack.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Mid Back */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="75"
                                y="95"
                                width="50"
                                height="25"
                                className={`${getStressColor(stressData.back.midBack.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Mid Back</p>
                                <p>Stress: {getStressLabel(stressData.back.midBack.level)}</p>
                                <p>Fatigue: {stressData.back.midBack.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Lower Back */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="80"
                                y="120"
                                width="40"
                                height="30"
                                className={`${getStressColor(stressData.back.lowerBack.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Lower Back</p>
                                <p>Stress: {getStressLabel(stressData.back.lowerBack.level)}</p>
                                <p>Fatigue: {stressData.back.lowerBack.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Glutes */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="70"
                                y="150"
                                width="60"
                                height="25"
                                className={`${getStressColor(stressData.back.glutes.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Glutes</p>
                                <p>Stress: {getStressLabel(stressData.back.glutes.level)}</p>
                                <p>Fatigue: {stressData.back.glutes.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Hamstrings */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="75"
                                y="175"
                                width="20"
                                height="60"
                                className={`${getStressColor(stressData.back.hamstrings.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Hamstring</p>
                                <p>Stress: {getStressLabel(stressData.back.hamstrings.level)}</p>
                                <p>Fatigue: {stressData.back.hamstrings.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="105"
                                y="175"
                                width="20"
                                height="60"
                                className={`${getStressColor(stressData.back.hamstrings.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Hamstring</p>
                                <p>Stress: {getStressLabel(stressData.back.hamstrings.level)}</p>
                                <p>Fatigue: {stressData.back.hamstrings.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Calves */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="75"
                                y="235"
                                width="20"
                                height="50"
                                className={`${getStressColor(stressData.back.calves.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Calf</p>
                                <p>Stress: {getStressLabel(stressData.back.calves.level)}</p>
                                <p>Fatigue: {stressData.back.calves.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="105"
                                y="235"
                                width="20"
                                height="50"
                                className={`${getStressColor(stressData.back.calves.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Calf</p>
                                <p>Stress: {getStressLabel(stressData.back.calves.level)}</p>
                                <p>Fatigue: {stressData.back.calves.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          {/* Heels */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="75"
                                y="285"
                                width="20"
                                height="15"
                                className={`${getStressColor(stressData.back.heels.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Left Heel</p>
                                <p>Stress: {getStressLabel(stressData.back.heels.level)}</p>
                                <p>Fatigue: {stressData.back.heels.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <rect
                                x="105"
                                y="285"
                                width="20"
                                height="15"
                                className={`${getStressColor(stressData.back.heels.level)} cursor-pointer transition-all hover:opacity-80`}
                                fill="currentColor"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-center">
                                <p className="font-semibold">Right Heel</p>
                                <p>Stress: {getStressLabel(stressData.back.heels.level)}</p>
                                <p>Fatigue: {stressData.back.heels.fatigue}%</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </svg>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Recovery Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, index) => {
                    const Icon = rec.icon;
                    return (
                      <div key={index} className="p-4 rounded-lg border border-border bg-muted/50">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-foreground">{rec.area}</h4>
                              <Badge variant={rec.level === "High" ? "destructive" : rec.level === "Medium" ? "secondary" : "default"}>
                                {rec.level}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{rec.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Legend */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Stress Level Legend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "#D4A574" }}></div>
                      <span className="text-sm">Low Stress (0-29) - Normal Skin Tone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "#E6B17A" }}></div>
                      <span className="text-sm">Medium Stress (30-49) - Slightly Warmer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "#F4C2A1" }}></div>
                      <span className="text-sm">High Stress (50+) - Stressed Skin Tone</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default StressMap;
