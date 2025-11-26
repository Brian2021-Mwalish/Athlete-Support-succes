import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "success" | "warning" | "destructive";
  className?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  status,
  className 
}: MetricCardProps) => {
  return (
    <Card className={cn(
      "p-6 transition-all duration-300 hover:shadow-lg border-2",
      status === "success" && "border-success/20 bg-gradient-to-br from-success/5 to-transparent",
      status === "warning" && "border-warning/20 bg-gradient-to-br from-warning/5 to-transparent",
      status === "destructive" && "border-destructive/20 bg-gradient-to-br from-destructive/5 to-transparent",
      !status && "border-border",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm font-medium mt-2",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          status === "success" && "bg-success/10",
          status === "warning" && "bg-warning/10",
          status === "destructive" && "bg-destructive/10",
          !status && "bg-primary/10"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            status === "success" && "text-success",
            status === "warning" && "text-warning",
            status === "destructive" && "text-destructive",
            !status && "text-primary"
          )} />
        </div>
      </div>
    </Card>
  );
};
