import { DollarSign, ShoppingBag, Users, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

const recentOrders = [
  { id: "ORD-001", table: "Mesa 5", items: 3, total: 45.50, status: "en_preparacion", time: "5 min" },
  { id: "ORD-002", table: "Mesa 12", items: 2, total: 28.00, status: "listo", time: "12 min" },
  { id: "ORD-003", table: "Delivery", items: 5, total: 89.90, status: "pendiente", time: "2 min" },
  { id: "ORD-004", table: "Mesa 3", items: 4, total: 62.00, status: "entregado", time: "25 min" },
];

const lowStockItems = [
  { name: "Aceite de oliva", stock: 2, minStock: 5 },
  { name: "Queso mozzarella", stock: 1, minStock: 10 },
  { name: "Tomates", stock: 3, minStock: 15 },
];

const statusColors: Record<string, string> = {
  pendiente: "bg-warning/10 text-warning",
  en_preparacion: "bg-primary/10 text-primary",
  listo: "bg-success/10 text-success",
  entregado: "bg-muted text-muted-foreground",
};

const statusLabels: Record<string, string> = {
  pendiente: "Pendiente",
  en_preparacion: "En preparación",
  listo: "Listo",
  entregado: "Entregado",
};

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Dashboard"
        description="Resumen de ventas y operaciones del día"
        actions={
          <Button>
            <Clock className="mr-2 h-4 w-4" />
            Abrir Caja
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Ventas del Día"
          value="$2,845.00"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Pedidos"
          value="48"
          icon={ShoppingBag}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Clientes Atendidos"
          value="124"
          icon={Users}
          trend={{ value: 3.1, isPositive: false }}
        />
        <StatCard
          title="Ticket Promedio"
          value="$59.27"
          icon={TrendingUp}
          trend={{ value: 5.4, isPositive: true }}
        />
      </div>

      {/* Content Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-xl bg-card p-6 shadow-card animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-card-foreground">Pedidos Recientes</h2>
            <Button variant="ghost" size="sm">Ver todos</Button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-card-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.table} • {order.items} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                  <div className="text-right">
                    <p className="font-semibold text-card-foreground">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h2 className="text-lg font-semibold text-card-foreground">Stock Bajo</h2>
          </div>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-card-foreground">{item.name}</p>
                  <span className="text-xs text-destructive font-medium">
                    {item.stock} / {item.minStock}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-destructive transition-all"
                    style={{ width: `${(item.stock / item.minStock) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-6">
            Ver Inventario
          </Button>
        </div>
      </div>
    </div>
  );
}
