(ns photo-front-end-front.core
  (:require [photo-front-end-front.api :refer [;;load-picture-list
                                               load-picture-list
                                               load-preference
                                               load-project-list
                                               current-project
                                               medium-directory]]
            [photo-front-end-front.messages :refer [messages]]
            [photo-front-end-front.pictures :refer [pictures]]
            [photo-front-end-front.projects :refer [projects]]
            [photo-front-end-front.export-json :as json]
            [re-com.core :as re]
            [reagent.core :as reagent]))

(load-preference current-project "current-project")
(load-project-list)
(load-preference medium-directory "medium-directory")

(defn root-component []
  (let [_ (load-picture-list @current-project)]
   [:div#root
    [re/v-box
     :margin "0px"
     :height "100%"
     :children [[re/h-split
                 :margin "0px"
                 :panel-1 [projects]
                 :panel-2 [pictures]
                 :initial-split "15%"]
                [messages]]]]))

(defn mount-root [setting]
  (reagent/render [root-component]
                  (.getElementById js/document "app")))

(defn init! [setting]
  (mount-root setting))
