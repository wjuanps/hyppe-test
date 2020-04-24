Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      post 'authenticate', to: 'authentication#authenticate'
      post 'users/create', to: 'create_user#create'

      get 'user/events', to: 'user_events#index'
      get 'user/events/:uuid', to: 'user_events#show'
      put 'user/events/:event_id', to: 'user_events#update'

      resources :users
      resources :events
      resources :participants
    end
  end
end
