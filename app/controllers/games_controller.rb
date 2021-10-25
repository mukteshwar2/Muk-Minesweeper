# frozen_string_literal: true

class GamesController < ApplicationController
  def index
    @row = 10
    @col = 10
    @game = Game.where(status: 0).last
    @cells = @game.present? ? load_game : new_game
  end

  def update
    @game = Game.find(params[:game][:id])

    # update for opened cells
    cells = params[:game][:cell][:cell_no].split(',').reject(&:empty?)
    @game.cells.where(cell_no: cells.uniq).update_all(state: 'opened')

    # update near mines of adjacent cells
    near_mines_count = params[:game][:cell][:near_mines_count].split(',').reject(&:empty?)
    near_mines_count = near_mines_count.map { |h| YAML.safe_load(h) }.reduce(:merge)
    near_mines_count&.each { |k, v| @game.cells.where(cell_no: k).update(near_mines_count: v) }

    # update game status 1=game finished
    @game.update(status: params[:game][:status])
  end

  # create_grid
  def new_game
    number_of_mines = ((@row * @col) * 15) / 100 # number of mines allowed 15%
    mine_cells = []
    @game = Game.create(title: 'New Game', row: @row, col: @col)
    # get random cell numbers for mines
    loop do
      rand_mine_cell_number = rand(1..(@row * @col)) # random cell number for mines
      mine_cells << rand_mine_cell_number unless mine_cells.include?(rand_mine_cell_number)
      # when total number of mines allowed has been taken randomly, then exit the while loop
      break if mine_cells.size >= number_of_mines
    end

    cell = {}
    id = 1
    # new game cell attributes
    (1..@row).each do |x|
      (1..@col).each do |y|
        key = "cell_#{x}_#{y}"
        cell[key] = {
          'id' => id,
          'state' => 'covered',
          'mine-in-cell' => mine_cells.include?(id) ? 'mine-in-cell' : '',
          'near_mines_count' => '0'
        }
        @game.cells.create(cell_no: id, state: 'covered', mine_cell: mine_cells.include?(id), row_data: x, col_data: y)
        id += 1
      end
    end
    cell
  end

  def load_game
    cell = {}
    @game.cells.order(cell_no: :asc).each do |c|
      key = "cell_#{c.row_data}_#{c.col_data}"
      cell[key] = {
        'id' => c.cell_no,
        'state' => c.state,
        'mine-in-cell' => c.mine_cell ? 'mine-in-cell' : '',
        'near_mines_count' => c.near_mines_count
      }
    end
    cell
  end
end
