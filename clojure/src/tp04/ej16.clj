(ns tp04.ej16
  "Ejercicio 16 — DSL data-driven (5 pts). Trazabilidad: F-31"
  (:require [clojure.string :as str]))

;; Vector de reglas: {:field :name, :pred fn, :msg "..."}
(def user-rules
 [{:field :name, :pred (fn [v] (not (str/blank? (str v)))), :msg "nombre no puede estar vacío"}
  {:field :email, :pred (fn [v] (and (not (str/blank? (str v))) (re-matches #".+@.+\..+" (str v)))), :msg "email debe contener @"}
  {:field :age, :pred (fn [v] (and (number? v) (>= v 18))), :msg "debe ser mayor de 18 años"}])


;; Aplica todas las reglas a data. Retorna vector de {:field :error} (vacío si ok).
(defn validate [rules data]
 (->> rules (reduce (fn [acc {:keys [field pred msg]}]
                (if (pred (get data field))
                  acc
                  (conj acc {:field field :error msg})))
              [])
      )
 )


;; true si no hay errores.
(defn valid? [rules data]
 (empty? (validate rules data))
 )


