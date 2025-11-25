import { Home, Settings, BarChart3, TrendingUp, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopMenuProps {
  currentTime: Date;
}

export default function TopMenu({ currentTime }: TopMenuProps) {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Settings, label: 'Settings' },
    { icon: BarChart3, label: 'Analysis', active: true },
    { icon: Activity, label: 'Production' },
    { icon: TrendingUp, label: 'Trends' },
  ];

  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all min-w-[64px] min-h-[56px]",
                item.active
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="text-right">
          <p className="text-2xl font-mono text-primary font-bold">
            {currentTime.toLocaleTimeString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  );
}
