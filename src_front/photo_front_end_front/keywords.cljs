(ns photo-front-end-front.keywords
  (:require [re-com.core :as re]
            [photo-front-end-front.api
             :refer [picture-details
                     keyword-buttons
                     project-message]]
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
             :children (for [kw keyws]
                         [:input {:type "button"
                                  :id "xxx"
                                  :value kw
                                  :on-click #(reset! project-message kw)}])]]))

(defn panel []
  [keywords])
