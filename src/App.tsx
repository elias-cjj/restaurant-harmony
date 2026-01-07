import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Cocina from "./pages/Cocina";
import Pedidos from "./pages/Pedidos";
import Productos from "./pages/Productos";
import Insumos from "./pages/Insumos";
import Recetas from "./pages/Recetas";
import Caja from "./pages/Caja";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";
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
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path="/pos"
            element={
              <AppLayout>
                <POS />
              </AppLayout>
            }
          />
          <Route
            path="/cocina"
            element={
              <AppLayout>
                <Cocina />
              </AppLayout>
            }
          />
          <Route
            path="/pedidos"
            element={
              <AppLayout>
                <Pedidos />
              </AppLayout>
            }
          />
          <Route
            path="/productos"
            element={
              <AppLayout>
                <Productos />
              </AppLayout>
            }
          />
          <Route
            path="/insumos"
            element={
              <AppLayout>
                <Insumos />
              </AppLayout>
            }
          />
          <Route
            path="/recetas"
            element={
              <AppLayout>
                <Recetas />
              </AppLayout>
            }
          />
          <Route
            path="/caja"
            element={
              <AppLayout>
                <Caja />
              </AppLayout>
            }
          />
          <Route
            path="/reportes"
            element={
              <AppLayout>
                <Reportes />
              </AppLayout>
            }
          />
          <Route
            path="/configuracion"
            element={
              <AppLayout>
                <Configuracion />
              </AppLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
