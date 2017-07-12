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

(defn projects []
  (let [pl (map (fn [a] (str/split a #"/")) @project-list)
        years (set (map first pl))]
    [:div
     [:ul
      (for [year years]
        (let [projects (filter (fn [a] (= year (first a))) pl)
              months (set (map second projects))]
          [:li (str year)
           [:ul
            (for [month months]
              (let [mp (filter (fn [a] (= month (second a))) projects)]
                [:li (str month)
                 [:ul
                  (for [project mp]
                    [:li (str (last project))])]]))]]))]]))

(defn root-component []
  [:div
   [:h1 (:message @state)]
   [projects]])

(defn mount-root [setting]
  (reagent/render [root-component]
                  (.getElementById js/document "app")))

(defn init! [setting]
  (mount-root setting))
