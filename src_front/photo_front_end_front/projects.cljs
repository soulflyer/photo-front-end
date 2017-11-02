(ns photo-front-end-front.projects
  (:require [clojure.string :as str]
            [photo-front-end-front.api :refer [open-project
                                               project-list
                                               load-picture-list]]
            [re-com.core :as re]))

(defn projects []
  (let [pl (map (fn [a] (str/split a #"/")) @project-list)
        years (sort (set (map first pl)))]
    [re/scroller
     :attr {:id "projects"}
     :v-scroll :on
     :h-scroll :off
     :height "95vh"
     :child [:ol#menutree
      (for [year years]
        (let [projects (filter (fn [a] (= year (first a))) pl)
              months   (sort (set (map second projects)))
              yr       (str year)]
          [:li
           [:input {:type "checkbox"
                    :id yr}]
           [:label {:for yr
                    :class "menu_label"} yr]
           [:ol
            (for [month months]
              (let [mp (filter (fn [a] (= month (second a))) projects)
                    mo (str month)]
                [:li
                 [:input {:type "checkbox"
                          :id (str yr mo)}]
                 [:label {:for (str yr mo)
                          :class "menu_label"} mo]
                 [:ol
                  (for [project mp]
                    (let [pr (str (last project))
                          proj (str yr mo pr)]
                      [:li {:class "page"}
                       [:input {:type "button"
                                :value pr
                                :id proj
                                :on-focus #(load-picture-list (str yr "/" mo "/" pr))
                                ;;:on-click #(open-project yr mo pr)
                                }]]))]]))]]))]]))

(defn panel []
  [projects])
