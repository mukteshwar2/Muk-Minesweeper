# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'games#index', as: :approot
  resource :game, only: %i[index update]

  # You can have the root of your site routed with map.root -- just remember to delete public/index.html.
  # map.root :controller => "games", :action => 'new'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
