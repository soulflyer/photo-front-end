(ns photo-front-end-front.core
  (:require [photo-front-end-front.api
             :refer
             [load-picture-list
              load-preferences
              load-project-list
              open-external
              project-message]]
            [photo-front-end-front.export-json :refer [export-json-button]]
            [photo-front-end-front.pictures :refer [pictures]]
            [photo-front-end-front.projects :refer [projects]]
            [re-com.core :as re]
            [reagent.core :as reagent]))

(load-project-list)
(load-picture-list "2017" "05" "04-Square")
(load-preferences)

(defn messages []
  [:div#messages
   [:p (str @project-message)]
   [:div#buttons
    [export-json-button]
    [:input {:type "button"
             :id "open-external"
             :value "Open"
             :on-click #(open-external)}]]])

(defn root-component []
  [:div#root
   [re/v-box
    :margin "0px"
    :height "100%"
    :children [[re/h-split
                :margin "0px"
                :panel-1 [projects]
                :panel-2 [pictures]
                :initial-split "15%"]
               [messages]]]])

(defn mount-root [setting]
  (reagent/render [root-component]
                  (.getElementById js/document "app")))

(defn init! [setting]
  (mount-root setting))
