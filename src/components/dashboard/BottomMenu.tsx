import { Home, Settings, BarChart3, TrendingUp, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomMenu() {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Settings, label: 'Settings' },
    { icon: BarChart3, label: 'Analysis', active: true },
    { icon: Activity, label: 'Production' },
    { icon: TrendingUp, label: 'Trends' },
  ];

  return (
    <div className="bg-[hsl(220,30%,12%)] border-t border-border px-6 py-3">
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
  );
}
