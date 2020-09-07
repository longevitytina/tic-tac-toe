//TicTacToe

var readline = require("readline");
const { question } = require("readline-sync");

const game = {
  player: "x",
  gameBoard: [
    ["0,0", "1,0", "2,0"],
    ["0,1", "1,1", "2,1"],
    ["0,2", "1,2", "2,2"],
  ],

  printBoard() {
    this.gameBoard.forEach((row) => {
      console.log(row);
    });
  },

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
    // - Handle errors / bad user input
    // - Bonus: make an A.I
    this.question();
  },
  question() {
    this.printBoard();
    const answer = question(`select a tile player ${this.player} `);

    const [x, y] = answer.split(",");
    this.choose(x, y);
  },
  choose(x, y) {
    this.gameBoard[y][x] = this.player;
    if (this.checkWin()) {
      console.log(`Player ${this.player} wins!`);
      this.printBoard();
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
    for (let i = 0; i < this.gameBoard.length; i++) {
      const count = [];
      for (let j = 0; j < this.gameBoard[i].length; j++) {
        count.push(this.gameBoard[j][i]);
      }
      if (count.every((columnIndex) => this.player === columnIndex)) {
        return true;
      }
    }
    return false;
  },

  checkDiagonal() {
    // Start by assuming that the player is goin to win
    let isWin = true;
    for (let i = 0; i < this.gameBoard.length; i++) {
      // if the player does not meet the conditions to win, set isWin to false
      if (this.gameBoard[i][i] !== this.player) isWin = false;
    }
    if (isWin) return true;

    isWin = true;
    for (let i = 0; i < this.gameBoard.length; i++) {
      if (this.gameBoard[this.gameBoard.length - 1 - i][i] !== this.player)
        isWin = false;
    }
    return isWin;
  },
};

game.init();
