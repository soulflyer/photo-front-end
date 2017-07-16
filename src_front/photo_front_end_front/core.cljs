(ns photo-front-end-front.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require  [reagent.core :as reagent :refer [atom]]
             [cljs-http.client :as http]
             [cljs.core.async :refer [<!]]
             [cljs.reader :as reader]
             [clojure.string :as str]))

(defonce state (atom {:message "Photo Projects"}))

(def project-list (reagent/atom {}))
(go (let [response (<! (http/get "http://localhost:31000/api/projects"))]
      ;; (js/console.log (:body response)
      (reset! project-list (reader/read-string (:body response)))))

(defn project-map [project-string]
  {:year "2017"
   :month "05"
   :project "11-Plane"})

(defn project-vector [project-string]
  [(subs project-string 0 4)
   (subs project-string 4 6)
   (subs project-string 6)])

(def project-message (reagent/atom ""))
(defn open-project [pr]
  (go (let [[year month project] (project-vector pr)
            response (<! (http/get
                           (str "http://localhost:31000/api/open/project/"
                                year "/" month "/" project )))]
        (reset! project-message (:body response)))))

(defn projects []
  (let [pl (map (fn [a] (str/split a #"/")) @project-list)
        years (sort (set (map first pl)))]
    [:div
     [:ol#menutree
      (for [year years]
        (let [projects (filter (fn [a] (= year (first a))) pl)
              months   (sort (set (map second projects)))
              yr       (str year)]
          [:li
           [:label {:for yr
                    :class "menu_label"} yr]
           [:input {:type "checkbox"
                    :id yr}]
           [:ol
            (for [month months]
              (let [mp (filter (fn [a] (= month (second a))) projects)
                    mo (str month)]
                [:li
                 [:label {:for (str yr mo)
                          :class "menu_label"} mo]
                 [:input {:type "checkbox"
                          :id (str yr mo)}]
                 [:ol
                  (for [project mp]
                    (let [pr (str (last project))
                          proj (str yr mo pr)]
                      [:li {:class "page"}
                       [:input {:type "button"
                                :value proj
                                :id proj
                                :on-click #(open-project proj)}]]))]]))]]))]
     [:p (str @project-message)]]))

(defn root-component []
  [:div
   [projects]])

(defn mount-root [setting]
  (reagent/render [root-component]
                  (.getElementById js/document "app")))

(defn init! [setting]
  (mount-root setting))
