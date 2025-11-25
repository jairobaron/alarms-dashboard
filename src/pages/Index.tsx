import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardView from '@/components/dashboard/DashboardView';
import HistoryView from '@/components/dashboard/HistoryView';
import { generateActiveAlarms, generateHistoryLog } from '@/data/mockData';
import { Alarm, HistoryItem } from '@/types/alarm';

const Index = () => {
  const [activeTab, setActiveTab] = useState('alarms'); // Default: Alarmas activas
  const [activeAlarms, setActiveAlarms] = useState<Alarm[]>([]);
  const [historyLog, setHistoryLog] = useState<HistoryItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Initialize data
    setActiveAlarms(generateActiveAlarms());
    setHistoryLog(generateHistoryLog());

    // Update clock every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAcknowledge = (id: number) => {
    // Update alarm status to ACKNOWLEDGED
    setActiveAlarms((prev) => prev.filter((a) => a.id !== id));
    
    // Add to history
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
    <div className="bg-background min-h-screen text-foreground font-sans flex overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alarmCount={activeAlarms.length}
      />

      <main className="flex-1 ml-20 p-4 md:p-6 overflow-hidden flex flex-col h-screen">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">SRP-01 Monitor</h1>
            <p className="text-muted-foreground text-sm">Unidad de Bombeo #42 - Sector Norte</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-mono text-primary font-bold">
              {currentTime.toLocaleTimeString('es-ES')}
            </p>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">
              Sistema en Línea
            </p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView activeAlarms={activeAlarms} onAcknowledge={handleAcknowledge} />
          )}
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
