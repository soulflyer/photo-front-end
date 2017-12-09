(ns photo-front-end-front.keywords
  (:require [re-com.core :as re]
            [photo-front-end-front.api
             :refer [picture-details
                     keyword-buttons]]
            [photo-front-end-front.keyword-helper
             :refer [project-keywords]]
            [photo-front-end-front.helpers
             :refer [un-csv
                     csv]]
            [clojure.string :as str]))

(defn keywords []
  (let [ keyws (un-csv @keyword-buttons)]
    [re/scroller
     :v-scroll :auto
     :child [re/v-box
             :children (sort (for [kw keyws] [:p kw]))]]))

(defn panel []
  [keywords])
