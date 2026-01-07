import { useState } from "react";
import { Plus, Search, Edit2, Trash2, AlertTriangle, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const supplies = [
  { id: 1, name: "Carne molida", unit: "kg", stock: 15.5, minStock: 10, price: 8.50 },
  { id: 2, name: "Pan de hamburguesa", unit: "unidad", stock: 50, minStock: 30, price: 0.50 },
  { id: 3, name: "Queso cheddar", unit: "kg", stock: 3.2, minStock: 5, price: 12.00 },
  { id: 4, name: "Lechuga", unit: "kg", stock: 4, minStock: 5, price: 3.50 },
  { id: 5, name: "Tomate", unit: "kg", stock: 2.5, minStock: 8, price: 2.80 },
  { id: 6, name: "Aceite de oliva", unit: "lt", stock: 1.5, minStock: 5, price: 15.00 },
  { id: 7, name: "Harina", unit: "kg", stock: 25, minStock: 10, price: 1.20 },
  { id: 8, name: "Masa para pizza", unit: "unidad", stock: 20, minStock: 15, price: 2.00 },
];

export default function Insumos() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSupplies = supplies.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = supplies.filter((s) => s.stock < s.minStock).length;

  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Insumos"
        description="Control de inventario de materias primas"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Insumo
          </Button>
        }
      />

      {/* Alert Banner */}
      {lowStockCount > 0 && (
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-warning/10 border border-warning/20 p-4 animate-fade-in">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <p className="text-sm text-foreground">
            <span className="font-semibold">{lowStockCount} insumos</span> tienen stock por debajo del mínimo
          </p>
        </div>
      )}

      {/* Search */}
      <div className="mt-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar insumo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Supplies Table */}
      <div className="mt-6 rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Insumo</TableHead>
              <TableHead>Unidad</TableHead>
              <TableHead>Stock Actual</TableHead>
              <TableHead>Stock Mínimo</TableHead>
              <TableHead>Costo Unitario</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSupplies.map((supply) => {
              const isLowStock = supply.stock < supply.minStock;
              return (
                <TableRow key={supply.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          isLowStock ? "bg-destructive/10" : "bg-muted"
                        )}
                      >
                        <Warehouse
                          className={cn(
                            "h-5 w-5",
                            isLowStock ? "text-destructive" : "text-muted-foreground"
                          )}
                        />
                      </div>
                      <div>
                        <span className="font-medium">{supply.name}</span>
                        {isLowStock && (
                          <p className="text-xs text-destructive">Stock bajo</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{supply.unit}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "font-medium",
                        isLowStock ? "text-destructive" : "text-foreground"
                      )}
                    >
                      {supply.stock}
                    </span>
                  </TableCell>
                  <TableCell>{supply.minStock}</TableCell>
                  <TableCell>${supply.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
