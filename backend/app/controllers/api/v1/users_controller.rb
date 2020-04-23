module Api
  module V1
    class UsersController < ApplicationController
      def show
        render json: { 
          code: 200,
          data: {
            uuid: current_user.uuid,
            name: current_user.name,
            email: current_user.email
          } 
        }, status: :ok
      end
    end
  end
end
