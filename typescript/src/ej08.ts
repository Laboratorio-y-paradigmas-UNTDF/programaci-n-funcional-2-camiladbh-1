// Ejercicio 8 — Currying (6 pts)
// Trazabilidad: F-16, F-17

// Convierte función de 2 args en cadena de funciones de 1 arg.
// (a,b) => c  se convierte en  a => b => c
export function curry2<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
// 1. Recibimos la función original 'fn' que toma (a, b).
  
  // 2. Retornamos una nueva función que solo recibe el primer argumento 'a'.
  return (a: A) => {
    
    // 3. Esta función, a su vez, retorna OTRA función que recibe el argumento 'b'.
    return (b: B): C => {
      
      // 4. Finalmente, cuando tenemos ambos (a y b), 
      // ejecutamos la función original 'fn' y devolvemos el resultado.
      return fn(a, b);
    };
  };
  // otra forma más compacta:
  // return (a: A) => (b: B) => fn(a, b);
}

// Convierte función de 3 args en cadena de funciones de 1 arg.
// (a,b,c) => d  se convierte en  a => b => c => d
export function curry3<A, B, C, D>(fn: (a: A, b: B, c: C) => D): (a: A) => (b: B) => (c: C) => D {
  return (a:A) => (b:B) => (c:C) => fn(a,b,c);
}
