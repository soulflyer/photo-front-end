(ns photo-front-end-front.pictures
  (:require [photo-front-end-front.api :refer [picture-list thumbnail-directory]]
            [photo-front-end-front.helpers :refer [image-id]]
            [re-com.core :as re]))

(defn pictures []
  (let [pl (sort (keys @picture-list))]
    [:div
     [re/scroller
       :attr {:id "projects"}
       :v-scroll :auto
       :h-scroll :off
       :height "95vh"
       :margin "0px"
       :child [:div#pictures
               (for [pic pl]
                 [:div.img-container
                  {:on-click #(if (@picture-list pic)
                                (swap! picture-list assoc pic false)
                                (swap! picture-list assoc pic true))
                   :tabIndex "0"}
                  [:img
                   {:src (str @thumbnail-directory "/" pic)
                    :class (if (@picture-list pic)
                             "selected"
                             "not-selected")}]])]]
     [:div#filler [:p "filler"]]
     ]))
