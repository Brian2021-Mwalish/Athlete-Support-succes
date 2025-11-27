import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";

interface NavigationProps {
  userRole?: "athlete" | "coach" | "admin";
  userName?: string;
}

export const Navigation = ({ userRole, userName }: NavigationProps) => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  // Use user from context if available, otherwise fall back to props
  const currentUserRole = user?.role || userRole;
  const currentUserName = user?.name || userName;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary">
              StrydeAI
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {currentUserRole && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">{currentUserName || "User"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/${currentUserRole}`} className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {currentUserRole !== 'coach' && (
                    <DropdownMenuItem asChild>
                      <Link to="/onboarding" className="cursor-pointer">
                        Onboarding
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {!currentUserRole && (
              <div className="flex items-center space-x-2">
                <Link to="/register">
                  <Button variant="outline">Register</Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
