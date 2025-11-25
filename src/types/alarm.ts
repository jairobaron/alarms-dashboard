export type AlarmSeverity = 'CRITICAL' | 'HIGH' | 'WARNING' | 'LOW' | 'INFO';
export type AlarmStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'CLEARED';
export type EventType = 'ALARM' | 'EVENT';

export interface Alarm {
  id: number;
  timestamp: string;
  severity: AlarmSeverity;
  tag: string;
  message: string;
  value?: string;
  status: AlarmStatus;
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  type: EventType;
  severity: AlarmSeverity;
  tag: string;
  message: string;
  status: string;
}

export interface SensorVariable {
  tag: string;
  abbreviation: string;
  description: string;
  unit: string;
  min_eu: number;
  max_eu: number;
  current_value?: number;
  low_pct?: number;
  low_low_pct?: number;
  high_pct?: number;
  high_high_pct?: number;
}
