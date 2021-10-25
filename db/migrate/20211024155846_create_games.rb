class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :title
      t.integer :row
      t.integer :col
      t.integer :status, default: 0
      t.boolean :win, default: false

      t.timestamps
    end
  end
end
