(ns photo-front-end-front.init
    (:require [photo-front-end-front.core :as core]
              [photo-front-end-front.conf :as conf]))

(enable-console-print!)

(defn start-descjop! []
  (core/init! conf/setting))

(start-descjop!)
