import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AlertTriangle, Shield, TrendingUp } from "lucide-react";

interface RiskScoreCardProps {
  score: number;
  title?: string;
  description?: string;
}

export const RiskScoreCard = ({ score, title = "Injury Risk Score", description }: RiskScoreCardProps) => {
  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: "Low", status: "success", icon: Shield };
    if (score < 70) return { level: "Medium", status: "warning", icon: TrendingUp };
    return { level: "High", status: "destructive", icon: AlertTriangle };
  };

  const risk = getRiskLevel(score);
  const Icon = risk.icon;

  return (
    <Card className={cn(
      "p-6 border-2 transition-all duration-300",
      risk.status === "success" && "border-success/30 bg-gradient-to-br from-success/10 to-transparent",
      risk.status === "warning" && "border-warning/30 bg-gradient-to-br from-warning/10 to-transparent",
      risk.status === "destructive" && "border-destructive/30 bg-gradient-to-br from-destructive/10 to-transparent"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          risk.status === "success" && "bg-success/20",
          risk.status === "warning" && "bg-warning/20",
          risk.status === "destructive" && "bg-destructive/20"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            risk.status === "success" && "text-success",
            risk.status === "warning" && "text-warning",
            risk.status === "destructive" && "text-destructive"
          )} />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold text-foreground">{score}</span>
          <span className={cn(
            "text-lg font-semibold px-3 py-1 rounded-full",
            risk.status === "success" && "bg-success/20 text-success",
            risk.status === "warning" && "bg-warning/20 text-warning",
            risk.status === "destructive" && "bg-destructive/20 text-destructive"
          )}>
            {risk.level} Risk
          </span>
        </div>
        
        <Progress 
          value={score} 
          className={cn(
            "h-3",
            risk.status === "success" && "[&>div]:bg-success",
            risk.status === "warning" && "[&>div]:bg-warning",
            risk.status === "destructive" && "[&>div]:bg-destructive"
          )}
        />
      </div>
    </Card>
  );
};
