import { DollarSign, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";

const transactions = [
  { id: 1, type: "venta", description: "Pedido #ORD-048", amount: 45.50, time: "14:32" },
  { id: 2, type: "venta", description: "Pedido #ORD-047", amount: 89.90, time: "14:15" },
  { id: 3, type: "egreso", description: "Compra de insumos", amount: -150.00, time: "13:45" },
  { id: 4, type: "venta", description: "Pedido #ORD-046", amount: 28.00, time: "13:20" },
  { id: 5, type: "venta", description: "Pedido #ORD-045", amount: 62.00, time: "12:58" },
  { id: 6, type: "egreso", description: "Pago proveedor", amount: -200.00, time: "12:30" },
];

export default function Caja() {
  const cajaAbierta = true;
  const montoApertura = 500.00;
  const ventasEfectivo = 425.40;
  const egresosTotales = 350.00;
  const saldoActual = montoApertura + ventasEfectivo - egresosTotales;

  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Caja"
        description="Control de efectivo y movimientos del día"
        actions={
          <div className="flex items-center gap-3">
            {cajaAbierta ? (
              <>
                <div className="flex items-center gap-2 text-sm text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  Caja Abierta
                </div>
                <Button variant="destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Cerrar Caja
                </Button>
              </>
            ) : (
              <Button>
                <Clock className="mr-2 h-4 w-4" />
                Abrir Caja
              </Button>
            )}
          </div>
        }
      />

      {/* Stats */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Monto Apertura" value={`$${montoApertura.toFixed(2)}`} icon={DollarSign} />
        <StatCard
          title="Ventas Efectivo"
          value={`$${ventasEfectivo.toFixed(2)}`}
          icon={ArrowUpRight}
        />
        <StatCard
          title="Egresos"
          value={`$${egresosTotales.toFixed(2)}`}
          icon={ArrowDownRight}
        />
        <div className="rounded-xl gradient-warm p-6 shadow-card animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Saldo Actual</p>
              <p className="mt-2 text-3xl font-bold text-white">${saldoActual.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-white/20 p-3">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="mt-8 rounded-xl bg-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-card-foreground">Movimientos del Día</h2>
          <Button variant="outline" size="sm">
            + Registrar Egreso
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    tx.type === "venta" ? "bg-success/10" : "bg-destructive/10"
                  }`}
                >
                  {tx.type === "venta" ? (
                    <ArrowUpRight className="h-5 w-5 text-success" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{tx.description}</p>
                  <p className="text-sm text-muted-foreground">{tx.time}</p>
                </div>
              </div>
              <span
                className={`text-lg font-semibold ${
                  tx.amount >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {tx.amount >= 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
