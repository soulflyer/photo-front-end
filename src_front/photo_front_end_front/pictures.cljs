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
  (let [pl (vec (sort (keys @picture-list)))
        _ @highlighted-pic
        _ @current-project
        _ (bind-keys)]
    [re/scroller
     :height "auto"
     :child [:div#pictures
             {:style {:grid-template-columns (join " " (repeat @pic-columns "1fr"))}}
             (for [index (range (count pl))]
               (let [pic (get pl index)
                     pic-id (image-id pic)
                     details (first (filter (fn [x] (= pic-id (x "_id"))) @picture-details))]
                 [re/v-box
                  :class (str "img-container "
                              (if (= @highlighted-pic index)
                                "highlighted"
                                "not-highlighted")
                              " pic" index)
                  :attr {:on-double-click
                         #(if (@picture-list pic)
                            (swap! picture-list assoc pic false)
                            (swap! picture-list assoc pic true))
                         :on-click #(reset! highlighted-pic index)
                         :tabIndex "0"}
                  :children [[re/h-box
                              :justify :between
                              :class "img-details"
                              :children
                              [[:p.name (details "Version")]
                               [:p.rating (stars (js/parseInt (details "Rating")))]]]
                             [re/box
                              :size "1 0 400"
                              :child [:img
                                      {:src (str @medium-directory "/" pic)
                                       :class (str (if (@picture-list pic)
                                                     "selected"
                                                     "not-selected"))}]]
                             [re/box
                              :class "img-details-bottom"
                              :child [:p.keywords (join "," (details "Keywords"))]]]]))]]))

(defn panel []
  [pictures])
