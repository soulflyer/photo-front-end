(ns photo-front-end-front.pictures
  (:require [photo-front-end-front.api :refer [picture-list
                                               thumbnail-directory
                                               highlighted-pic
                                               pic-down
                                               pic-up
                                               pic-left
                                               pic-right]]
            [photo-front-end-front.helpers :refer [image-id]]
            [re-com.core :as re]
            [keybind.core :as key]))

(defn bind-keys []
  (key/bind! "w" ::pic-up pic-up)
  (key/bind! "s" ::pic-down pic-down)
  (key/bind! "a" ::pic-left pic-left)
  (key/bind! "d" ::pic-right pic-right))

(defn pictures []
  (let [pl (vec (keys @picture-list))
        ph @highlighted-pic
        bk (bind-keys)]
    [:div
     [re/scroller
       :attr {:id "pictures-scroller"}
       :v-scroll :auto
       :h-scroll :off
       :height "95vh"
       :margin "0px"
       :child [:div#pictures
               (for [index (range (count pl))]
                 (let [pic (get pl index)]
                   [:div.img-container
                    {:on-double-click #(if (@picture-list pic)
                                  (swap! picture-list assoc pic false)
                                  (swap! picture-list assoc pic true))
                     :on-click #(reset! highlighted-pic index)
                     :class (str (if (= @highlighted-pic index)
                                    "highlighted"
                                    "not-highlighted")
                                 " pic" index)}
                    [:img
                     {:src (str @thumbnail-directory "/" pic)
                      :class (str (if (@picture-list pic)
                                    "selected"
                                    "not-selected")
                                  " "
                                  )}]]))]]
     [:div#filler [:p "filler"]]
     ]))
