(ns photo-front-end-front.core
  (:require [photo-front-end-front.api :refer [;;load-picture-list
                                               load-picture-list
                                               load-preference
                                               load-project-list
                                               current-project
                                               selected-tab
                                               medium-directory]]
            [photo-front-end-front.messages :refer [messages]]
            [photo-front-end-front.pictures :refer [pictures]]
            [photo-front-end-front.projects :as projects]
            [photo-front-end-front.keywords :as keywords]
            [photo-front-end-front.export-json :as json]
            [re-com.core :as re]
            [re-com.util :as ru]
            [reagent.core :as reagent]))

(load-preference current-project "current-project")
(load-project-list)
(load-preference medium-directory "medium-directory")

(def tabs-definition
  [{:id :projects :label "Projects" :panel projects/panel}
   {:id :keywords :label "Keywords" :panel keywords/panel}])

(defn root-component []
  (let [_ (load-picture-list @current-project)
        change-tab #(reset! selected-tab %)]
    [re/v-box
     :height "100%"
     :children [[re/h-split
                 :margin "0px"
                 :panel-1 [re/v-box
                           :children
                           [[re/horizontal-tabs
                             :model     selected-tab
                             :tabs      tabs-definition
                             :on-change change-tab]
                            [(:panel (ru/item-for-id @selected-tab tabs-definition))]
                            ]]
                 :panel-2 [pictures]
                 :initial-split "15%"]
                [re/box
                 :child [messages]]]]))

(defn mount-root [setting]
  (reagent/render [root-component]
                  (.getElementById js/document "app")))

(defn init! [setting]
  (mount-root setting))
