import { SensorVariable, AlarmSeverity } from '@/types/alarm';

export function calculateAlarmThresholds(variable: SensorVariable) {
  const range = variable.max_eu - variable.min_eu;
  
  return {
    highHigh: variable.min_eu + (range * (variable.high_high_pct || 95) / 100),
    high: variable.min_eu + (range * (variable.high_pct || 85) / 100),
    low: variable.min_eu + (range * (variable.low_pct || 15) / 100),
    lowLow: variable.min_eu + (range * (variable.low_low_pct || 5) / 100),
  };
}

export function evaluateAlarm(variable: SensorVariable, value: number): AlarmSeverity | null {
  const thresholds = calculateAlarmThresholds(variable);
  
  if (value >= thresholds.highHigh || value <= thresholds.lowLow) {
    return 'CRITICAL';
  } else if (value >= thresholds.high || value <= thresholds.low) {
    return 'WARNING';
  }
  
  return null;
}

export function getAlarmMessage(variable: SensorVariable, value: number, severity: AlarmSeverity): string {
  const thresholds = calculateAlarmThresholds(variable);
  
  if (value >= thresholds.highHigh) {
    return `${variable.description} - Crítico Alto`;
  } else if (value >= thresholds.high) {
    return `${variable.description} - Advertencia Alta`;
  } else if (value <= thresholds.lowLow) {
    return `${variable.description} - Crítico Bajo`;
  } else if (value <= thresholds.low) {
    return `${variable.description} - Advertencia Baja`;
  }
  
  return `${variable.description} - Anormal`;
}
