//TicTacToe
// play on terminal, print the gameBoard after every turn
// change the player after every turn
//      keep track of who is playing
// replace the tile selected with x or o
// game over when three in a row or all tiles are filled

// gamestart function
//      prompts to select a tile

var readline = require("readline");
const { question } = require("readline-sync");

const game = {
  player: "x",
  gameBoard: [
    // ["x", "1,0", "x"],
    // ["o", "x", "2,1"],
    // ["x", "o", "o"],
    ["0,0", "1,0", "2,0"],
    ["0,1", "1,1", "1,2"],
    ["0,2", "1,2", "2,2"],
  ],
  togglePlayer() {
    if (this.player === "x") {
      this.player = "o";
    } else {
      this.player = "x";
    }
    console.log(`player ${this.player} turn`);
  },

  init() {
    //starts game, displays board, initializes first move, continues game until winner is found
    // TODO:
    // - Repeat turns
    // - Handle errors / bad user input
    // - Bonus: make an A.I
    this.question();
  },
  question() {
    console.log(this.gameBoard);
    const answer = question(`select a tile player ${this.player} `);

    const [x, y] = answer.split(",");
    // console.log(y, x);
    this.choose(x, y);
  },
  // use rl.question to replace numbered tile with current player's symbol(x or o)
  choose(x, y) {
    this.gameBoard[y][x] = this.player;
    if (this.checkWin()) {
      console.log(`Player ${this.player} wins!`);
      console.log(this.gameBoard);
      process.exit();
    } else {
      this.togglePlayer();
      this.question();
    }
  },

  checkWin() {
    return (
      this.checkHorizontal() || this.checkVertical() || this.checkDiagonal()
    );
  },

  checkHorizontal() {
    // Check if all elements in array match to player
    return this.gameBoard.some((row, index) => {
      const win = row.every((element) => element === this.player);
      if (win) console.log(`row ${index} wins`);
      return win;
    });
  },

  checkVertical() {
    let count = [];
    for (let i = 0; i < this.gameBoard.length; i++) {
      for (let j = 0; j < this.gameBoard[i].length; j++) {
        if (this.gameBoard[j][i] === this.player) {
          count.push(i);
        }
      }
    }
    // console.log(count);
    // check if all index(colums) are the same
    if (count.length >= 3) {
      return count.every((columnIndex) => count[0] === columnIndex);
    } else {
      return false;
    }
  },

  checkDiagonal() {
    // gameBoard: [
    //   ["x", "o", "x"], 0,0 1,0 2,0    0,0 1,1 0,2
    //   ["0,1", "x", "2,1"],
    //   ["0,2", "1,2", "2,2"],
    // ],
    // 0,0  1,1  2,2
    // 2,0  1,1 0,2
    // if columns have all different x or y coordinates
    console.log(this.gameBoard);
    let count = [];
    // You copied this from your checkVertical method, but there's tiny (but important) thing you need to change
    for (let i = 0; i < this.gameBoard.length; i++) {
      for (let j = 0; j < this.gameBoard[i].length; j++) {
        console.log(this.gameBoard[i][j]);
        if (this.gameBoard[i][j] === this.player) {
          // push coordinates, sort and return true if specific sequence is met
          // 0,0  1,1  2,2, || 2,0  1,1 0,2
          // 00 02 11 20 22
          count.push(j, i);
        }
      }
    }
    // Start by assuming that the player is goin to win
    let isWin = true;
    for (let i = 0; i < this.gameBoard.length; i++) {
      // if the player does not meet the conditions to win, set isWin to false
      if (this.gameBoard[i][i] !== this.player) isWin = false;
    }
    if (isWin) return true;

    isWin = true;
    for (let i = 0; i < this.gameBoard.length; i++) {
      if (this.gameBoard[this.gameBoard.length - 1 - i][i] === this.player)
        isWin = false;
    }
    return isWin;

    // let isWin = true
    // let i = 0
    // let j = 2
    // while (i < this.gameBoard.length) {
    //   if (this.gameBoard[i++][j--] !== this.player) isWin = false;
    // }
    // return isWin;

    // if (count.length >= 3) {
    //   console.log(count);
    //   // Think of all the possible permutations of three items
    //   return (
    //     count === [0, 0, 1, 1, 2, 2] || count === [2, 0, 1, 1, 0, 2]
    //     // count[0] != count[1] && count[0] != count[2] && count[1] != count[2]
    //   );
    // } else {
    //   return false;
    // }
  },
};

// console.log(game.checkDiagonal());
// console.log(game.checkWin());
// console.log(game.checkVertical());
// console.log(game.checkHorizontal());
game.init();

//create input function
//  make it synchr.w/ promises, async await
