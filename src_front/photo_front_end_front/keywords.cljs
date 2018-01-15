(ns photo-front-end-front.keywords
  (:require [re-com.core    :as re]
            [clojure.string :as str]
            [photo-front-end-front.api            :refer [picture-details
                                                          keyword-buttons
                                                          project-message
                                                          add-keyword]]
            [photo-front-end-front.keyword-helper :refer [project-keywords]]
            [photo-front-end-front.helpers        :refer [un-csv
                                                          csv]]))

(defn keywords []
  (let [ keyws (un-csv @keyword-buttons)]
    [re/scroller
     :v-scroll :auto
     :child [re/v-box
             :children (for [kw keyws]
                         [:input {:type "button"
                                  :id "xxx"
                                  :value kw
                                  ;;:on-click #(reset! project-message kw)
                                  :on-click #(add-keyword kw)}])]]))

(defn panel []
  [keywords])
