function createBoard(){
    const board = []
    for (let i = 0; i < 3; i++){
        const row = []
        for (let n = 0; n < 3; n++){
            row.push(0)
        }
        board.push(row)
    }
    return board;
}

//function to set the player input on the board
function gameEngine(a, b){
    const board = createBoard()
    let player1obj = {name: a, identifier: "X"}
    let player2obj = {name: b, identifier: "O"}
    let activePlayer = player1obj
    let turn = document.querySelector(".turn")
        turn.textContent = `It's ${activePlayer.name}'s turn`

    function switchPlayer(){
        activePlayer = activePlayer === player1obj ? player2obj : player1obj
        turn.textContent = `It's ${activePlayer.name}'s turn`
    }

    function playRound(row, column, button){
        board.textContent = ''
        if (board[row][column] === 0){
            board[row][column] = activePlayer.identifier
            console.log(JSON.parse(JSON.stringify(board)))
            button.textContent = activePlayer.identifier
            if (checkWin(row, column)) {
                console.log(`🎉 Player ${activePlayer.name} wins!`);
                let result = document.querySelector(".result")
                result.textContent = `🎉 ${activePlayer.name} Wins!`
                return;
            }
        
            if (checkTie()) {
                console.log("🤝 It's a tie!");
                let result = document.querySelector(".result")
                result.textContent = `🤝 It's a tie!`
                return;
            }
            switchPlayer()

            function checkWin(row, column) {
                const id = activePlayer.identifier;
            
                if (board[row].every(cell => cell === id)) return true;
            
                if (board.every(r => r[column] === id)) return true;
            
                if (row === column && board.every((r, i) => r[i] === id)) return true;
            
                if (row + column === 2 && board.every((r, i) => r[2 - i] === id)) return true;
            
                return false;
            }
            
            function checkTie() {
                return board.flat().every(cell => cell !== 0);
            }
        }else {
            console.log("Cell already taken")
        }
    }
    return playRound
}
function displayWebGame(){
    let player = document.querySelector(".player")
    let oppPlayer = document.querySelector(".oppPlayer")
    let btn = document.querySelector("button")
    let game;
    btn.addEventListener('click', () => {
        const p1 = player.value || "Player"
        const p2 = oppPlayer.value || "Opponent"
        game = gameEngine(p1, p2)
        })
    const webBoard = document.querySelector(".board")
    const board  = createBoard()
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const webCell = document.createElement("button")
            webCell.classList = "webCell"
            webCell.style.border = `1px solid #FBFEE7`
            webCell.dataset.row = rowIndex;
            webCell.dataset.column = colIndex;
            webBoard.appendChild(webCell)
            webCell.addEventListener("click", (e) => {
                if (game){
                    const row = parseInt(e.target.dataset.row);
                    const column = parseInt(e.target.dataset.column);
                    game(row, column, e.target);
                }else{
                    alert("Press start game button")
                }
              });    
        })
    })   
}
displayWebGame()
