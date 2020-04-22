class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :uuid
      t.string :name
      t.datetime :date_time
      t.string :address

      t.timestamps
    end
  end
end
