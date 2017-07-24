(ns photo-front-end-front.core
  (:require [photo-front-end-front.api
             :refer
             [load-picture-list load-project-list picture-list project-message]]
            [photo-front-end-front.projects :refer [projects]]
            [reagent.core :as reagent :refer [atom]]))

(load-project-list)
(load-picture-list "2017" "05" "04-Square")

(defn pictures []
  (let [pl @picture-list]
    [:div#pictures
     (for [pic pl]
       [:img {:src (str "/Users/iain/Pictures/Published/thumbs/" pic)}])]))

(defn messages []
  [:div#messages
   [:p (str @project-message)]])

(defn root-component []
  [:div#root
   [projects]
   [pictures]
   [messages]])

(defn mount-root [setting]
  (reagent/render [root-component]
                  (.getElementById js/document "app")))

(defn init! [setting]
  (mount-root setting))
