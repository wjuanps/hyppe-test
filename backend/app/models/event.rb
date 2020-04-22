class Event < ApplicationRecord
  validates :name, presence: true
  validates :event_date, presence: true
  validates :address, presence: true

  has_many :participants
  has_many :users, through: :participants
end
