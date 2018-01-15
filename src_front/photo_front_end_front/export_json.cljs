(ns photo-front-end-front.export-json
  (:require [reagent.core :as reagent :refer [atom
                                              create-class]]
            [re-com.core :as re]
            [photo-front-end-front.api :refer [project-message
                                               export-json]]))
(def show?     (reagent/atom false))
(def form-data (reagent/atom {:centre "Alpha"
                              :filename "today"}))
(def save-form-data (reagent/atom nil))

(defn dialog-markup
  [form-data process-ok process-cancel]
  (reagent/create-class
    {:component-did-mount
     #(.focus (.getElementById js/document  "json-export"))
     :reagent-render
     (fn []
       [:div#modal
        [:h2 "Export Json"]
        [:label {:for "dive-centre"} "Dive centre"]
        [re/input-text
         :model (:centre @form-data)
         :id "dive-centre"
         :on-change #(swap! form-data assoc :centre %)]
        [:label {:for "file-name"} "File name"]
        [re/input-text
         :model (:filename @form-data)
         :id "file-name"
         :on-change #(swap! form-data assoc :filename %)]
        [:div#buttons
         [:input {:type     "button"
                  :value    "Export JSON"
                  :id       "export-json-button"
                  :class    "modal-button"
                  :on-click process-ok}]
         [:input {:type     "button"
                  :value    "Cancel"
                  :id       "cancel-button"
                  :class    "modal-button"
                  :on-click process-cancel}]]])}))

(defn export-json-button
  "Create a button to test the modal component for modal dialogs"
  []
  (let [process-ok     (fn [event]
                         (reset! show? false)
                         (export-json (:centre @form-data) (:filename @form-data))
                         false) ;; Prevent default "GET" form submission (if used)
        process-cancel (fn [event]
                         (reset! form-data @save-form-data)
                         (reset! show? false)
                         false)]
    ;;^{:doc "hello"}
    (fn []
      [re/h-box
       :children [[:input {:type "button"
                           :id "json-export"
                           :value "Export JSON"
                           :on-click #(do
                                        (reset! save-form-data @form-data)
                                        (reset! show? true))}]
                  (when @show?
                    [re/modal-panel
                     :wrap-nicely? false
                     :backdrop-color   "grey"
                     :backdrop-opacity 0.6
                     :backdrop-on-click process-cancel
                     :child [dialog-markup
                             form-data
                             process-ok
                             process-cancel]])]])))
