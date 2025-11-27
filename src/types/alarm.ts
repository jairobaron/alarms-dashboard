export type AlarmSeverity = 'CRITICAL' | 'WARNING' | 'INFO';
export type AlarmLevel = 'HH' | 'H' | 'L' | 'LL';
export type AlarmStatus = 'ACT' | 'RTN' | 'ACK';
export type EventStatus = 'ACT' | 'RTN' | 'LOG';
export type RecordType = 'ALARM' | 'EVENT';

export interface Alarm {
  id: number;
  timestamp: string;
  severity: AlarmSeverity;
  level: AlarmLevel;
  tag: string;
  description: string;
  message: string;
  currentValue: number;
  limitValue: number;
  unit: string;
  status: AlarmStatus;
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  type: RecordType;
  severity: AlarmSeverity;
  tag: string;
  message: string;
  status: AlarmStatus | EventStatus;
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
