import { useState, useEffect } from 'react';
import TopMenu from '@/components/dashboard/TopMenu';
import DashboardView from '@/components/dashboard/DashboardView';
import HistoryView from '@/components/dashboard/HistoryView';
import { generateActiveAlarms, generateHistoryLog } from '@/data/mockData';
import { Alarm, HistoryItem } from '@/types/alarm';
import { Bell, History } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [activeTab, setActiveTab] = useState('alarms');
  const [activeAlarms, setActiveAlarms] = useState<Alarm[]>([]);
  const [historyLog, setHistoryLog] = useState<HistoryItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setActiveAlarms(generateActiveAlarms());
    setHistoryLog(generateHistoryLog());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAcknowledge = (id: number) => {
    setActiveAlarms((prev) => prev.filter((a) => a.id !== id));
    
    const acknowledgedAlarm = activeAlarms.find((a) => a.id === id);
    if (acknowledgedAlarm) {
      setHistoryLog((prev) => [
        {
          id: Date.now(),
          timestamp: new Date().toLocaleString('es-ES'),
          type: 'ALARM',
          severity: acknowledgedAlarm.severity,
          tag: acknowledgedAlarm.tag,
          message: `${acknowledgedAlarm.message} - RECONOCIDA`,
          status: 'ACK',
        },
        ...prev,
      ]);
    }
  };

  return (
    <div className="bg-background min-h-screen text-foreground font-sans flex flex-col overflow-hidden">
      <TopMenu />

      <main className="flex-1 p-6 overflow-hidden flex flex-col">
        {/* Tab Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setActiveTab('alarms')}
            className={cn(
              "flex items-center justify-center gap-3 p-4 rounded-lg border transition-all min-h-[64px]",
              activeTab === 'alarms'
                ? "bg-primary/20 text-primary border-primary/50"
                : "bg-card text-muted-foreground border-border hover:bg-muted/50"
            )}
          >
            <Bell className="h-6 w-6" />
            <span className="text-lg font-semibold">Alarmas</span>
            {activeAlarms.length > 0 && (
              <span className="bg-critical text-critical-foreground text-sm font-bold px-2 py-1 rounded-full animate-pulse">
                {activeAlarms.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "flex items-center justify-center gap-3 p-4 rounded-lg border transition-all min-h-[64px]",
              activeTab === 'history'
                ? "bg-primary/20 text-primary border-primary/50"
                : "bg-card text-muted-foreground border-border hover:bg-muted/50"
            )}
          >
            <History className="h-6 w-6" />
            <span className="text-lg font-semibold">Historial</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'alarms' && (
            <DashboardView activeAlarms={activeAlarms} onAcknowledge={handleAcknowledge} />
          )}
          {activeTab === 'history' && <HistoryView historyLog={historyLog} />}
        </div>
      </main>
    </div>
  );
};

export default Index;
