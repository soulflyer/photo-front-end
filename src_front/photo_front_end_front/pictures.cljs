(ns photo-front-end-front.pictures
  (:require [photo-front-end-front.api
             :refer [highlighted-pic
                     picture-list
                     picture-details
                     medium-directory
                     pic-columns
                     current-project]]
            [photo-front-end-front.keys :refer [bind-keys]]
            [photo-front-end-front.picture-helper :refer [focus]]
            [photo-front-end-front.helpers :refer [image-id
                                                   stars]]
            [re-com.core :as re]
            [clojure.string :refer [join]]))

(defn pictures []
  ;; Convert the following to get pl from @picture-details
  (let [pl (vec (sort (keys @picture-list)))
        ph @highlighted-pic
        cp @current-project
        bk (bind-keys)]
    [:div
     [re/scroller
      :attr {:id "pictures-scroller"}
      :v-scroll :auto
      :h-scroll :off
      :height "95vh"
      :margin "0px"
      :child [:div#pictures
              {:style {:grid-template-columns (join " " (repeat @pic-columns "1fr"))}}
              (for [index (range (count pl))]
                (let [pic (get pl index)
                      pic-id (image-id pic)
                      details (first (filter (fn [x] (= pic-id (x "_id"))) @picture-details))]
                  [re/h-box;;:div.img-container
                   :class (str (if (= @highlighted-pic index)
                                 "highlighted"
                                 "not-highlighted")
                               " pic" index)
                   :attr {:on-double-click
                          #(if (@picture-list pic)
                             (swap! picture-list assoc pic false)
                             (swap! picture-list assoc pic true))
                          :on-click #(reset! highlighted-pic index)
                          :tabIndex "0"}
                   :children [[re/h-box ;;:div.img-details
                               :children
                               [[:p.name (details "Version")]
                                [:p.rating (stars (js/parseInt (details "Rating")))]]]
                              [:img
                               {:src (str @medium-directory "/" pic)
                                :class (str (if (@picture-list pic)
                                              "selected"
                                              "not-selected"))}]
                              [re/box
                               ;;:div.img-details-bottom
                               :child [:p.keywords (join "," (details "Keywords"))]]]
                   ]))]]
;;     [:div#filler [:p "filler"]]
     ]))

(defn panel []
  [pictures])
