import { useState } from "react";
import { Search, MapPin, Phone, Clock, Truck, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-055",
    type: "delivery",
    customer: "Juan Pérez",
    phone: "+52 55 1234 5678",
    address: "Av. Reforma 123, Col. Centro",
    items: 3,
    total: 89.90,
    status: "en_camino",
    driver: "Carlos M.",
    time: "15 min",
  },
  {
    id: "ORD-054",
    type: "delivery",
    customer: "María García",
    phone: "+52 55 8765 4321",
    address: "Calle Juárez 456, Col. Roma",
    items: 2,
    total: 45.50,
    status: "preparando",
    driver: null,
    time: "8 min",
  },
  {
    id: "ORD-053",
    type: "salon",
    customer: "Mesa 8",
    phone: null,
    address: null,
    items: 4,
    total: 120.00,
    status: "servido",
    driver: null,
    time: "25 min",
  },
  {
    id: "ORD-052",
    type: "delivery",
    customer: "Roberto Sánchez",
    phone: "+52 55 5555 1234",
    address: "Blvd. Insurgentes 789, Col. Del Valle",
    items: 5,
    total: 156.50,
    status: "entregado",
    driver: "Ana L.",
    time: "45 min",
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  preparando: { label: "Preparando", color: "text-primary bg-primary/10", icon: Clock },
  en_camino: { label: "En camino", color: "text-warning bg-warning/10", icon: Truck },
  servido: { label: "Servido", color: "text-success bg-success/10", icon: CheckCircle2 },
  entregado: { label: "Entregado", color: "text-muted-foreground bg-muted", icon: CheckCircle2 },
  cancelado: { label: "Cancelado", color: "text-destructive bg-destructive/10", icon: XCircle },
};

export default function Pedidos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "delivery" | "salon">("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || order.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Pedidos"
        description="Gestiona pedidos de salón y delivery"
      />

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar pedido..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={filter === "delivery" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("delivery")}
          >
            <Truck className="mr-2 h-4 w-4" />
            Delivery
          </Button>
          <Button
            variant={filter === "salon" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("salon")}
          >
            Salón
          </Button>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={order.id}
              className="rounded-xl bg-card p-5 shadow-card animate-fade-in"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-card-foreground">{order.id}</p>
                    {order.type === "delivery" && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        Delivery
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{order.customer}</p>
                </div>
                <span className={cn("flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", status.color)}>
                  <StatusIcon className="h-3 w-3" />
                  {status.label}
                </span>
              </div>

              {/* Details */}
              {order.type === "delivery" && (
                <div className="space-y-2 mb-4">
                  {order.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {order.phone}
                    </div>
                  )}
                  {order.address && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{order.address}</span>
                    </div>
                  )}
                  {order.driver && (
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-primary" />
                      <span className="text-foreground font-medium">{order.driver}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {order.items} items • {order.time}
                </div>
                <p className="text-lg font-bold text-primary">${order.total.toFixed(2)}</p>
              </div>

              {/* Actions */}
              {order.status !== "entregado" && order.status !== "cancelado" && (
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Ver Detalle
                  </Button>
                  {order.status === "preparando" && order.type === "delivery" && (
                    <Button size="sm" className="flex-1">
                      Asignar Repartidor
                    </Button>
                  )}
                  {order.status === "en_camino" && (
                    <Button size="sm" className="flex-1">
                      Marcar Entregado
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
