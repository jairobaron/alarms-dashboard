import { Home, Settings, BarChart3, TrendingUp, Activity, Menu, RefreshCw, Sun, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TopMenu() {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Settings, label: 'Settings' },
    { icon: BarChart3, label: 'Analysis', active: true },
    { icon: Activity, label: 'Production' },
    { icon: TrendingUp, label: 'Trends' },
  ];

  return (
    <div className="flex flex-col">
      {/* Barra Superior */}
      <div className="bg-[hsl(220,30%,10%)] border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-foreground hover:text-primary transition-colors">
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-foreground font-semibold">optimum.oco</span>
            <span className="text-foreground/80 font-medium">JBN902</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-foreground hover:text-primary transition-colors">
              <RefreshCw className="h-5 w-5" />
            </button>
            <button className="text-foreground hover:text-primary transition-colors">
              <Sun className="h-5 w-5" />
            </button>
            <button className="relative text-foreground hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-critical text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Barra de Navegación */}
      <div className="bg-[hsl(220,30%,12%)] border-b border-border px-6 py-3">
        <div className="flex items-center justify-around max-w-5xl mx-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded transition-all min-h-[48px]",
                item.active
                  ? "text-[hsl(210,100%,60%)]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
