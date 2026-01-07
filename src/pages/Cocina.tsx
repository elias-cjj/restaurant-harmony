import { Clock, Check, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-001",
    table: "Mesa 5",
    time: "5 min",
    status: "pendiente",
    items: [
      { name: "Hamburguesa Clásica", quantity: 2, notes: "Sin cebolla" },
      { name: "Papas Fritas", quantity: 2, notes: "" },
      { name: "Coca Cola", quantity: 2, notes: "" },
    ],
  },
  {
    id: "ORD-002",
    table: "Mesa 12",
    time: "8 min",
    status: "en_preparacion",
    items: [
      { name: "Pizza Margherita", quantity: 1, notes: "" },
      { name: "Ensalada César", quantity: 1, notes: "Aderezo aparte" },
    ],
  },
  {
    id: "ORD-003",
    table: "Delivery",
    time: "2 min",
    status: "pendiente",
    items: [
      { name: "Tacos al Pastor", quantity: 3, notes: "" },
      { name: "Sushi Roll", quantity: 2, notes: "Extra wasabi" },
      { name: "Limonada", quantity: 2, notes: "" },
    ],
  },
  {
    id: "ORD-004",
    table: "Mesa 3",
    time: "12 min",
    status: "en_preparacion",
    items: [
      { name: "Pasta Carbonara", quantity: 2, notes: "" },
    ],
  },
  {
    id: "ORD-005",
    table: "Mesa 8",
    time: "15 min",
    status: "listo",
    items: [
      { name: "Brownie", quantity: 2, notes: "Con helado" },
      { name: "Café Americano", quantity: 2, notes: "" },
    ],
  },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  pendiente: { label: "Pendiente", color: "text-warning", bgColor: "bg-warning" },
  en_preparacion: { label: "En preparación", color: "text-primary", bgColor: "bg-primary" },
  listo: { label: "Listo", color: "text-success", bgColor: "bg-success" },
};

export default function Cocina() {
  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Cocina"
        description="Gestiona los pedidos en tiempo real"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              En línea
            </div>
          </div>
        }
      />

      {/* Order Columns */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {/* Pending Orders */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-warning" />
            <h2 className="font-semibold text-foreground">Pendientes</h2>
            <span className="ml-auto rounded-full bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
              {orders.filter((o) => o.status === "pendiente").length}
            </span>
          </div>
          <div className="space-y-4">
            {orders
              .filter((o) => o.status === "pendiente")
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </div>

        {/* In Progress */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <h2 className="font-semibold text-foreground">En Preparación</h2>
            <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {orders.filter((o) => o.status === "en_preparacion").length}
            </span>
          </div>
          <div className="space-y-4">
            {orders
              .filter((o) => o.status === "en_preparacion")
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </div>

        {/* Ready */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success" />
            <h2 className="font-semibold text-foreground">Listos</h2>
            <span className="ml-auto rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
              {orders.filter((o) => o.status === "listo").length}
            </span>
          </div>
          <div className="space-y-4">
            {orders
              .filter((o) => o.status === "listo")
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: typeof orders[0] }) {
  const status = statusConfig[order.status];

  return (
    <div className="rounded-xl bg-card p-4 shadow-card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-card-foreground">{order.id}</p>
          <p className="text-sm text-muted-foreground">{order.table}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{order.time}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-muted text-xs font-medium">
              {item.quantity}
            </span>
            <div>
              <p className="text-sm font-medium text-card-foreground">{item.name}</p>
              {item.notes && (
                <p className="text-xs text-muted-foreground italic">{item.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {order.status === "pendiente" && (
          <Button size="sm" className="flex-1">
            <ChefHat className="mr-2 h-4 w-4" />
            Iniciar
          </Button>
        )}
        {order.status === "en_preparacion" && (
          <Button size="sm" className="flex-1">
            <Check className="mr-2 h-4 w-4" />
            Listo
          </Button>
        )}
        {order.status === "listo" && (
          <Button size="sm" variant="outline" className="flex-1">
            <Check className="mr-2 h-4 w-4" />
            Entregado
          </Button>
        )}
      </div>
    </div>
  );
}
