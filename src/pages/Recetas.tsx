import { useState } from "react";
import { Plus, Search, Edit2, Trash2, BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";

const recipes = [
  {
    id: 1,
    product: "Hamburguesa Clásica",
    ingredients: [
      { name: "Carne molida", quantity: 0.2, unit: "kg" },
      { name: "Pan de hamburguesa", quantity: 1, unit: "unidad" },
      { name: "Queso cheddar", quantity: 0.03, unit: "kg" },
      { name: "Lechuga", quantity: 0.02, unit: "kg" },
      { name: "Tomate", quantity: 0.05, unit: "kg" },
    ],
  },
  {
    id: 2,
    product: "Pizza Margherita",
    ingredients: [
      { name: "Masa para pizza", quantity: 1, unit: "unidad" },
      { name: "Salsa de tomate", quantity: 0.1, unit: "lt" },
      { name: "Queso mozzarella", quantity: 0.15, unit: "kg" },
      { name: "Albahaca", quantity: 0.01, unit: "kg" },
    ],
  },
  {
    id: 3,
    product: "Ensalada César",
    ingredients: [
      { name: "Lechuga romana", quantity: 0.15, unit: "kg" },
      { name: "Pollo", quantity: 0.12, unit: "kg" },
      { name: "Queso parmesano", quantity: 0.03, unit: "kg" },
      { name: "Croutones", quantity: 0.05, unit: "kg" },
      { name: "Aderezo César", quantity: 0.03, unit: "lt" },
    ],
  },
  {
    id: 4,
    product: "Pasta Carbonara",
    ingredients: [
      { name: "Pasta", quantity: 0.15, unit: "kg" },
      { name: "Tocino", quantity: 0.08, unit: "kg" },
      { name: "Huevo", quantity: 2, unit: "unidad" },
      { name: "Queso parmesano", quantity: 0.05, unit: "kg" },
      { name: "Crema", quantity: 0.1, unit: "lt" },
    ],
  },
];

export default function Recetas() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRecipes, setExpandedRecipes] = useState<number[]>([1]);

  const filteredRecipes = recipes.filter((r) =>
    r.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpanded = (id: number) => {
    setExpandedRecipes((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Recetas"
        description="Gestiona las recetas y composición de productos"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Receta
          </Button>
        }
      />

      {/* Search */}
      <div className="mt-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar receta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Recipes List */}
      <div className="mt-6 space-y-4">
        {filteredRecipes.map((recipe) => {
          const isExpanded = expandedRecipes.includes(recipe.id);
          return (
            <div
              key={recipe.id}
              className="rounded-xl border border-border bg-card shadow-card overflow-hidden animate-fade-in"
            >
              <button
                onClick={() => toggleExpanded(recipe.id)}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{recipe.product}</p>
                    <p className="text-sm text-muted-foreground">
                      {recipe.ingredients.length} ingredientes
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border bg-muted/30 p-4 animate-slide-up">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Ingredientes:</h4>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-background p-3"
                      >
                        <span className="text-sm font-medium">{ingredient.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {ingredient.quantity} {ingredient.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
