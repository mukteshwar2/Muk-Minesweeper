# frozen_string_literal: true

class CreateCells < ActiveRecord::Migration[6.1]
  def change
    create_table :cells do |t|
      t.integer :game_id
      t.integer :cell_no
      t.string :state
      t.boolean :mine_cell
      t.integer :row_data
      t.integer :col_data

      t.timestamps
    end
    add_index :cells, :game_id
  end
end
