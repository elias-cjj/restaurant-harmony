import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  ChefHat,
  Package,
  Warehouse,
  BookOpen,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  Utensils,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "POS", href: "/pos", icon: ShoppingCart },
  { name: "Cocina", href: "/cocina", icon: ChefHat },
  { name: "Pedidos", href: "/pedidos", icon: Truck },
  { name: "Productos", href: "/productos", icon: Package },
  { name: "Insumos", href: "/insumos", icon: Warehouse },
  { name: "Recetas", href: "/recetas", icon: BookOpen },
  { name: "Caja", href: "/caja", icon: Wallet },
  { name: "Reportes", href: "/reportes", icon: BarChart3 },
  { name: "Configuración", href: "/configuracion", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 gradient-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Utensils className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">MiRestaurante</h1>
            <p className="text-xs text-sidebar-foreground/60">Sistema POS</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4 scrollbar-thin">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-sidebar-primary")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-foreground">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Admin</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Sucursal Central</p>
            </div>
            <button className="p-1.5 rounded-md text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
