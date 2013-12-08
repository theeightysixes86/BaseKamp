BaseKamp::Application.routes.draw do
  root to: "sessions#new"

  resource :session
  resources :static_pages, only: [:index]
  resources :projects, only: [:update]

  post "user_exists", to: "users#user_exists"
end
