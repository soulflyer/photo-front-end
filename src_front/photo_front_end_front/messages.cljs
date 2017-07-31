(ns photo-front-end-front.messages
  (:require [photo-front-end-front.api :refer [open-external project-message]]
            [photo-front-end-front.export-json :refer [export-json-button]]))

(defn messages []
  [:div#messages
   [:p (str @project-message)]
   [:div#buttons
    [export-json-button]
    [:input {:type "button"
             :id "open-external"
             :value "Open"
             :on-click #(open-external)}]]])
