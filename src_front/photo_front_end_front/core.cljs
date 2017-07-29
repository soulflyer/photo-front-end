(ns photo-front-end-front.core
  (:require [photo-front-end-front.api
             :refer [load-picture-list
                     load-project-list
                     load-preferences
                     picture-list
                     thumbnail-directory
                     project-message
                     export-json
                     open-external]]
            [photo-front-end-front.projects :refer [projects]]
            [photo-front-end-front.export-json :refer [export-json-button]]
            [photo-front-end-front.helpers :refer [image-id
                                                   selected]]
            [reagent.core :as reagent :refer [atom]]
            [re-com.core :as re]))

(load-project-list)
(load-picture-list "2017" "05" "04-Square")
(load-preferences)

(defn pictures []
  (let [pl (keys @picture-list)]
    [re/scroller
     :attr {:id "projects"}
     :v-scroll :auto
     :h-scroll :off
     :height "95vh"
     :margin "0px"
     :child [:div#pictures
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
                    {:src (str @thumbnail-directory "/" pic)}]]]))]]))

(defn messages []
  [:div#messages
   [:p (str @project-message)]
   [:div#buttons
    [export-json-button]
    [:input {:type "button"
             :id "open-external"
             :value "Open"
             :on-click #(open-external)}]]])

;; (defn root-component []
;;   [:div#root
;;    [:div#top
;;     [projects]
;;     [pictures]]
;;    [messages]])

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
