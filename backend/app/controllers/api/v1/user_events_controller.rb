module Api
  module V1
    class UserEventsController < ApplicationController
      def index
        events = Event.includes(:users)
          .where(user_id: current_user.id)
          .select(:uuid, :name, :event_date, :event_time, :address)
        render json: {
          code: 200,
          data: events
        }, status: :ok
      end

      def update
        event = Event.find_by(uuid: params[:event_id])
        participant = Participant.find_by(user_id: current_user.id, event_id: event.id)

        if participant == nil
          participant = Participant.new do |p|
            p.user_id = current_user.id
            p.event_id = event.id
            p.is_confirmed = false
          end
        end

        participant.update(participant_params)

        render json: {
          code: 204,
          data: {}
        }, status: :no_content
      end

      private

      def participant_params
        params.permit(:is_confirmed)
      end
    end
  end
end
