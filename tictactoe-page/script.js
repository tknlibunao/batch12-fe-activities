/* DOM DECLARATIONS */
let boxes = document.querySelectorAll('.box');
let startModal = document.querySelector('.start-game')
let chooseModal = document.querySelector('.modal-container')
let charBtns = document.querySelectorAll('.char-btn');
let startBtn = document.querySelector('#startBtn');
let prevBtn = document.querySelector('#prevBtn');
let nextBtn = document.querySelector('#nextBtn');
let replayBtn = document.querySelector('#replay-game')
let resetBtn = document.querySelector('#resetBtn');
let divOptions = document.querySelector('#options');
let divAnnounce = document.querySelector('#announce');
let xScoreBoard = document.querySelector('#xScore')
let oScoreBoard = document.querySelector('#oScore')

/* EVENT LISTENERS */
resetBtn.addEventListener('click', resetGame)
replayBtn.addEventListener('click', playAgain)
prevBtn.addEventListener('click', showPrev)
nextBtn.addEventListener('click', showNext)
startBtn.addEventListener('click', startGame)

/* GAME PARAMETERS */
let moveCount = 0;
let xScore = 0;
let oScore = 0;
let draw = false;
let firstPlayer = '';
let secondPlayer = '';
let currentTurn = '';
let winIndices = [];
let boardState = [];
let moveHistory = [];
const winningMoves = [
    // row win
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // column win
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal win
    [0, 4, 8],
    [2, 4, 6]
];

// playAgain(): fires when PLAY AGAIN is clicked
//            : basically like resetGame, but the X/O scores are not erased
//            : and the Start Game Modal is skipped
function playAgain() {
    toggleClick('disable')  // disable box clicks    
    toggleWin('hide')       // unhighlight win boxes

    // initialize game parameters (except X/O scores)
    moveCount = 0;
    draw = false;
    firstPlayer = '';
    secondPlayer = '';
    currentTurn = '';
    winIndices = [];
    boardState = [];
    moveHistory = [];

    // initialize box content and classes
    boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove('xPink');
        box.classList.remove('oCyan');
    })

    // from here, go back to Choose First Turn scenario
    chooseModal.style.display = 'flex';
    startGame()
}

function startGame() {
    // For now, game starts when user chooses a character (presses 'X' or 'O' button)
    replayBtn.classList.add('hidden');
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    startModal.style.display = 'none';
    charBtns.forEach(button => {
        button.addEventListener('click', () => {
            chooseModal.style.display = 'none';
            setFirstPlayer(button);
            toggleClick('enable');
        })
    })
}

// setFirstPlayer: designates who the first turn is according to the button pressed
function setFirstPlayer(button) {
    firstPlayer = button.innerHTML;
    secondPlayer = firstPlayer === 'X' ? 'O' : 'X';
    divAnnounce.innerHTML = `${firstPlayer}'s turn`;
}

// resetGame: reloads current URL
function resetGame() {
    location.reload()
}

// userClickedBox: checks if a clicked box is empty, if it is then
//               : displays the current turn on box based on the moveCount,
//               : saves that move, checks for win, and increments moveCount
function userClickedBox() {
    if (!(this.innerHTML === 'X' || this.innerHTML === 'O')) {
        this.innerHTML = moveCount % 2 === 0 ? firstPlayer : secondPlayer;
        if ((moveCount % 2 === 0 && firstPlayer === 'X') || (moveCount % 2 !== 0 && secondPlayer === 'X')) {
            this.classList.add('xPink');
        } else {
            this.classList.add('oCyan')
        }
        divAnnounce.innerHTML = moveCount % 2 === 0 ? `${secondPlayer}'s turn` : `${firstPlayer}'s turn`
        saveMove()
        checkWinner()
        moveCount++;
    } else {
        console.log("Cell already filled!")
    }
}

// saveMove() : each turn, iterates over the 9 boxes and checks the content
//            : first stores each row in 3 different arrays, then pushes
//            : those row arrays into the main boardState array
function saveMove() {
    let row1 = []
    let row2 = []
    let row3 = []

    boxes.forEach((box, index) => {
        if (index < 3) {
            row1.push(box.innerText)
        } else if (index >= 3 && index <= 5) {
            row2.push(box.innerText)
        } else {
            row3.push(box.innerText)
        }
    })

    boardState.push([row1, row2, row3])
}

// checkWinner() : gets the currentTurn based on the current moveCount
//               : first, iterates over the 9 boxes, then iterates and
//               : gets the index of each case of win conditions stored
//               : in the winningMoves array (8 cases in total)
//               : for those corresponding group of 3 indices, get the
//               : current content of the board/boxes and check if they
//               : all match the currentTurn, in which case it is a WIN
//               : if WIN, get winIndices and endGame()
//               : otherwise, checkDraw()
function checkWinner() {
    currentTurn = moveCount % 2 === 0 ? firstPlayer : secondPlayer;

    for (let index = 0; index < boxes.length; index++) {
        for (winCase = 0; winCase < winningMoves.length; winCase++) {
            let box1 = boxes[winningMoves[winCase][0]].innerText;
            let box2 = boxes[winningMoves[winCase][1]].innerText;
            let box3 = boxes[winningMoves[winCase][2]].innerText;

            if (box1 === currentTurn && box2 === currentTurn && box3 === currentTurn) {
                winIndices = [ winningMoves[winCase][0], winningMoves[winCase][1], winningMoves[winCase][2] ]
                return endGame()
            }
        }
    }

    checkDraw();
}

// endGame() : called when a WIN or a DRAW is declared
//           : announces result, disables boxes click listener, highlights winning move
//           : updates score and shows move history buttons
function endGame() {
    divAnnounce.innerText = draw ? `Draw!` : `${currentTurn} wins!`;
    toggleClick('disable');
    toggleWin('show');
    updateScore();
    showHistoryButtons();
}

// updateScore() : unless DRAW, displays the incremented score of the winner/currentTurn
function updateScore() {
    if (!draw) {
        if (currentTurn === 'X') {
            xScore++;
            xScoreBoard.innerText = `${xScore}`
        } else {
            oScore++;
            oScoreBoard.innerText = `${oScore}`
        }
    }
}

// checkDraw() : called when a WIN is not yet declared after a turn
//             : checks if the 9 boxes are already filled, in which
//             : case, it is a DRAW therefore set draw to true, empty
//             : winIndices array and endGame()
function checkDraw() {
    let boxFilled = 0;
    boxes.forEach(box => {
        boxFilled = (box.innerText === 'X' || box.innerText === 'O') ? boxFilled + 1 : boxFilled;
    })

    if (boxFilled === 9) {
        draw = true;
        winIndices = [];
        return endGame(currentTurn, draw)
    }
}

// showPrev() : fires when the prevBtn is clicked
//            : decrements the moveCount and displays the desired
//            : move history based on the moveCount
function showPrev() {
    toggleWin('hide')
    moveCount -= 1;
    if(moveCount > 0) {
        if (moveCount === 1) {
            // it is the first move
            prevBtn.disabled = true;
        }
        nextBtn.disabled = false; 
        displayMove()
    }
}

// showNext() : fires when the nextBtn is clicked
//            : increments the moveCount and displays the desired
//            : move history based on the moveCount
function showNext() {
    moveCount += 1;
    if (moveCount < boardState.length+1) {
        if (moveCount === boardState.length) {
            // it is the last move
            nextBtn.disabled = true;
            toggleWin('show');
        }
        prevBtn.disabled = false;
        displayMove()
    }
}

// displayMove() : updates the board into the desired move history based on the moveCount
function displayMove() {
    let moves = [];

    // store moveHistory into 1D array
    moveHistory = boardState[moveCount-1]
    moveHistory.forEach(row => {
        row.forEach(move => {
            moves.push(move)
        })
    })

    // reflect moves into each box
    boxes.forEach((box, index) => {
        box.innerText = moves[index];
    })
}

// toggleClick() : either adds/removes the box to the classlist .pointer
//               : either adds/removes the box click event listener
function toggleClick(action) {
    boxes.forEach(box => {
        action === 'enable' ? (box.classList.add("pointer"), box.addEventListener('click', userClickedBox))
                            : (box.classList.remove("pointer"), box.removeEventListener('click', userClickedBox))
    })
}

// toggleWin() : highlights the boxes with corresponding winningIndices to indicate WIN
function toggleWin(action) {
    boxes.forEach((box, index) => {
        winIndices.forEach(win => {
            if (index === win) {
                action === 'show' ? box.classList.add('winbox') : box.classList.remove('winbox')
            }
        })
    })
}

// showHistoryButtons() : unhides the prevBtn and nextBtn and enables prevBtn
function showHistoryButtons() {
    replayBtn.classList.remove('hidden');
    prevBtn.classList.remove('hidden')
    nextBtn.classList.remove('hidden')
    prevBtn.disabled = false;
}