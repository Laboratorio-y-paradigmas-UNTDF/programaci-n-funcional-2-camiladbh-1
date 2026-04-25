(ns tp04.ej18
  "Ejercicio 18 — Integrador Clojure (7 pts). Trazabilidad: F-33")

;; {:ok true :value orden} si activa y total > 100. Error si no.
(defn clasificar-orden [orden]
 (if (:activa? orden)
   (if (> (:total orden) 100)
     {:ok true :value orden}
     {:ok false :error "monto insuficiente"})
   {:ok false :error "orden inactiva"}))


;; Retorna nueva orden con total reducido por porcentaje.
(defn aplicar-descuento [porcentaje orden]
 (update orden :total #(* % (- 1 (/ porcentaje 100))))
 )


;; Pipeline: clasificar → separar → descuento 10% → sumar.
;; Retorna {:aprobadas [...] :rechazadas [...] :total-final N}
(defn procesar-ordenes [ordenes]
 (let [clasificadas (map #(clasificar-orden %) ordenes)
       aprobadas (->> clasificadas
                      (filter :ok)
                      (map :value)
                      (map #(aplicar-descuento 10 %))
                      (vec))
       rechazadas (->> clasificadas
                       (filter #(not (:ok %)))
                       (map :error)
                       (vec))
       total-final (reduce + (map :total aprobadas))]
   {:aprobadas aprobadas
    :rechazadas rechazadas
    :total-final total-final}))

