// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// import Rails from "@rails/ujs"
// import Turbolinks from "turbolinks"
// import * as ActiveStorage from "@rails/activestorage"
// import "channels"
//
// Rails.start()
// Turbolinks.start()
// ActiveStorage.start()
//
// import "controllers"



//////////////////////////////////////////////////
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import { Turbo } from "@hotwired/turbo-rails";
import * as ActiveStorage from "@rails/activestorage";
import "channels";

Rails.start();
ActiveStorage.start();

// require("trix");
// require("@rails/actiontext");
// import "trix/dist/trix.css";

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
//const images = require.context('../images', true)
//const imagePath = (name) => images(name, true)

// import "line-awesome/dist/line-awesome/css/line-awesome.css";
import "./stylesheets.css";
//import "./pagination.css";

// Flatpickr - datetime picking
//import "flatpickr/dist/flatpickr.css";
//import "flatpickr/dist/themes/airbnb.css";
//import flatpickr from "flatpickr";

// Tippy - tooltips/popovers
//import "tippy.js/dist/tippy.css";
//import "tippy.js/themes/light-border.css";

// Debounced
//import debounced from "debounced";
//debounced.initialize();

import { Application } from "@hotwired/stimulus";
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers";
// import StimulusReflex from "stimulus_reflex";
import consumer from "../channels/consumer";

const application = Application.start();
const context = require.context("../controllers", true, /_controller\.js$/);
application.load(definitionsFromContext(context));
// StimulusReflex.initialize(application, { consumer });

import "controllers"
