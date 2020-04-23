module Api
  module V1
    class UsersController < ApplicationController

      skip_before_action :authenticate_request

      def index
        users = User.order("created_at DESC");
        render json: { code: 200, data:users }, status: :ok
      end

      def show
        user = User.where(uuid: params[:id])
          .select(:uuid, :name, :email).take
        render json: { code: 200, data: user }, status: :ok
      end

      def create
        user = User.create(user_params) do |u|
          u.uuid = SecureRandom.uuid
        end

        user.email.downcase!

        if user.save
          render json: { code: 201, data:user }, status: :created
        else
          render json: { code: 422, data:user.errors }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.permit(:name, :email, :password)
      end
    end
  end
end
