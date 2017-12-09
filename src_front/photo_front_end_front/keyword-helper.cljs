(ns photo-front-end-front.keyword-helper
  (:require [photo-front-end-front.api :refer [picture-details]]
            [photo-front-end-front.api :refer [load-preference
                                               set-preference
                                               keyword-buttons]]
            [photo-front-end-front.helpers :refer [csv]]))

(defn project-keywords [pic-details]
  (set (flatten (map (fn [x] (x "Keywords")) pic-details))))

;; (defn current-keywords []
;;   (load-preference keyword-buttons "button-list" ))

(defn current-keywords []
  (reset! keyword-buttons (csv (project-keywords @picture-details))))
