(ns photo-front-end-front.keywords
  (:require [re-com.core :as re]
            [photo-front-end-front.api
             :refer [picture-details]]))

(defn keywords []
  (let [ keyws (set (flatten (map (fn [x] (x "Keywords")) @picture-details)))]
    [re/scroller
     :v-scroll :auto
     :child [re/v-box
             :children (for [kw keyws] [:p kw])]]))

(defn panel []
  [keywords])
