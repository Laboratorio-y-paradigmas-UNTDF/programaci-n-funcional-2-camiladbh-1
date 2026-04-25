// Ejercicio 11 — Middleware como HOF (6 pts)
// Trazabilidad: F-22, F-23

export type Request = { headers: Record<string, string>; body: unknown; meta: { logs: string[] } };
export type Response = { status: number; body: unknown };
export type Handler = (req: Request) => Response;
export type Middleware = (handler: Handler) => Handler;

// Si authorization header es "Bearer <secret>", continúa. Si no, 401.
export function withAuth(secret: string): Middleware {
  // Recibe el handler base
  return (handler: Handler): Handler => {
    // retorna una nueva función que recibe el request
    return (req: Request): Response =>{
      // acceso correcto al header de autorizacion
      const authMender = req.headers["authorization"];

      //verificacion del esquema Bearer
      if (authMender === `Bearer ${secret}`) {
        // si es correcto, ejecutamos el handles original
        return handler(req);
    }
    // si falla devolvemos el error 401 sin ejecutar el handler
    return { 
      status: 401, 
      body: { error: "unauthorized" } 
    };
  };
};
}

// Agrega "[prefix] request" a req.meta.logs antes de llamar al handler.
export function withLogging(prefix: string): Middleware {
  return (handler: Handler): Handler => {
    return (req: Request): Response => {
      // Agrega el log al meta.logs
      req.meta.logs.push(`[${prefix}] request`);
      // Llama al handler original con el request modificado
      return handler(req);
    };
  };
}
