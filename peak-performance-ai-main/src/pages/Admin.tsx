import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { adminStats } from "@/data/dummyData";
import { Users, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="admin" userName="Admin" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Platform overview and system analytics
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Users</p>
                <p className="text-3xl font-bold text-foreground">{adminStats.totalUsers}</p>
                <p className="text-sm text-success mt-1">↑ 8.5% from last month</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/20">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Athletes</p>
                <p className="text-3xl font-bold text-foreground">{adminStats.activeAthletes}</p>
                <p className="text-sm text-success mt-1">↑ 12.3% from last month</p>
              </div>
              <div className="p-3 rounded-xl bg-accent/20">
                <Activity className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-success/30 bg-gradient-to-br from-success/10 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Coaches</p>
                <p className="text-3xl font-bold text-foreground">{adminStats.activeCoaches}</p>
                <p className="text-sm text-success mt-1">↑ 5.7% from last month</p>
              </div>
              <div className="p-3 rounded-xl bg-success/20">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-warning/30 bg-gradient-to-br from-warning/10 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg Injury Risk</p>
                <p className="text-3xl font-bold text-foreground">{adminStats.avgInjuryRisk}</p>
                <p className="text-sm text-success mt-1">↓ 3.2% from last month</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/20">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={adminStats.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar 
                  dataKey="users" 
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Risk Distribution */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Injury Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={adminStats.riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ level, percent }) => `${level}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {adminStats.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* System Stats */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">System Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Total Workouts Logged</p>
              <p className="text-3xl font-bold text-foreground">{adminStats.totalWorkouts.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Platform Uptime</p>
              <p className="text-3xl font-bold text-success">99.9%</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Avg Session Duration</p>
              <p className="text-3xl font-bold text-foreground">23 min</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
