import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { HistoryItem, RecordType, AlarmSeverity } from '@/types/alarm';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface HistoryViewProps {
  historyLog: HistoryItem[];
}

export default function HistoryView({ historyLog }: HistoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | RecordType>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<'ALL' | AlarmSeverity>('ALL');

  const filteredHistory = historyLog.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'ALL' || item.type === selectedType;
    const matchesSeverity = selectedSeverity === 'ALL' || item.severity === selectedSeverity;

    return matchesSearch && matchesType && matchesSeverity;
  });

  const getSeverityStyles = (severity: AlarmSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-critical-bg text-critical border-critical/20';
      case 'WARNING':
        return 'bg-warning-bg text-warning border-warning/20';
      case 'INFO':
        return 'bg-info/10 text-info border-info/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border h-full flex flex-col">
      {/* Filter Bar */}
      <div className="p-4 border-b border-border flex gap-4 items-center bg-muted/30">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar evento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border min-h-[48px]"
          />
        </div>

        <Select value={selectedType} onValueChange={(value) => setSelectedType(value as 'ALL' | RecordType)}>
          <SelectTrigger className="w-[180px] bg-background min-h-[48px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos los tipos</SelectItem>
            <SelectItem value="ALARM">Alarmas</SelectItem>
            <SelectItem value="EVENT">Eventos</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSeverity} onValueChange={(value) => setSelectedSeverity(value as 'ALL' | AlarmSeverity)}>
          <SelectTrigger className="w-[180px] bg-background min-h-[48px]">
            <SelectValue placeholder="Severidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos los niveles</SelectItem>
            <SelectItem value="CRITICAL">Críticos</SelectItem>
            <SelectItem value="WARNING">Advertencias</SelectItem>
            <SelectItem value="INFO">Informativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* History Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted text-muted-foreground text-xs uppercase sticky top-0 z-10">
            <tr>
              <th className="p-3 font-medium">Fecha/Hora</th>
              <th className="p-3 font-medium">Nivel</th>
              <th className="p-3 font-medium">Tipo</th>
              <th className="p-3 font-medium">Mensaje</th>
              <th className="p-3 font-medium text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  No se encontraron registros
                </td>
              </tr>
            ) : (
              filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors text-sm">
                  <td className="p-3 text-foreground font-mono">{item.timestamp}</td>
                  <td className="p-3">
                    <Badge className={getSeverityStyles(item.severity)} variant="outline">
                      {item.severity}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary">{item.type}</Badge>
                  </td>
                  <td className="p-3 text-foreground">
                    {item.message}
                    <span className="text-muted-foreground text-xs block">{item.tag}</span>
                  </td>
                  <td className="p-3 text-right">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      item.status === 'ACT' ? 'bg-critical/20 text-critical' :
                      item.status === 'RTN' ? 'bg-success/20 text-success' :
                      item.status === 'ACK' ? 'bg-info/20 text-info' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
