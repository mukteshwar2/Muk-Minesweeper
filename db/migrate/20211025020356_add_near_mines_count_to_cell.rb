# frozen_string_literal: true

class AddNearMinesCountToCell < ActiveRecord::Migration[6.1]
  def change
    add_column :cells, :near_mines_count, :integer, default: 0
  end
end
