import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "message", "cell_no", "status", "near_mines_count", "submit"]

  connect() {

  }

  onCellClick(event){

    if(this.messageTarget.innerText.length > 0){
      return;
    }

    const square = event.currentTarget;
    if (square.classList.contains('mine-in-cell')) {
      document.querySelectorAll('.mine-in-cell').forEach((cell) => {
        cell.classList.remove('mine-in-cell', 'covered');
        cell.classList.add('mine');
        this.cell_noTarget.value = this.cell_noTarget.value + "," +cell.dataset.id;
      });
      this.messageTarget.innerText="Sorry your lost the game ☹. Better luck next time"
      this.statusTarget.value = "1";
    } else {
      this.open(square);
    };

    this.submitTarget.click();
  }

  // function that returns the result of the querySelector for all adjacent cells
  surrounding(td, X, Y){
    const column = td.cellIndex;
    const row = td.parentElement.rowIndex;
    return document.querySelector(`[data-column="${column + X}"][data-row="${row + Y}"]`);
  }

// function to search the surrounding cells for mines
// only returns 1 if n exists and n has the class of has mine
  increaseAdjacent(td, X, Y){
    const n = this.surrounding(td, X, Y);
    if (n && n.classList.contains('mine-in-cell')) {
      return 1;
    }
    return 0;
  }

// iterates over every adjacent cell, incrementing mines if a mine is found adjacent
  open(square){
    let mines = 0;

    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        if (x !== 0 || y !== 0) {
          mines += this.increaseAdjacent(square, x, y);
        }
      }
    }
    // depending on the number of mines found it either opens the cell/ add a class or remove covered
    if (mines === 0) {
      square.classList.add('opened');
    } else {
      square.classList.add('opened');
      square.innerText = mines
      this.near_mines_countTarget.value = this.near_mines_countTarget.value + ',' +`{${square.dataset.id}: '${mines}'}`
    }
    square.classList.remove('covered');
    this.cell_noTarget.value = this.cell_noTarget.value + "," +square.dataset.id;

    // iterating over adjacent cells to find if any near mines and this is where the multiple cells can be opneded at once
    if (mines === 0) {
      for (let x = -1; x <= 1; x += 1) {
        for (let y = -1; y <= 1; y += 1) {
          if (x !== 0 || y !== 0) {
            const n = this.surrounding(square, x, y);
            if (n && n.classList.contains('covered')) {
              this.open(n);
            }
          }
        }
      }
    }

    return mines;
  }

  // add the class of flagged to a cell which applies the classlist 'flagged'
  setFlag(event) {
    event.preventDefault();
    const square = event.currentTarget;
    if (square.classList.contains('covered')) {
      square.classList.add('flagged');
    }
  }
}
