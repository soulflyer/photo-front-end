(ns photo-front-end-front.projects
  (:require [clojure.string :as str]
            [photo-front-end-front.api :refer [open-project project-list]]))

(defn projects []
  (let [pl (map (fn [a] (str/split a #"/")) @project-list)
        years (sort (set (map first pl)))]
    [:div#projects
     [:ol#menutree
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
                                :on-click #(open-project yr mo pr)}]]))]]))]]))]]))
