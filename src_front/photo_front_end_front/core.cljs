(ns photo-front-end-front.core
  (:require [photo-front-end-front.api
             :refer [load-picture-list
                     load-project-list
                     load-preferences
                     picture-list
                     thumbnail-directory
                     project-message]]
            [photo-front-end-front.projects :refer [projects]]
            [photo-front-end-front.helpers :refer [image-id]]
            [reagent.core :as reagent :refer [atom]]))

(load-project-list)
(load-picture-list "2017" "05" "04-Square")
(load-preferences)

(defn pictures []
  (let [pl @picture-list]
    [:div#pictures
     (for [pic pl]
       [:div.img-container
        [:input {:type "checkbox"
                 :id (image-id pic)}]
        [:label
         {:for (image-id pic)}
         [:img
          {:src (str @thumbnail-directory "/" pic)}]]])]))

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
