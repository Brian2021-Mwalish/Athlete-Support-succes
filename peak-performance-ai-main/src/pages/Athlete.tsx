import React from 'react';
import { 
  Heart, 
  Moon, 
  Droplets, 
  Brain, 
  Activity, 
  TrendingUp,
  Apple,
  Dumbbell,
  Clock,
  Home,
  BarChart3,
  Calendar,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from "lucide-react";

// Mock Data
const athleteData = {
  name: "Alex Thompson",
  metrics: {
    hrv: "65 ms",
    sleep: 7.5,
    hydration: 75,
    stress: "Low",
    restingHeartRate: 52,
    trainingLoad: "High"
  },
  injuryRisk: 15,
  trainingReadiness: 85,
  recoveryScore: 82,
  todaysWorkout: {
    type: "Interval Training",
    duration: "45 minutes",
    intensity: "High",
    description: "Focus on speed work with 8x400m repeats at 5K pace. Include proper warm-up and cool-down periods.",
    expectedCalories: 450
  },
  recovery: {
    sleepRecommendation: "Aim for 8-9 hours tonight to support tomorrow's intense workout",
    hydrationTarget: "Drink 3-4 liters of water throughout the day",
    nutritionFocus: "Increase protein intake (30g per meal) to support muscle recovery",
    activeRecovery: "Light 20-minute walk or yoga session recommended"
  },
  nutrition: {
    dailyCalories: 2800,
    currentIntake: 1650,
    macros: {
      protein: { current: 95, target: 180 },
      carbs: { current: 180, target: 350 },
      fats: { current: 45, target: 78 }
    },
    mealSuggestions: [
      { meal: "Lunch", time: "12:00 PM", suggestion: "Grilled chicken breast with quinoa and mixed vegetables" },
      { meal: "Snack", time: "3:00 PM", suggestion: "Greek yogurt with berries and almonds" },
      { meal: "Dinner", time: "7:00 PM", suggestion: "Salmon with sweet potato and steamed broccoli" }
    ]
  },
  weeklyProgress: {
    workoutsCompleted: 5,
    totalDistance: 42.5,
    avgHeartRate: 145
  }
};

// Navigation Component
const Navigation = ({ userRole, userName, activePage, setActivePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: BarChart3, label: "Analytics", id: "analytics" },
    { icon: Calendar, label: "Schedule", id: "schedule" },
    { icon: User, label: "Profile", id: "profile" },
    { icon: Settings, label: "Settings", id: "settings" }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 mr-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-xl font-bold text-gray-900">AthleteHub</h1>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="hidden lg:flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">AthleteHub</h1>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-gray-200 mt-16 lg:mt-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{userName}</p>
                <p className="text-sm text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-colors duration-150
                  ${activePage === item.id
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

// Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

// Progress Component
const Progress = ({ value, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <div
      className="h-full bg-blue-600 transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

// MetricCard Component
const MetricCard = ({ title, value, icon: Icon, status, trend }) => {
  const statusColors = {
    success: "border-green-200 bg-green-50",
    warning: "border-yellow-200 bg-yellow-50",
    danger: "border-red-200 bg-red-50"
  };

  return (
    <Card className={`p-4 border-2 ${status ? statusColors[status] : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-600">{title}</h4>
        <div className={`p-2 rounded-lg ${status === 'success' ? 'bg-green-100' : status === 'warning' ? 'bg-yellow-100' : 'bg-gray-100'}`}>
          <Icon className={`w-5 h-5 ${status === 'success' ? 'text-green-600' : status === 'warning' ? 'text-yellow-600' : 'text-gray-600'}`} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {trend && (
          <div className={`flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
    </Card>
  );
};

// RiskScoreCard Component
const RiskScoreCard = ({ score }) => {
  const getRiskLevel = (score) => {
    if (score < 30) return { label: "Low Risk", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" };
    if (score < 60) return { label: "Moderate Risk", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" };
    return { label: "High Risk", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" };
  };

  const risk = getRiskLevel(score);

  return (
    <Card className={`p-6 border-2 ${risk.borderColor} ${risk.bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Injury Risk</h3>
        <div className={`p-3 rounded-xl ${risk.bgColor}`}>
          <AlertTriangle className={`w-6 h-6 ${risk.color}`} />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold text-gray-900">{score}%</span>
          <span className={`text-lg font-semibold px-3 py-1 rounded-full ${risk.bgColor} ${risk.color}`}>
            {risk.label}
          </span>
        </div>
        <Progress value={score} className="h-3" />
      </div>
    </Card>
  );
};

// Dashboard Content
const DashboardContent = ({ athleteData }) => {
  const { metrics, injuryRisk, trainingReadiness, recoveryScore, todaysWorkout, recovery, nutrition } = athleteData;

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {athleteData.name.split(" ")[0]}!
        </h1>
        <p className="text-lg text-gray-600">
          Here's your performance overview for today
        </p>
      </div>

      {/* Main Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <RiskScoreCard score={injuryRisk} />
        
        <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Training Readiness</h3>
            <div className="p-3 rounded-xl bg-blue-100">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-gray-900">{trainingReadiness}%</span>
              <span className="text-lg font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                Good to Go
              </span>
            </div>
            <Progress value={trainingReadiness} className="h-3" />
          </div>
        </Card>

        <Card className="p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recovery Score</h3>
            <div className="p-3 rounded-xl bg-green-100">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-gray-900">{recoveryScore}%</span>
              <span className="text-lg font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600">
                Well Recovered
              </span>
            </div>
            <Progress value={recoveryScore} className="h-3" />
          </div>
        </Card>
      </div>

      {/* Health Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Metrics</h2>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Recommended Workout</h2>
        <Card className="p-6 bg-blue-600 border-none text-white">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{todaysWorkout.type}</h3>
              <div className="flex items-center flex-wrap gap-4 text-sm opacity-90">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {todaysWorkout.duration}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20">
                  {todaysWorkout.intensity}
                </span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/20">
              <Dumbbell className="w-8 h-8" />
            </div>
          </div>
          <p className="text-white/90 mb-4">{todaysWorkout.description}</p>
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <span className="text-sm">Expected Calories</span>
            <span className="text-xl font-bold">{todaysWorkout.expectedCalories} kcal</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recovery Guidance */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recovery Guidance</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Moon className="w-5 h-5 mr-2 text-blue-600" />
                  Sleep
                </h4>
                <p className="text-gray-600">{recovery.sleepRecommendation}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-blue-600" />
                  Hydration
                </h4>
                <p className="text-gray-600">{recovery.hydrationTarget}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Apple className="w-5 h-5 mr-2 text-blue-600" />
                  Nutrition
                </h4>
                <p className="text-gray-600">{recovery.nutritionFocus}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Active Recovery
                </h4>
                <p className="text-gray-600">{recovery.activeRecovery}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Nutrition */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nutrition Plan</h2>
          <Card className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Daily Calories</span>
                <span className="text-lg font-bold text-gray-900">
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
                  <span className="text-sm text-gray-600">Protein</span>
                  <span className="text-sm font-medium">{nutrition.macros.protein.current}g / {nutrition.macros.protein.target}g</span>
                </div>
                <Progress value={(nutrition.macros.protein.current / nutrition.macros.protein.target) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Carbs</span>
                  <span className="text-sm font-medium">{nutrition.macros.carbs.current}g / {nutrition.macros.carbs.target}g</span>
                </div>
                <Progress value={(nutrition.macros.carbs.current / nutrition.macros.carbs.target) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Fats</span>
                  <span className="text-sm font-medium">{nutrition.macros.fats.current}g / {nutrition.macros.fats.target}g</span>
                </div>
                <Progress value={(nutrition.macros.fats.current / nutrition.macros.fats.target) * 100} className="h-2" />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900">Meal Suggestions</h4>
              {nutrition.mealSuggestions.map((meal, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{meal.meal}</span>
                    <span className="text-xs text-gray-500">{meal.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{meal.suggestion}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

// Placeholder Pages
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">This page is under construction</p>
    </div>
  </div>
);

// Main Athlete Component
const Athlete = () => {
  const [activePage, setActivePage] = React.useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardContent athleteData={athleteData} />;
      case 'analytics':
        return <PlaceholderPage title="Analytics" />;
      case 'schedule':
        return <PlaceholderPage title="Schedule" />;
      case 'profile':
        return <PlaceholderPage title="Profile" />;
      case 'settings':
        return <PlaceholderPage title="Settings" />;
      default:
        return <DashboardContent athleteData={athleteData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation 
        userRole="athlete" 
        userName={athleteData.name}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      
      <main className="flex-1 overflow-auto pt-16 lg:pt-0">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Athlete;