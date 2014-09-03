Rails.application.routes.draw do

  get 'reviews/create'
  get 'reviews/show'

  get 'login' => 'user_sessions#new', :as => :login
  post 'logout' => 'user_sessions#destroy', :as => :logout

  root :to => 'projects#index'

  resources :user_sessions
  resources :users
  resources :projects, only: [:index, :create, :new, :show] do
    resources :reviews,  only: [:show, :create, :destroy] 
  end

end
