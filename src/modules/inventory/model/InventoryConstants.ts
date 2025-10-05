import type { InventoryStatus } from './InventoryTypes';

// Estados de inventario con labels legibles
export const INVENTORY_STATUS_OPTIONS: Array<{
  value: InventoryStatus;
  label: string;
  color: string;
}> = [
  { value: 'active', label: 'Activo', color: '#4caf50' },
  { value: 'inactive', label: 'Inactivo', color: '#9e9e9e' },
  { value: 'maintenance', label: 'Mantenimiento', color: '#ff9800' },
  { value: 'retired', label: 'Retirado', color: '#f44336' },
];

// Categorías predefinidas para equipos
export const EQUIPMENT_CATEGORIES = [
  'Computadores',
  'Laptops',
  'Monitores',
  'Impresoras',
  'Tablets',
  'Teléfonos',
  'Proyectores',
  'Cámaras',
  'Audio/Video',
  'Redes',
  'Servidores',
  'Otros',
] as const;

// Categorías predefinidas para suministros
export const SUPPLY_CATEGORIES = [
  'Papel',
  'Tóner/Cartuchos',
  'Cables',
  'Baterías',
  'Accesorios',
  'Material de oficina',
  'Limpieza',
  'Seguridad',
  'Repuestos',
  'Otros',
] as const;

// Unidades de medida para suministros
export const UNIT_OF_MEASURE_OPTIONS = [
  'Unidad',
  'Caja',
  'Paquete',
  'Metro',
  'Litro',
  'Kilogramo',
  'Set',
  'Rollo',
] as const;

// Ubicaciones predefinidas
export const LOCATION_OPTIONS = [
  'Oficina Principal',
  'Sucursal Norte',
  'Sucursal Sur',
  'Almacén Central',
  'Almacén Secundario',
  'Sala de Servidores',
  'Recepción',
  'Sala de Juntas',
  'Área de Trabajo',
  'Mantenimiento',
] as const;

// Configuración de paginación
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// Configuración de alertas de stock
export const STOCK_ALERTS = {
  LOW_STOCK_THRESHOLD: 0.2, // 20% del stock mínimo
  CRITICAL_STOCK_THRESHOLD: 0.1, // 10% del stock mínimo
  EXPIRY_WARNING_DAYS: 30, // Alertar 30 días antes de expiración
} as const;

// Rutas del módulo de inventario
export const INVENTORY_ROUTES = {
  MAIN: '/inventory',
  EQUIPMENT: '/inventory/equipos',
  SUPPLIES: '/inventory/consumibles',
  EQUIPMENT_DETAIL: '/inventory/equipos/:id',
  SUPPLIES_DETAIL: '/inventory/consumibles/:id',
  EQUIPMENT_NEW: '/inventory/equipos/nuevo',
  SUPPLIES_NEW: '/inventory/consumibles/nuevo',
  REPORTS: '/inventory/reportes',
} as const;

// Mensajes de validación
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es obligatorio',
  MIN_LENGTH: (min: number) => `Debe tener al menos ${min} caracteres`,
  MAX_LENGTH: (max: number) => `No puede exceder ${max} caracteres`,
  INVALID_EMAIL: 'Formato de email inválido',
  INVALID_NUMBER: 'Debe ser un número válido',
  MIN_VALUE: (min: number) => `Debe ser mayor o igual a ${min}`,
  MAX_VALUE: (max: number) => `Debe ser menor o igual a ${max}`,
  DUPLICATE: 'Este valor ya existe',
  INVALID_DATE: 'Fecha inválida',
  FUTURE_DATE: 'La fecha debe ser futura',
  PAST_DATE: 'La fecha debe ser pasada',
} as const;