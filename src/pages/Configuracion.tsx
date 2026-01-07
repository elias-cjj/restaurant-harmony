import { useState } from "react";
import {
  Building2,
  Palette,
  Database,
  FileSpreadsheet,
  Upload,
  Download,
  Moon,
  Sun,
  Save,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "empresa", label: "Empresa", icon: Building2 },
  { id: "apariencia", label: "Apariencia", icon: Palette },
  { id: "backups", label: "Backups", icon: Database },
  { id: "importacion", label: "Importación de datos", icon: FileSpreadsheet },
];

export default function Configuracion() {
  const [activeSection, setActiveSection] = useState("empresa");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-6 lg:p-8">
      <PageHeader title="Configuración" description="Administra la configuración de tu restaurante" />

      <div className="mt-8 flex gap-8">
        {/* Sidebar Menu */}
        <nav className="w-64 flex-shrink-0 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="flex-1 max-w-2xl">
          {activeSection === "empresa" && (
            <div className="rounded-xl bg-card p-6 shadow-card animate-fade-in">
              <h2 className="text-lg font-semibold text-card-foreground mb-6">Datos de la Empresa</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Restaurante</Label>
                  <Input id="nombre" defaultValue="Mi Restaurante" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razon">Razón Social</Label>
                  <Input id="razon" defaultValue="Restaurante S.A. de C.V." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nit">NIT / RFC</Label>
                    <Input id="nit" defaultValue="XAXX010101000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" defaultValue="+52 55 1234 5678" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="contacto@mirestaurante.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Textarea id="direccion" defaultValue="Av. Reforma 123, Col. Centro, CDMX" />
                </div>
                <Button className="mt-4">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </div>
            </div>
          )}

          {activeSection === "apariencia" && (
            <div className="rounded-xl bg-card p-6 shadow-card animate-fade-in">
              <h2 className="text-lg font-semibold text-card-foreground mb-6">Apariencia</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">Modo Oscuro</Label>
                    <p className="text-sm text-muted-foreground">
                      Cambia entre modo claro y oscuro
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sun className="h-5 w-5 text-muted-foreground" />
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    <Moon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Label className="text-base">Vista Previa</Label>
                  <div
                    className={cn(
                      "mt-4 rounded-lg p-4 border-2 transition-colors",
                      darkMode
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white border-gray-200"
                    )}
                  >
                    <div
                      className={cn(
                        "h-4 w-24 rounded mb-2",
                        darkMode ? "bg-gray-700" : "bg-gray-200"
                      )}
                    />
                    <div
                      className={cn(
                        "h-3 w-32 rounded",
                        darkMode ? "bg-gray-800" : "bg-gray-100"
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "backups" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-xl bg-card p-6 shadow-card">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">
                  Crear Backup
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Genera una copia de seguridad de todos los datos de tu empresa.
                </p>
                <Button>
                  <Database className="mr-2 h-4 w-4" />
                  Crear Backup Ahora
                </Button>
              </div>

              <div className="rounded-xl bg-card p-6 shadow-card">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">
                  Restaurar Backup
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Restaura los datos desde una copia de seguridad anterior.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-sm">backup_2024-01-15_14-30.sql</p>
                      <p className="text-xs text-muted-foreground">15 Ene 2024, 14:30</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restaurar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-sm">backup_2024-01-14_10-00.sql</p>
                      <p className="text-xs text-muted-foreground">14 Ene 2024, 10:00</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restaurar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "importacion" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-xl bg-card p-6 shadow-card">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">
                  Descargar Plantilla
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Descarga la plantilla Excel para cargar tus productos, categorías e insumos.
                </p>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar Plantilla Excel
                </Button>
              </div>

              <div className="rounded-xl bg-card p-6 shadow-card">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">
                  Importar Datos
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Sube un archivo Excel con el formato de la plantilla para importar datos masivamente.
                </p>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Arrastra un archivo aquí o haz clic para seleccionar
                  </p>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Seleccionar Archivo
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
