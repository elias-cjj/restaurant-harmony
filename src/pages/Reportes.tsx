import { BarChart3, TrendingUp, TrendingDown, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";

const topProducts = [
  { name: "Hamburguesa Clásica", quantity: 145, revenue: 1882.55 },
  { name: "Pizza Margherita", quantity: 98, revenue: 1567.02 },
  { name: "Pasta Carbonara", quantity: 87, revenue: 1217.13 },
  { name: "Ensalada César", quantity: 76, revenue: 759.24 },
  { name: "Tacos al Pastor", quantity: 65, revenue: 714.35 },
];

const dailySales = [
  { day: "Lun", amount: 2450 },
  { day: "Mar", amount: 3200 },
  { day: "Mié", amount: 2890 },
  { day: "Jue", amount: 3450 },
  { day: "Vie", amount: 4200 },
  { day: "Sáb", amount: 5100 },
  { day: "Dom", amount: 4800 },
];

const maxSale = Math.max(...dailySales.map((d) => d.amount));

export default function Reportes() {
  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Reportes"
        description="Análisis de ventas y rendimiento"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Esta semana
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        }
      />

      {/* Summary Stats */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Ventas Totales"
          value="$26,090.00"
          icon={BarChart3}
          trend={{ value: 15.2, isPositive: true }}
        />
        <StatCard
          title="Pedidos"
          value="486"
          icon={TrendingUp}
          trend={{ value: 8.7, isPositive: true }}
        />
        <StatCard
          title="Ticket Promedio"
          value="$53.68"
          icon={TrendingUp}
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title="Cancelaciones"
          value="12"
          icon={TrendingDown}
          trend={{ value: 4.1, isPositive: false }}
        />
      </div>

      {/* Charts Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Daily Sales Chart */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Ventas por Día</h3>
          <div className="flex items-end justify-between gap-2 h-48">
            {dailySales.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md gradient-warm transition-all hover:opacity-80"
                  style={{ height: `${(day.amount / maxSale) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>Total: $26,090.00</span>
            <span>Promedio: $3,727.14</span>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Productos Más Vendidos</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-bold">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-card-foreground truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.quantity} vendidos</p>
                </div>
                <p className="font-semibold text-primary">${product.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Reports */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h4 className="font-semibold text-card-foreground mb-4">Por Tipo de Orden</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Salón</span>
              <span className="font-medium">$15,650.00 (60%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[60%] rounded-full gradient-warm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium">$10,440.00 (40%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[40%] rounded-full bg-accent" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-card">
          <h4 className="font-semibold text-card-foreground mb-4">Por Método de Pago</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tarjeta</span>
              <span className="font-medium">$18,263.00 (70%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[70%] rounded-full gradient-warm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Efectivo</span>
              <span className="font-medium">$7,827.00 (30%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[30%] rounded-full bg-success" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-card">
          <h4 className="font-semibold text-card-foreground mb-4">Horarios Pico</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <span>12:00 - 14:00</span>
              <span className="font-medium text-primary">35% de ventas</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <span>19:00 - 21:00</span>
              <span className="font-medium text-primary">40% de ventas</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg">
              <span>Otros horarios</span>
              <span className="font-medium">25% de ventas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
