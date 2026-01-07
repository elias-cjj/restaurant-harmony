import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Package } from "lucide-react";
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

const products = [
  { id: 1, name: "Hamburguesa Clásica", category: "Platos", price: 12.99, active: true },
  { id: 2, name: "Pizza Margherita", category: "Platos", price: 15.99, active: true },
  { id: 3, name: "Ensalada César", category: "Platos", price: 9.99, active: true },
  { id: 4, name: "Pasta Carbonara", category: "Platos", price: 13.99, active: true },
  { id: 5, name: "Tacos al Pastor", category: "Platos", price: 10.99, active: false },
  { id: 6, name: "Coca Cola", category: "Bebidas", price: 2.50, active: true },
  { id: 7, name: "Limonada", category: "Bebidas", price: 3.50, active: true },
  { id: 8, name: "Helado Vainilla", category: "Postres", price: 4.99, active: true },
];

export default function Productos() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Productos"
        description="Gestiona el catálogo de productos"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="mt-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar producto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="mt-6 rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      product.active
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {product.active ? "Activo" : "Inactivo"}
                  </span>
                </TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
