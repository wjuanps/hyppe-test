module Api
  module V1
    class CreateUserController < ApplicationController
      skip_before_action :authenticate_request

      def create
        user = User.create(user_params) do |u|
          u.uuid = SecureRandom.uuid
        end

        user.email.downcase!

        if user.save
          render json: { code: 201, data: {uuid: user.uuid} }, status: :created
        else
          render json: { code: 422, data: user.errors }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.permit(:name, :email, :password)
      end
    end
  end
end
