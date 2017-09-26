(ns photo-front-end-front.pictures
  (:require [photo-front-end-front.api :refer [picture-list
                                               thumbnail-directory
                                               highlighted-pic]]
            [photo-front-end-front.helpers :refer [image-id]]
            [re-com.core :as re]))

(defn pictures []
  (let [pl (vec (keys @picture-list))]
    [:div
     [re/scroller
       :attr {:id "projects"}
       :v-scroll :auto
       :h-scroll :off
       :height "95vh"
       :margin "0px"
       :child [:div#pictures
               (for [index (range (count pl))]
                 (let [pic (get pl index)]
                   [:div.img-container
                    {:on-click #(if (@picture-list pic)
                                  (swap! picture-list assoc pic false)
                                  (swap! picture-list assoc pic true))
                     :class (str "pic" index " "
                                 (if (= @highlighted-pic (str "pic" index))
                                    "highlighted"
                                    "not-highlighted"))}
                    [:img
                     {:src (str @thumbnail-directory "/" pic)
                      :class (str (if (@picture-list pic)
                                    "selected"
                                    "not-selected")
                                  " "
                                  )}]]))]]
     [:div#filler [:p "filler"]]
     ]))
