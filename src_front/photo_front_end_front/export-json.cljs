(ns photo-front-end-front.export-json
  (:require [reagent.core :as reagent :refer [atom]]
            [re-com.core :as re]))

(defn dialog-markup
  [form-data process-ok process-cancel]
  [re/border
   :border "1px solid #eee"
   :child  [re/v-box
            :padding  "10px"
            :style    {:background-color "cornsilk"}
            :children [[re/title :label "Welcome to MI6. Please log in" :level :level2]
                       [re/v-box
                        :class    "form-group"
                        :children [[:label {:for "pf-email"} "Email address"]
                                   [re/input-text
                                    :model       (:email @form-data)
                                    :on-change   #(swap! form-data assoc :email %)
                                    :placeholder "Enter email"
                                    :class       "form-control"
                                    :attr        {:id "pf-email"}]]]
                       [re/v-box
                        :class    "form-group"
                        :children [[:label {:for "pf-password"} "Password"]
                                   [re/input-text
                                    :model       (:password @form-data)
                                    :on-change   #(swap! form-data assoc :password %)
                                    :placeholder "Enter password"
                                    :class       "form-control"
                                    :attr        {:id "pf-password" :type "password"}]]]
                       [re/checkbox
                        :label     "Forget me"
                        :model     (:remember-me @form-data)
                        :on-change #(swap! form-data assoc :remember-me %)]
                       [re/line :color "#ddd" :style {:margin "10px 0 10px"}]
                       [re/h-box
                        :gap      "12px"
                        :children [[re/button
                                    :label    "Sign in"
                                    :class    "btn-primary"
                                    :on-click process-ok]
                                   [re/button
                                    :label    "Cancel"
                                    :on-click process-cancel]]]]]])

(defn export-json
  "Create a button to test the modal component for modal dialogs"
  []
  (let [show?       (reagent/atom false)
        form-data      (reagent/atom {:email       "james.bond.007@sis.gov.uk"
                                      :password    "abc123"
                                      :remember-me true})
        save-form-data (reagent/atom nil)
        process-ok     (fn [event]
                         (reset! show? false)
                         (println "Submitted form data: " @form-data)
                         ;; ***** PROCESS THE RETURNED DATA HERE
                         false) ;; Prevent default "GET" form submission (if used)
        process-cancel (fn [event]
                         (reset! form-data @save-form-data)
                         (reset! show? false)
                         (println "Cancelled form data: " @form-data)
                         false)]
    (fn []
      [re/v-box
       :children [[:input {:type "button"
                  :id "json-export"
                  :value "Export JSON"
                  :on-click #(do
                               (reset! save-form-data @form-data)
                               (reset! show? true))}]
         (when @show? [re/modal-panel
                       :backdrop-color   "grey"
                       :backdrop-opacity 0.4
                       :style            {:font-family "Consolas"}
                       :child            [dialog-markup
                                          form-data
                                          process-ok
                                          process-cancel]])]])))
