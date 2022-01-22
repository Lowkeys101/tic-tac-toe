// Tic-tac-toe game, implemented with as little global code as possible 

const gameBoard = (function gameBoard() {

    let gameBoardArray = [...Array(9).fill("")];


    function clearBoard() {
        gameBoardArray = [...Array(9)].fill("");
    }

    function getBoard() {
        return gameBoardArray;
    }

    function cellEmpty(index) {
        // return !!gameBoardArray[index];
        return !(gameBoardArray[index] === "X" || gameBoardArray[index] === "O");
    }

    function isWinning() {
        if ((gameBoardArray[0] === gameBoardArray[1] && gameBoardArray[1] === gameBoardArray[2] && (!cellEmpty(2)))  || // check rows
            (gameBoardArray[3] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[5] && (!cellEmpty(5)))  ||
            (gameBoardArray[6] === gameBoardArray[7] && gameBoardArray[7] === gameBoardArray[8] && (!cellEmpty(8)))  ||

            (gameBoardArray[0] === gameBoardArray[3] && gameBoardArray[3] === gameBoardArray[6] && (!cellEmpty(6)))  || // check columns
            (gameBoardArray[1] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[7] && (!cellEmpty(7)))  ||
            (gameBoardArray[2] === gameBoardArray[5] && gameBoardArray[5] === gameBoardArray[8] && (!cellEmpty(8)))  ||

            (gameBoardArray[0] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[8] && (!cellEmpty(8)))  || // check diagonals
            (gameBoardArray[2] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[6] && (!cellEmpty(6)))  
        ){
            return true;
        }
        return false;
    }

    function isFull() {
        let full = true;
        gameBoardArray.forEach(cell => {
            if (cell !== "X" && cell !== "O") {
                full = false;
            }
        });
        return full;
    }

    function modifyGameboard(index, symbol) {
        gameBoardArray[index] = symbol;
    }

    return {clearBoard, cellEmpty, isWinning, isFull, modifyGameboard, getBoard, clearBoard};
})();

function createPlayer(name, playerSymbol) {

    return {name, playerSymbol};

}


const displayController = (function displayController() {
    const gamecells = document.querySelectorAll(".gamecell");
    const startButton = document.querySelector(".start-button");
    const restartButton = document.querySelector(".restart-button");
    const display = document.querySelector(".display");
    const player1InputField = document.querySelector("#player1-name");
    const player2InputField = document.querySelector("#player2-name");

    let player1;
    let player2;

    let currentTurnPlayer = true;
    
    function renderBoard (board) {
        gamecells.forEach(cell => {
            index = cell.dataset.cellIndex - 1; // -1 since html dataset attributes started counting from 1 instead of 0
            cell.textContent = board[index]
        });    
    }

    function handleCellClick(e) {
        // check if empty cell
        if(gameBoard.cellEmpty(e.target.dataset.cellIndex - 1)) {
            if (currentTurnPlayer) {
                gameBoard.modifyGameboard(e.target.dataset.cellIndex - 1, "X")
                e.target.textContent = "X";
                currentTurnPlayer = !currentTurnPlayer;
            } else {
                gameBoard.modifyGameboard(e.target.dataset.cellIndex - 1, "O")
                e.target.textContent = "O";
                currentTurnPlayer = !currentTurnPlayer;
            }
        }

        // check if winning
        if (gameBoard.isWinning()) {
            if (!currentTurnPlayer) {
                display.textContent = `Congratulations ${player1.name} has won!`;
            } else {
                display.textContent = `Congratulations ${player2.name} has won!`;
            }
        } else if (gameBoard.isFull()) {
            display.textContent = "It's a draw!";
        }

    }

    function handleStartButton() {
        addCellListeners();
        gameBoard.clearBoard();
        renderBoard(gameBoard.getBoard());
        currentTurnPlayer = true;
        display.textContent = "You can play now";
        player1 =  createPlayer(player1InputField.value, "X");
        player2 =  createPlayer(player2InputField.value, "O");       
    }

    function handleRestartButton() {
        gameBoard.clearBoard();
        renderBoard(gameBoard.getBoard());
        currentTurnPlayer = true;
        display.textContent = "You can play now";
    }

    function addCellListeners() {
        gamecells.forEach(cell => {
            cell.addEventListener("click", handleCellClick)
        });
    }

    function addButtonListeners() {
        startButton.addEventListener("click", handleStartButton);
        restartButton.addEventListener("click", handleRestartButton);
    }

    addButtonListeners();    
})();


