(ns photo-front-end-front.messages
  (:require [photo-front-end-front.api :refer [open-external
                                               project-message]]
            [photo-front-end-front.picture-helper :refer [clear-all
                                                          select-all
                                                          inc-cols
                                                          dec-cols]]
            [photo-front-end-front.export-json :refer [export-json-button]]
            [re-com.core :as re]))

(defn messages []
  [re/h-box
   :children [[:p (str @project-message)]
              [re/h-box
               :children [[:input {:type "button"
                                   :id "inc-cols"
                                   :value "<"
                                   :on-click #(dec-cols)}]
                          [:input {:type "button"
                                   :id "inc-cols"
                                   :value ">"
                                   :on-click #(inc-cols)}]
                          [export-json-button]
                          [:input {:type "button"
                                   :id "open-external"
                                   :value "Open"
                                   :on-click #(open-external)}]
                          [:input {:type "button"
                                   :id "clear-all"
                                   :value "Clear All"
                                   :on-click #(clear-all)}]
                          [:input {:type "button"
                                   :id "select-all"
                                   :value "Select All"
                                   :on-click #(select-all)}]]]]])
