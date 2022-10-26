console.log('connect4-Working js file')
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let waitPlayer = 2;

let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array

// 
  // original thought on how to write code, but maybe there is a shorter version
  board.length=HEIGHT;
  for(let i=0; i<HEIGHT; i++){
    board.length=HEIGHT;
    let arr=[];
    arr.length=WIDTH;
    board[i]=arr;
  }
}
//The below code didn't work, tossed and went back to what worked above.
  // board=board[height][width]
// }





/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.createElement("div");
  let gameBoard = document.querySelector("#board");
  gameBoard.append(htmlBoard);


  // TODO: add comment for this code:
  //General reason for this function:
  //This is creating the actual board on the browser. The reason this is being created here and not in the html file is because
  //this will be based on the height and width of the game board variables chosen above, so the board dimensions could be changed very simply with very few changes in the code.

  //Code to English (of code below):
  //step 1:create variable 'top' set to a document element of table-row ('tr')
  //step 2: take variable 'top' and give it an 'id' of 'column-top'
  //step 3: take variable 'top' and add an event listener of 'click', so when this click occurs, the function 'handleClick' will run.
  //All three lines sets up the top row of a table(not individual cells, just the row itself). **See Next Section of code.
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);


  //Code to English:
  //step 4: Taking this through a loop, with a new variable 'x' and iterating through the number of times based on the value of the width. In this example, the width is 7 from a standard connect 4 board.
  //step 5: a new variable is created 'headCell' with a document element of table-data 'td', which is creating the individual cells in this row.
  //step 6: the new variable has the 'id' set to 'x'.
  //step 7: the previous variable 'top' has the immediate variable 'headCell' appended to it.
  //Step 8: that is one interation, this loop goes through 'x' iterations, and in this case 7 iterations because we set the width=7 in the above code, which creates for this purpose, 7 columns, and this is only for the first row, because it needs different 
  //attributes than the rest of the playing board.
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);
  // TODO: add comment for this code
  // Code to Engish:
  // General Description for this Section of Code:
  // Iterating through a loop. With a new variable 'y' and iterating through the number of times based on the value of y. This is creating the number of rows in our playing board. This does not include the top row that is not included in the actual
  //  the playing board. This particular situation, the board height 'y' is 6 rows high because the standard connect 4 game is 6 high. As each row is being created, so is the number of cells in a row. All of this is creating the actual physical table
  // Step 9: Iterating through a loop using 'y' variable. 'y' starts at 0 continuing until 'y' is less than the height, adding 1 value to y at each iteration of the loop.
  // Step 10: a new variable 'row' is created as a document element of table row 'tr'. 
  // Step 11: Another for-loop, a variable 'x' i created, starting at zero, going until the value of the width(# of cells in this row), and adding 1 'x' per iteration. 
  // Step 12: A variable is created as a document element of table data 'td'. 
  // Step 13: The variable 'cell' is having an id-attribute added to it of the iteration 'y'-'x'. This will tie the the virtual game board and the DOM created, phyiscal game board together.
  // Step 14: The individual cell variable is appended to this row through all the iterations of 'x' until the row is completed. Then, the row is over and goes back to the loop of 'y' variables to start over on a new row until 'y' rows is completed,
  //  continuing to append the new rows to the 'htmlBoard' variable until equal to the 'y' variable and the physical game board is complete.


  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
// General Description: In this code, it is only necessary to know if the column is not full. Therefore, you only have to check the top column to see if it is has a piece in it by varifying the 'board' at index [0][x]
// where 0 is the top row of the game board, and x is the cell number based on the 'handleClick' function.
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i=5; i>=0; i--){
    if(board[i][x]===undefined){
      console.log(`findSpotForCol, board[${i}][${x}]`)
      return i
    }else if(board[0][x]===1 || board[0][x]===2){
      console.log(null)
      return (null)
    }
  }
    // }else {
      // return i 
    // }
    // }else if(board[y][x]===undefined){
      // console.log(`findSpotForCol, if#2 ${i}`)
      // return i
    // }else if(board[0][x]){
      // console.log(`findSpotForCol, if#3 ${i}`)
      // return (null)
    // }
  console.log(`findSpotForCol, Y is ${i} & x is${x}`)
  // return i
  }   

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  console.log(`placeInTable Y is ${y} & x is${x}`)
  let piece = document.createElement("div");
  piece.setAttribute("class", `piece-${currPlayer}`);
  let cellSpot= document.getElementById(`${y}-${x}`);
  cellSpot.append(piece);
  board[y][x]=currPlayer;
  console.log(`placeInTable-currently player ${currPlayer}`)

  // TODO: make a div and insert into correct table cell

}

/** endGame: announce game end */
// 
function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
  currPlayer=3;
  waitPlayer=3;
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  // findSpotForCol(x);
  console.log(`handleClick x is ${x}`)
  console.log( `handleClick y is ${y}`)  
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y,x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }else if(board[0].every(function(top){
    return top>0;
  })){
    alert ('You tied!!')
  }else {
    [waitPlayer, currPlayer]=[currPlayer, waitPlayer]
    return currPlayer

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players

  // TODO: switch currPlayer 1 <-> 2
}
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    //I believe this is checking the current cell being played to confirm it is inside the boundaries of the board.
    //Ex. y is less than the height[index], y is the not empty, x is less than the width of the board, & is not empty.
    //and the board position just played is the current player.
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
    console.log('cellsEvery??')
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();






// Rules, all console.log=> must have the function name of where it is located for quick access to find problems/solution