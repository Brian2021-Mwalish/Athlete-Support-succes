import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { coachAthletes } from "@/data/dummyData";
import { Users, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const Coach = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "destructive":
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-success/20 text-success hover:bg-success/30">Optimal</Badge>;
      case "warning":
        return <Badge className="bg-warning/20 text-warning hover:bg-warning/30">Caution</Badge>;
      case "destructive":
        return <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">Alert</Badge>;
      default:
        return null;
    }
  };

  const totalAthletes = coachAthletes.length;
  const highRiskAthletes = coachAthletes.filter(a => a.injuryRisk > 60).length;
  const avgReadiness = Math.round(coachAthletes.reduce((sum, a) => sum + a.readiness, 0) / totalAthletes);

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="coach" userName="Coach Mike" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Coach Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor and manage your athletes' performance and wellbeing
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Athletes</p>
                <p className="text-4xl font-bold text-foreground">{totalAthletes}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/20">
                <Users className="w-8 h-8 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-destructive/30 bg-gradient-to-br from-destructive/10 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">High Risk Athletes</p>
                <p className="text-4xl font-bold text-foreground">{highRiskAthletes}</p>
              </div>
              <div className="p-3 rounded-xl bg-destructive/20">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-success/30 bg-gradient-to-br from-success/10 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg Readiness</p>
                <p className="text-4xl font-bold text-foreground">{avgReadiness}%</p>
              </div>
              <div className="p-3 rounded-xl bg-success/20">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* Athletes List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Your Athletes</h2>
            <Button className="bg-primary hover:bg-primary/90">
              Add New Athlete
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {coachAthletes.map((athlete) => (
              <Card key={athlete.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {athlete.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{athlete.name}</h3>
                        {getStatusIcon(athlete.status)}
                        {getStatusBadge(athlete.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{athlete.sport}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Injury Risk</p>
                      <p className={`text-2xl font-bold ${
                        athlete.injuryRisk < 30 ? "text-success" :
                        athlete.injuryRisk < 70 ? "text-warning" :
                        "text-destructive"
                      }`}>
                        {athlete.injuryRisk}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Readiness</p>
                      <p className="text-2xl font-bold text-primary">{athlete.readiness}%</p>
                    </div>

                    <div className="text-center min-w-[120px]">
                      <p className="text-sm text-muted-foreground mb-1">Last Workout</p>
                      <div className="flex items-center justify-center text-sm text-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {athlete.lastWorkout}
                      </div>
                    </div>

                    <Button variant="outline">View Details</Button>
                  </div>
                </div>

                {/* Mobile view */}
                <div className="md:hidden mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Risk</p>
                      <p className={`text-xl font-bold ${
                        athlete.injuryRisk < 30 ? "text-success" :
                        athlete.injuryRisk < 70 ? "text-warning" :
                        "text-destructive"
                      }`}>
                        {athlete.injuryRisk}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Readiness</p>
                      <p className="text-xl font-bold text-primary">{athlete.readiness}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Last</p>
                      <p className="text-xs text-foreground">{athlete.lastWorkout}</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Coach;
