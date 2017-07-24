(ns photo-front-end-front.helpers)

(defn project-vector [project-string]
  [(subs project-string 0 4)
   (subs project-string 4 6)
   (subs project-string 6)])
