// Ejercicio 13 — Recursión de cola TS (5 pts)
// Trazabilidad: F-27

export type TreeNode = { value: number; children: TreeNode[] };

// Suma con acumulador (default 0). Recursiva, sin loops.
export function sumList(nums: number[], acc: number = 0): number {
  // si la longitud es 0, retornamos el acumulador
  if (nums.length === 0) return acc;
  // desestructuramos el primer elemento (head) y el resto de la lista (tail)
  const [head, ...tail] = nums;
  // sumamos el head al acumulador y llamamos recursivamente con el tail
  return sumList(tail, acc + head);
}

// Factorial con acumulador (default 1). Recursiva, sin loops.
export function factorial(n: number, acc: number = 1): number {
  if (n <= 1) return acc;
  return factorial(n - 1, acc * n);
}

// Busca value en árbol N-ario pre-order. Retorna valor o null.
export function findInTree(nodes: TreeNode[], target: number): number | null {
  // Si no hay nodos, retornamos null
  if (nodes.length === 0) return null;
  // Desestructuramos el primer nodo (head) y el resto de los nodos (tail)
  const [current, ...rest] = nodes;
  // Si el valor del nodo actual es el target, lo retornamos
  if (current.value === target) return current.value;
  // Si no, buscamos en los hijos del nodo actual
  const foundInChildren = findInTree(current.children, target);
  if (foundInChildren !== null) return foundInChildren;
  // Si no se encontró en los hijos, buscamos en el resto de los nodos
  return findInTree(rest, target);
}
