class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.belongs_to :user

      t.string :uuid
      t.string :name
      t.date :event_date
      t.time :event_time
      t.string :address

      t.timestamps
    end
  end
end
