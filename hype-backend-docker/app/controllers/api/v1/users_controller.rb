module Api
  module V1
    class UsersController < ApplicationController
      def show
        events = Participant
          .select("events.uuid, is_confirmed")
          .joins(:user, :event)
          .where(participants: { user_id: current_user.id })
        render json: { 
          code: 200,
          data: {
            uuid: current_user.uuid,
            name: current_user.name,
            email: current_user.email,
            events: events
          } 
        }, status: :ok
      end
    end
  end
end
