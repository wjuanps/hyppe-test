class CreateParticipants < ActiveRecord::Migration[6.0]
  def change
    create_table :participants do |t|
      t.belongs_to :user
      t.belongs_to :event
      t.boolean :is_confirmed

      t.timestamps
    end
  end
end
