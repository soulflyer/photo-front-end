(ns photo-front-end-front.core
  (:require [photo-front-end-front.api
             :refer
             [load-picture-list load-preferences load-project-list]]
            [photo-front-end-front.messages :refer [messages]]
            [photo-front-end-front.pictures :refer [pictures]]
            [photo-front-end-front.projects :refer [projects]]
            [re-com.core :as re]
            [reagent.core :as reagent]
            [zyzanie.core :as z]
            [zyzanie.notification :as zn]))

(load-project-list)
(load-picture-list "2017" "05" "04-Square")
(load-preferences)

(z/global-set-key "g" #(js/alert "Are you a global person?"))


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
