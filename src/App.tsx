import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import AddService from "./pages/AddService";
import Actions from "./pages/Actions";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/services" element={<Services />} />
          <Route path="/dashboard/services/new" element={<AddService />} />
          <Route path="/dashboard/actions" element={<Actions />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
