BaseKamp::Application.routes.draw do
  root to: "sessions#new"

  resource :session
  resources :static_pages, only: [:index]
  resources :projects, only: [:update, :create, :show] do
    member do
      get "associations", to: "projects#associated_info", as: "associated_info"
      resources :discussions, except: [:create]
      resources :todos
    end
  end

  resources :discussions, only: [:create]

  post "user_exists", to: "users#user_exists"
end
