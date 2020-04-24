module Api
  module V1
    class EventsController < ApplicationController
      def index
        events = Event.select(:uuid, :name, :event_date, :address)
        render json: { code: 200, data: events }, status: :ok
      end

      def show
        event = Event.where(uuid: params[:id])
          .select(:uuid, :name, :event_date, :address).take
        render json: { code: 200, data: event }, status: :ok
      end

      def update
        event = Event.where(uuid: params[:id], user_id: current_user.id).take
        event.update(event_params)
        render json: {
          code: 201, data: {
            uuid: event.uuid,
            name: event.name,
            date: event.event_date,
            address: event.address
          }
        }, status: :created
      end

      def destroy
        event = Event.where(uuid: params[:id], user_id: current_user.id).take
        event.destroy
        render json: { code: 204, data: event }, status: :no_content
      end

      def create
        event = Event.create(event_params) do |e|
          e.user_id = current_user.id
          e.uuid = SecureRandom.uuid
        end

        if event.save
          render json: {
            code: 201, data: {
              uuid: event.uuid,
              name: event.name,
              date: event.event_date,
              address: event.address
            }
          }, status: :created
        else
          render json: { 
            code: 422,
            data: event.errors
          }, status: :unprocessable_entity
        end
      end

      private

      def event_params
        params.permit(:name, :event_date, :address)
      end
    end
  end
end
