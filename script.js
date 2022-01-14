// Tic-tac-toe game, implemented with as little global code as possible 

// {Player1 clicks cell
//     Check if cell empty
//     Check if game over or no more empty cells. END LOOP.
//     Player2 clicks cell
//     Check if cell empty
//     Check if game over or no more empty cells. END LOOP
//     } loop 
    
//     Clear cells play again.


// TODO: Create Gameboard module to store gameboard state
const gameBoard = (function gameBoard() {

    let gameBoardArray = ["X", "O", "O", "X", "X", "X", "X", "O", "X"];

    function renderBoard (board) {

        // gameboardArray = ["O", "X", "O", "", "", "", "X", "O", "X"];
        const gamecells = document.querySelectorAll(".gamecell");
    
        gamecells.forEach(cell => {
            index = cell.dataset.cellIndex - 1; //since dataset attributes started counting from 1 instead of 0
            cell.textContent = board[index]
        });    
    }

    function clearBoard() {
        renderBoard([...Array(9)].fill(""));
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

    return {clearBoard, renderBoard, cellEmpty, isWinning, isFull, gameBoardArray};
})();

// TODO: Create Player modules
function createPlayer(playerSymbol) {

    return {playerSymbol};

}

// TODO: Create module to control gamestate

const playgame = (function playGame() {
    const player1 = createPlayer("X");
    const player2 = createPlayer("O");

    let currentTurnPlayer1 = true;

    gameBoard.clearBoard();    
})();

const displayController = (function displayController() {
    const gamecells = document.querySelectorAll(".gamecell");

    function handleClick(e) {
        // CHECK IF EMPTY CELL
        // CHECK IF WINNING OR NO MORE CELLS
        e.target.textContent = "X";
    }
    gamecells.forEach(cell => {
        cell.addEventListener("click", handleClick)
    });

})();


