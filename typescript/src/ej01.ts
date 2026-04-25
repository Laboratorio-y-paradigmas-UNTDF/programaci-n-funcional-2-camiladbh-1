// Ejercicio 1 — Pipeline filter/map/reduce (5 pts)
// Trazabilidad: F-04, F-05, F-10

export type Orden = {
  id: number;
  cliente: string;
  total: number;
  categoria: string;
  activa: boolean;
};

// Filtra órdenes activas, extrae totales y los suma.
export function filtrarActivasYSumar(ordenes: Orden[]): number {
  return ordenes
    .filter((orden) => orden.activa)
    .map((orden) => orden.total)
    .reduce((acumulado, actual) => acumulado + actual, 0);
}

// Filtra las activas y devuelve un array con sus totales.
export function obtenerTotalesActivas(ordenes: Orden[]): number[] {
  return ordenes
    .filter((orden) => orden.activa)
    .map((orden) => orden.total);
}

// Cuenta cuántas órdenes hay por cada categoría (usar reduce).
export function contarPorCategoria(ordenes: Orden[]): Record<string, number> {
  return ordenes.reduce((contador, orden) => {
    const cat= orden.categoria;
    contador[cat] = (contador[cat] || 0) + 1; 
    return contador;
  }, {} as Record<string, number>); 
}
