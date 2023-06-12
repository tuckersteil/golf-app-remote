Rails.application.routes.draw do
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/users", to: "users#index"
  delete "/users/:id", to: "users#destroy"
  get "/teetimes/book/:id", to: "teetimes#hello"
  get "/teetimes/time/:id", to: "teetimes#time"
  get "/users/time", to: "users#usertime"
  get "courses/word/:word", to: "courses#wordy"
  resources :teetimes
  resources :courses
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "courses#index"
end
