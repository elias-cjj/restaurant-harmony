import { useState } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, Utensils, Pizza, Coffee, IceCream } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "Todos", icon: Utensils },
  { id: "platos", name: "Platos", icon: Pizza },
  { id: "bebidas", name: "Bebidas", icon: Coffee },
  { id: "postres", name: "Postres", icon: IceCream },
];

const products = [
  { id: 1, name: "Hamburguesa Clásica", price: 12.99, category: "platos", image: "🍔" },
  { id: 2, name: "Pizza Margherita", price: 15.99, category: "platos", image: "🍕" },
  { id: 3, name: "Ensalada César", price: 9.99, category: "platos", image: "🥗" },
  { id: 4, name: "Pasta Carbonara", price: 13.99, category: "platos", image: "🍝" },
  { id: 5, name: "Tacos al Pastor", price: 10.99, category: "platos", image: "🌮" },
  { id: 6, name: "Sushi Roll", price: 14.99, category: "platos", image: "🍣" },
  { id: 7, name: "Coca Cola", price: 2.50, category: "bebidas", image: "🥤" },
  { id: 8, name: "Limonada", price: 3.50, category: "bebidas", image: "🍋" },
  { id: 9, name: "Café Americano", price: 2.99, category: "bebidas", image: "☕" },
  { id: 10, name: "Jugo Natural", price: 4.50, category: "bebidas", image: "🧃" },
  { id: 11, name: "Helado Vainilla", price: 4.99, category: "postres", image: "🍨" },
  { id: 12, name: "Brownie", price: 5.99, category: "postres", image: "🍫" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function POS() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  return (
    <div className="flex h-screen">
      {/* Products Section */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Search and Categories */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex-shrink-0"
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-6 flex-1 overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="group rounded-xl bg-card p-4 shadow-card text-left transition-all hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="text-4xl mb-3">{product.image}</div>
                <h3 className="font-medium text-card-foreground line-clamp-2">{product.name}</h3>
                <p className="mt-1 text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 border-l border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-card-foreground">Orden Actual</h2>
          <div className="mt-3">
            <Input
              placeholder="Número de mesa o nombre"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Utensils className="h-12 w-12 mb-3 opacity-40" />
              <p>Carrito vacío</p>
              <p className="text-sm">Agrega productos para comenzar</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg bg-background p-3 animate-scale-in"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-card-foreground truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        <div className="border-t border-border p-6 space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IVA (16%)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12" disabled={cart.length === 0}>
              <Banknote className="mr-2 h-4 w-4" />
              Efectivo
            </Button>
            <Button className="h-12" disabled={cart.length === 0}>
              <CreditCard className="mr-2 h-4 w-4" />
              Tarjeta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
