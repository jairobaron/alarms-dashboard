import { Alarm, HistoryItem, SensorVariable, AlarmLevel } from '@/types/alarm';

// Configuración completa de 11 variables según especificación
export const sensorVariables: SensorVariable[] = [
  // Sensores de Cabezal
  {
    tag: 'wellhead_tubing_pressure_sensor',
    abbreviation: 'THP_S',
    description: 'Presión de cabezal',
    unit: 'psi',
    min_eu: 0,
    max_eu: 300,
    current_value: 285,
    low_pct: 20,
    low_low_pct: 10,
    high_pct: 80,
    high_high_pct: 90,
  },
  {
    tag: 'wellhead_tubing_temperature_sensor',
    abbreviation: 'THT_S',
    description: 'Temperatura de cabezal',
    unit: '°F',
    min_eu: 0,
    max_eu: 250,
    current_value: 220,
    low_pct: 20,
    low_low_pct: 10,
    high_pct: 80,
    high_high_pct: 90,
  },
  {
    tag: 'wellhead_casing_pressure_sensor',
    abbreviation: 'CHP_S',
    description: 'Presión de revestidor',
    unit: 'psi',
    min_eu: 0,
    max_eu: 300,
    current_value: 45,
    low_pct: 15,
    low_low_pct: 5,
    high_pct: 85,
    high_high_pct: 95,
  },
  {
    tag: 'wellhead_casing_temperature_sensor',
    abbreviation: 'CHT_S',
    description: 'Temperatura de revestidor',
    unit: '°F',
    min_eu: 0,
    max_eu: 250,
    current_value: 180,
    low_pct: 20,
    low_low_pct: 10,
    high_pct: 80,
    high_high_pct: 90,
  },
  // Dinamometría
  {
    tag: 'polished_rod_position',
    abbreviation: 'PrPos',
    description: 'Posición de la barra pulida',
    unit: 'in',
    min_eu: 0,
    max_eu: 150,
    current_value: 145,
    low_pct: 5,
    low_low_pct: 2,
    high_pct: 95,
    high_high_pct: 98,
  },
  {
    tag: 'polished_rod_load',
    abbreviation: 'PrLoad',
    description: 'Carga de la barra pulida',
    unit: 'lb',
    min_eu: 0,
    max_eu: 20000,
    current_value: 18500,
    low_pct: 20,
    low_low_pct: 10,
    high_pct: 80,
    high_high_pct: 90,
  },
  // VFD Motor
  {
    tag: 'vfd_motor_current',
    abbreviation: 'MCurr',
    description: 'Corriente de motor',
    unit: 'A',
    min_eu: 0,
    max_eu: 200,
    current_value: 175,
    low_pct: 10,
    low_low_pct: 5,
    high_pct: 85,
    high_high_pct: 95,
  },
  {
    tag: 'vfd_motor_voltage',
    abbreviation: 'MVolt',
    description: 'Voltaje de motor',
    unit: 'V',
    min_eu: 0,
    max_eu: 500,
    current_value: 460,
    low_pct: 80,
    low_low_pct: 80,
    high_pct: 105,
    high_high_pct: 110,
  },
  {
    tag: 'vfd_motor_speed',
    abbreviation: 'MSpd',
    description: 'Velocidad de motor',
    unit: 'rpm',
    min_eu: 0,
    max_eu: 2000,
    current_value: 1750,
    low_pct: 10,
    low_low_pct: 5,
    high_pct: 85,
    high_high_pct: 95,
  },
  {
    tag: 'vfd_motor_power',
    abbreviation: 'MPow',
    description: 'Potencia de motor',
    unit: 'W',
    min_eu: 0,
    max_eu: 100000,
    current_value: 85000,
    low_pct: 10,
    low_low_pct: 5,
    high_pct: 80,
    high_high_pct: 90,
  },
  {
    tag: 'vfd_motor_frequency',
    abbreviation: 'MFreq',
    description: 'Frecuencia de motor',
    unit: 'Hz',
    min_eu: 0,
    max_eu: 100,
    current_value: 62,
    low_pct: 20,
    low_low_pct: 10,
    high_pct: 62,
    high_high_pct: 65,
  },
];

// Función auxiliar para calcular límites de alarma
const calculateLimit = (min: number, max: number, percentage: number): number => {
  const range = max - min;
  return min + (range * percentage / 100);
};

// Función para generar mensaje de alarma con formato correcto
const generateAlarmMessage = (
  description: string,
  level: AlarmLevel,
  currentValue: number,
  limitValue: number,
  unit: string
): string => {
  const levelText = {
    'HH': 'Alto Alto',
    'H': 'Alto',
    'L': 'Bajo',
    'LL': 'Bajo Bajo'
  };
  
  return `${description} - ${levelText[level]}. Valor: ${currentValue.toFixed(1)} ${unit}. Límite ${level}: ${limitValue.toFixed(1)} ${unit}`;
};

// Generar alarmas activas con formato correcto
export const generateActiveAlarms = (): Alarm[] => {
  const alarms: Alarm[] = [];
  const now = new Date();
  
  // THP_S - HighHigh (CRITICAL)
  const thp = sensorVariables[0];
  const thpLimit = calculateLimit(thp.min_eu, thp.max_eu, thp.high_high_pct!);
  alarms.push({
    id: 101,
    timestamp: now.toLocaleTimeString('es-ES'),
    severity: 'CRITICAL',
    level: 'HH',
    tag: thp.abbreviation,
    description: thp.description,
    message: generateAlarmMessage(thp.description, 'HH', thp.current_value!, thpLimit, thp.unit),
    currentValue: thp.current_value!,
    limitValue: thpLimit,
    unit: thp.unit,
    status: 'ACT',
  });
  
  // THT_S - High (WARNING)
  const tht = sensorVariables[1];
  const thtLimit = calculateLimit(tht.min_eu, tht.max_eu, tht.high_pct!);
  alarms.push({
    id: 102,
    timestamp: new Date(now.getTime() - 180000).toLocaleTimeString('es-ES'),
    severity: 'WARNING',
    level: 'H',
    tag: tht.abbreviation,
    description: tht.description,
    message: generateAlarmMessage(tht.description, 'H', tht.current_value!, thtLimit, tht.unit),
    currentValue: tht.current_value!,
    limitValue: thtLimit,
    unit: tht.unit,
    status: 'ACT',
  });
  
  // PrLoad - High (WARNING)
  const prload = sensorVariables[5];
  const prloadLimit = calculateLimit(prload.min_eu, prload.max_eu, prload.high_pct!);
  alarms.push({
    id: 103,
    timestamp: new Date(now.getTime() - 300000).toLocaleTimeString('es-ES'),
    severity: 'WARNING',
    level: 'H',
    tag: prload.abbreviation,
    description: prload.description,
    message: generateAlarmMessage(prload.description, 'H', prload.current_value!, prloadLimit, prload.unit),
    currentValue: prload.current_value!,
    limitValue: prloadLimit,
    unit: prload.unit,
    status: 'ACT',
  });
  
  // MCurr - HighHigh (CRITICAL)
  const mcurr = sensorVariables[6];
  const mcurrLimit = calculateLimit(mcurr.min_eu, mcurr.max_eu, mcurr.high_high_pct!);
  alarms.push({
    id: 104,
    timestamp: new Date(now.getTime() - 420000).toLocaleTimeString('es-ES'),
    severity: 'CRITICAL',
    level: 'HH',
    tag: mcurr.abbreviation,
    description: mcurr.description,
    message: generateAlarmMessage(mcurr.description, 'HH', mcurr.current_value!, mcurrLimit, mcurr.unit),
    currentValue: mcurr.current_value!,
    limitValue: mcurrLimit,
    unit: mcurr.unit,
    status: 'ACT',
  });

  return alarms;
};

// Generar historial con alarmas y eventos del sistema
export const generateHistoryLog = (): HistoryItem[] => {
  const now = new Date();
  const history: HistoryItem[] = [];
  
  // Alarmas de proceso activas
  const activeAlarms = generateActiveAlarms();
  activeAlarms.forEach(alarm => {
    history.push({
      id: alarm.id,
      timestamp: new Date(now.getTime() - (alarm.id - 100) * 60000).toLocaleString('es-ES'),
      type: 'ALARM',
      severity: alarm.severity,
      tag: alarm.tag,
      message: `${alarm.message}`,
      status: 'ACT',
    });
  });
  
  // Eventos del sistema - CRÍTICOS
  history.push({
    id: 201,
    timestamp: new Date(now.getTime() - 600000).toLocaleString('es-ES'),
    type: 'EVENT',
    severity: 'CRITICAL',
    tag: 'SENSOR_FAULT',
    message: 'ACTIVACIÓN EVENTO: Valor de sensor fuera de rango físico en CHP_S. Valor actual: 350.0 psi. Rango físico: 0.0 a 300.0 psi.',
    status: 'RTN',
  });
  
  history.push({
    id: 202,
    timestamp: new Date(now.getTime() - 900000).toLocaleString('es-ES'),
    type: 'EVENT',
    severity: 'CRITICAL',
    tag: 'VFD_FAULT',
    message: 'VFD_FAULT - Falla de variador de frecuencia',
    status: 'RTN',
  });
  
  history.push({
    id: 203,
    timestamp: new Date(now.getTime() - 1200000).toLocaleString('es-ES'),
    type: 'EVENT',
    severity: 'CRITICAL',
    tag: 'EMERGENCY_STOP',
    message: 'EMERGENCY_STOP - Parada de emergencia accionada',
    status: 'RTN',
  });
  
  // Eventos del sistema - ADVERTENCIA
  history.push({
    id: 204,
    timestamp: new Date(now.getTime() - 1800000).toLocaleString('es-ES'),
    type: 'EVENT',
    severity: 'WARNING',
    tag: 'DISK_SPACE',
    message: 'DISK_SPACE_LOW_WARN - Almacenamiento del servidor > 80% y < 90%',
    status: 'RTN',
  });
  
  // Eventos del sistema - INFORMATIVOS
  history.push({
    id: 301,
    timestamp: new Date(now.getTime() - 2400000).toLocaleString('es-ES'),
    type: 'EVENT',
    severity: 'INFO',
    tag: 'MODE',
    message: 'MODE_CHANGED - Modo de control cambiado a: MANUAL',
    status: 'LOG',
  });
  
  history.push({
    id: 302,
    timestamp: new Date(now.getTime() - 3000000).toLocaleString('es-ES'),
    type: 'EVENT',
    severity: 'INFO',
    tag: 'VFD',
    message: 'VFD_RUNNING - VFD en estado RUNNING',
    status: 'LOG',
  });
  
  history.push({
    id: 303,
    timestamp: new Date(now.getTime() - 3600000).toLocaleString('es-ES'),
    type: 'EVENT',
    severity: 'INFO',
    tag: 'VFD',
    message: 'VFD_READY - VFD en estado READY (Listo para operar)',
    status: 'LOG',
  });
  
  history.push({
    id: 304,
    timestamp: new Date(now.getTime() - 4200000).toLocaleString('es-ES'),
    type: 'EVENT',
    severity: 'INFO',
    tag: 'PUMP',
    message: 'PUMP_VELOCITY_CONTROL - Control de Bombeo: Modo VELOCITY (Velocidad Fija)',
    status: 'LOG',
  });
  
  history.push({
    id: 305,
    timestamp: new Date(now.getTime() - 4800000).toLocaleString('es-ES'),
    type: 'EVENT',
    severity: 'INFO',
    tag: 'PUMP',
    message: 'PUMP_FILLAGE_CONTROL - Control de Bombeo: Modo FILLAGE (Porcentaje de llenado)',
    status: 'LOG',
  });
  
  history.push({
    id: 306,
    timestamp: new Date(now.getTime() - 5400000).toLocaleString('es-ES'),
    type: 'EVENT',
    severity: 'INFO',
    tag: 'PUMP',
    message: 'PUMP_OFF_CONTROL - Control de Bombeo: Estado OFF',
    status: 'LOG',
  });
  
  // Alarmas resueltas (RTN)
  history.push({
    id: 401,
    timestamp: new Date(now.getTime() - 6000000).toLocaleString('es-ES'),
    type: 'ALARM',
    severity: 'INFO',
    tag: 'MVolt',
    message: 'Voltaje de motor - Alto. Retorno a normal.',
    status: 'RTN',
  });
  
  // Alarmas reconocidas (ACK)
  history.push({
    id: 402,
    timestamp: new Date(now.getTime() - 6600000).toLocaleString('es-ES'),
    type: 'ALARM',
    severity: 'WARNING',
    tag: 'MSpd',
    message: 'Velocidad de motor - Alto - RECONOCIDA por Operador',
    status: 'ACK',
  });
  
  return history.sort((a, b) => b.id - a.id);
};
