import { SensorVariable, AlarmSeverity, AlarmLevel } from '@/types/alarm';

export interface AlarmThresholds {
  highHigh: number;
  high: number;
  low: number;
  lowLow: number;
}

export interface AlarmEvaluation {
  severity: AlarmSeverity;
  level: AlarmLevel;
  limitValue: number;
  message: string;
}

/**
 * Calcula los umbrales de alarma basados en la configuración de la variable
 * Fórmula: Valor_Alarma = Min_eu + (Rango * Porcentaje_Configurado / 100)
 */
export function calculateAlarmThresholds(variable: SensorVariable): AlarmThresholds {
  const range = variable.max_eu - variable.min_eu;
  
  return {
    highHigh: variable.min_eu + (range * (variable.high_high_pct || 95) / 100),
    high: variable.min_eu + (range * (variable.high_pct || 85) / 100),
    low: variable.min_eu + (range * (variable.low_pct || 15) / 100),
    lowLow: variable.min_eu + (range * (variable.low_low_pct || 5) / 100),
  };
}

/**
 * Evalúa si un valor genera una alarma y retorna la severidad, nivel y límite
 * Severidad:
 * - CRITICAL: HighHigh (HH) / LowLow (LL)
 * - WARNING: High (H) / Low (L)
 */
export function evaluateAlarm(variable: SensorVariable, value: number): AlarmEvaluation | null {
  const thresholds = calculateAlarmThresholds(variable);
  
  if (value >= thresholds.highHigh) {
    return {
      severity: 'CRITICAL',
      level: 'HH',
      limitValue: thresholds.highHigh,
      message: generateAlarmMessage(variable, value, 'HH', thresholds.highHigh),
    };
  } else if (value >= thresholds.high) {
    return {
      severity: 'WARNING',
      level: 'H',
      limitValue: thresholds.high,
      message: generateAlarmMessage(variable, value, 'H', thresholds.high),
    };
  } else if (value <= thresholds.lowLow) {
    return {
      severity: 'CRITICAL',
      level: 'LL',
      limitValue: thresholds.lowLow,
      message: generateAlarmMessage(variable, value, 'LL', thresholds.lowLow),
    };
  } else if (value <= thresholds.low) {
    return {
      severity: 'WARNING',
      level: 'L',
      limitValue: thresholds.low,
      message: generateAlarmMessage(variable, value, 'L', thresholds.low),
    };
  }
  
  return null;
}

/**
 * Genera el mensaje de alarma con el formato especificado:
 * "[Descripción] [Nivel]. Valor: [Actual] [Unidad]. Límite [Nivel]: [Límite] [Unidad]"
 */
function generateAlarmMessage(
  variable: SensorVariable,
  currentValue: number,
  level: AlarmLevel,
  limitValue: number
): string {
  const levelText = {
    'HH': 'Alto Alto',
    'H': 'Alto',
    'L': 'Bajo',
    'LL': 'Bajo Bajo'
  };
  
  return `${variable.description} - ${levelText[level]}. Valor: ${currentValue.toFixed(1)} ${variable.unit}. Límite ${level}: ${limitValue.toFixed(1)} ${variable.unit}`;
}

/**
 * Genera mensaje de evento SENSOR_FAULT cuando un valor está fuera del rango físico
 * Formato: "ACTIVACIÓN EVENTO: [Desc]. Valor actual: [X] [Unit]. Rango físico: [Min] a [Max] [Unit]"
 */
export function generateSensorFaultMessage(variable: SensorVariable, currentValue: number): string {
  return `ACTIVACIÓN EVENTO: Valor de sensor fuera de rango físico en ${variable.abbreviation}. Valor actual: ${currentValue.toFixed(1)} ${variable.unit}. Rango físico: ${variable.min_eu.toFixed(1)} a ${variable.max_eu.toFixed(1)} ${variable.unit}.`;
}

/**
 * Verifica si un valor está fuera del rango físico (Min/Max)
 * Esto dispara el evento SENSOR_FAULT (Severidad CRITICAL)
 */
export function isOutOfPhysicalRange(variable: SensorVariable, value: number): boolean {
  return value < variable.min_eu || value > variable.max_eu;
}
