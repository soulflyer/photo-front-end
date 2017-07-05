(ns photo-front-end-front.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require  [reagent.core :as reagent :refer [atom]]
             [cljs-http.client :as http]
             [cljs.core.async :refer [<!]]
             [cljs.reader :as reader]))

(defonce state (atom {:message "Photo Projects"}))

(def project-list (reagent/atom ""))
(go (let [response (<! (http/get "http://localhost:31000/api/projects"))]
      ;; (js/console.log (:body response)
      (reset! project-list (:body response))))

(defn projects []
  [:ul
   (for [project (reader/read-string @project-list)]
     [:li project])])

(defn root-component []
  [:div
   [:h1 (:message @state)]
   [projects]])

(defn mount-root [setting]
  (reagent/render [root-component]
                  (.getElementById js/document "app")))

(defn init! [setting]
  (mount-root setting))
