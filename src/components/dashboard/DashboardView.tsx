import { Activity, Bell, CheckCircle, AlertTriangle, XOctagon } from 'lucide-react';
import { Alarm } from '@/types/alarm';
import { Button } from '@/components/ui/button';

interface DashboardViewProps {
  activeAlarms: Alarm[];
  onAcknowledge: (id: number) => void;
}

export default function DashboardView({ activeAlarms, onAcknowledge }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* Active Alarms */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="bg-muted/50 p-4 border-b border-border flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="text-critical" /> Alarmas Activas
          </h3>
        </div>

        {activeAlarms.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 text-success/50" />
            <p>Sistema Normal. Sin alarmas activas.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activeAlarms.map((alarm) => (
              <div
                key={alarm.id}
                className="p-4 flex items-center justify-between bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      alarm.severity === 'CRITICAL'
                        ? 'bg-critical-bg text-critical'
                        : 'bg-warning-bg text-warning'
                    }`}
                  >
                    <XOctagon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{alarm.message}</h4>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                      <span>Tag: {alarm.tag}</span>
                      <span>Hora: {alarm.timestamp}</span>
                      <span className={`font-medium ${
                        alarm.severity === 'CRITICAL' ? 'text-critical' : 'text-warning'
                      }`}>
                        Estado: {alarm.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => onAcknowledge(alarm.id)}
                  className="min-w-[120px] min-h-[48px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg"
                >
                  RECONOCER
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
