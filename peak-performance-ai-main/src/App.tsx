import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Athlete from "./pages/Athlete";
import Coach from "./pages/Coach";
import Admin from "./pages/Admin";
import StressMap from "./pages/StressMap";
import Register from "./pages/Register"; // <-- NEW
import Onboarding from "./pages/Onboarding"; // <-- NEW
import Login from "./components/Login"; // <-- NEW
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/athlete" element={<Athlete />} />
          <Route path="/stress-map" element={<StressMap />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} /> {/* NEW ROUTE */}
          <Route path="/login" element={<Login />} /> {/* NEW ROUTE */}
          <Route path="/onboarding" element={<Onboarding />} /> {/* NEW ROUTE */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
