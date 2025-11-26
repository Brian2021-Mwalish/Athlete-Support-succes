import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Activity, 
  Shield, 
  TrendingUp, 
  Heart, 
  Brain, 
  Apple,
  Target,
  Zap,
  Users
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Injury Prevention",
      description: "AI-powered risk prediction keeps you training safely and consistently",
    },
    {
      icon: TrendingUp,
      title: "Personalized Training",
      description: "Adaptive workout plans that match your current readiness and goals",
    },
    {
      icon: Heart,
      title: "Recovery Optimization",
      description: "Smart guidance on sleep, nutrition, and active recovery protocols",
    },
    {
      icon: Brain,
      title: "Unified Dashboard",
      description: "All your health metrics in one place - HRV, sleep, stress, and more",
    },
    {
      icon: Zap,
      title: "Real-Time Insights",
      description: "Live monitoring and alerts during training to prevent overexertion",
    },
    {
      icon: Apple,
      title: "Nutrition Intelligence",
      description: "Personalized meal recommendations based on training load and recovery",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Performance Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Train Smarter,
              <br />
              <span className="text-primary">
                Recover Better
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Unify your health metrics and leverage AI to prevent injuries, optimize training, 
              and achieve peak performance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/athlete">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  Get Started as Athlete
                </Button>
              </Link>
              <Link to="/coach">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  I'm a Coach
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to help athletes train smarter and perform at their best
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">
                85%
              </div>
              <p className="text-lg text-muted-foreground">Injury Risk Reduction</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">
                2.5x
              </div>
              <p className="text-lg text-muted-foreground">Faster Recovery</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-success mb-2">
                93%
              </div>
              <p className="text-lg text-muted-foreground">Training Consistency</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Built for Your Role
            </h2>
            <p className="text-xl text-muted-foreground">
              Tailored experiences for athletes, coaches, and administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Athletes</h3>
              <p className="text-muted-foreground mb-6">
                Get personalized insights, injury prevention, and optimized training plans
              </p>
              <Link to="/athlete">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Athlete Dashboard
                </Button>
              </Link>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/30">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Coaches</h3>
              <p className="text-muted-foreground mb-6">
                Monitor athletes, manage training plans, and prevent team injuries
              </p>
              <Link to="/coach">
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Coach Dashboard
                </Button>
              </Link>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-success/30">
              <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-success-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Admins</h3>
              <p className="text-muted-foreground mb-6">
                Platform analytics, user management, and system-wide insights
              </p>
              <Link to="/admin">
                <Button className="w-full bg-success hover:bg-success/90">
                  Admin Dashboard
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 md:p-16 bg-primary border-none text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Training?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of athletes who are training smarter and performing better
            </p>
            <Link to="/athlete">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6">
                Start Your Journey
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
