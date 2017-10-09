(ns photo-front-end-front.pictures
  (:require [photo-front-end-front.api
             :refer [highlighted-pic
                     picture-list
                     picture-details
                     thumbnail-directory
                     pic-columns]]
            [photo-front-end-front.keys :refer [bind-keys]]
            [re-com.core :as re]
            [clojure.string :refer [join]]))

(defn pictures []
  ;; Convert the following to get pl from @picture-details
  (let [pl (vec (sort (keys @picture-list)))
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
              {:style {:grid-template-columns (join " " (repeat @pic-columns "1fr"))}}
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
                                    "not-selected"))}]
                    [:div.img-details
                     "***"]]))]]
     [:div#filler [:p "filler"]]]))
