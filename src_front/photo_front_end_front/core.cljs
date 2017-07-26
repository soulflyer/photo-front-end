(ns photo-front-end-front.core
  (:require [photo-front-end-front.api
             :refer [load-picture-list
                     load-project-list
                     load-preferences
                     picture-list
                     thumbnail-directory
                     project-message]]
            [photo-front-end-front.projects :refer [projects]]
            [photo-front-end-front.helpers :refer [image-id
                                                   selected]]
            [reagent.core :as reagent :refer [atom]]))

(load-project-list)
(load-picture-list "2017" "05" "04-Square")
(load-preferences)

(defn pictures []
  (let [pl (keys @picture-list)]
    [:div#pictures
     (for [pic pl]
       (let [picture (:pic pic)]
         [:div.img-container
          [:input {:type "checkbox"
                   :id (image-id pic)
                   :on-click #(if (@picture-list pic)
                               (swap! picture-list assoc pic false)
                               (swap! picture-list assoc pic true))}]
          [:label
           {:for (image-id pic)}
           [:img
            {:src (str @thumbnail-directory "/" pic)}]]]))]))

(defn messages []
  [:div#messages
   [:p (str @project-message)]])

(defn root-component []
  [:div#root
   [:div#top
    [projects]
    [pictures]]
   [messages]])

(defn mount-root [setting]
  (reagent/render [root-component]
                  (.getElementById js/document "app")))

(defn init! [setting]
  (mount-root setting))
