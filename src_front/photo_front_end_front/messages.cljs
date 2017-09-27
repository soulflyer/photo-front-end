(ns photo-front-end-front.messages
  (:require [photo-front-end-front.api :refer [open-external
                                               project-message]]
            [photo-front-end-front.picture-helper :refer [clear-all
                                                          select-all]]
            [photo-front-end-front.export-json :refer [export-json-button]]))

(defn messages []
  [:div#messages
   [:p (str @project-message)]
   [:div#buttons
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
             :on-click #(select-all)}]]])
