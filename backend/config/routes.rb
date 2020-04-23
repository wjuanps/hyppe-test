Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      post 'authenticate', to: 'authentication#authenticate'

      get 'user/events', to: 'user_events#index'

      resources :users
      resources :events
      resources :participants
    end
  end
end
