class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :uuid
      t.string :name
      t.string :email
      t.string :senha

      t.timestamps
    end
  end
end