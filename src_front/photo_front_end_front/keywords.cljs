(ns photo-front-end-front.keywords
  (:require [re-com.core :as re]))

(defn keywords []
  [re/scroller
   :size "auto"
   :height "300px"
   :v-scroll :auto
   :child [re/v-box
           ;;:size "auto"
           :height "300px"
           :children [[:p "hello"]
                      [:p "hello"]
                      [:p "hello"]
                      [:p "hello"]
                      [:p "hello"]
                      [:p "hello"]
                      [:p "hello"]
                      [:p "hello"]
                      [:p "hello"]
                      [:p "hello"]
                      [:p "hello"]
                      [:p "hello"]]]])

(defn panel []
  [keywords])
