import { Activity, Bell, History, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  alarmCount: number;
}

interface NavBtnProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  alertCount?: number;
  onClick?: () => void;
}

const NavBtn = ({ icon: Icon, label, active, alertCount, onClick }: NavBtnProps) => (
  <button
    onClick={onClick}
    className={cn(
      "relative flex flex-col items-center justify-center w-16 h-16 mb-4 rounded-xl transition-all duration-200",
      "min-h-[48px] min-w-[48px]",
      active
        ? "bg-primary/20 text-primary border border-primary/50"
        : "text-muted-foreground hover:bg-secondary"
    )}
  >
    <Icon className="h-6 w-6 mb-1" />
    <span className="text-[10px] font-medium">{label}</span>
    {alertCount && alertCount > 0 && (
      <span className="absolute top-1 right-1 bg-critical text-critical-foreground text-xs font-bold px-1.5 rounded-full animate-pulse">
        {alertCount}
      </span>
    )}
  </button>
);

export default function Sidebar({ activeTab, setActiveTab, alarmCount }: SidebarProps) {
  return (
    <div className="w-20 bg-sidebar flex flex-col items-center py-6 border-r border-sidebar-border h-screen fixed left-0 top-0 z-10">
      <div className="mb-8 p-2 bg-primary rounded-lg">
        <Activity className="text-primary-foreground h-8 w-8" />
      </div>

      <NavBtn
        icon={Activity}
        label="Monitor"
        active={activeTab === 'dashboard'}
        onClick={() => setActiveTab('dashboard')}
      />
      <NavBtn
        icon={Bell}
        label="Alarmas"
        active={activeTab === 'alarms'}
        alertCount={alarmCount}
        onClick={() => setActiveTab('alarms')}
      />
      <NavBtn
        icon={History}
        label="Historial"
        active={activeTab === 'history'}
        onClick={() => setActiveTab('history')}
      />

      <div className="mt-auto">
        <NavBtn icon={Menu} label="Menú" />
      </div>
    </div>
  );
}
