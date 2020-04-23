class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.belongs_to :user
      t.string :uuid
      t.string :name
      t.datetime :event_date
      t.string :address

      t.timestamps
    end
  end
end
