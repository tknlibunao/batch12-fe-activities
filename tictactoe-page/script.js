/* DOM DECLARATIONS */
let boxes = document.querySelectorAll('.box');
let modal = document.querySelector('.modal-container')
let charBtns = document.querySelectorAll('.char-btn');
let prevBtn = document.querySelector('#prevBtn');
let nextBtn = document.querySelector('#nextBtn');
let resetBtn = document.querySelector('#resetBtn');
let divOptions = document.querySelector('#options');
let divAnnounce = document.querySelector('#announce');
let xScoreBoard = document.querySelector('#xScore')
let oScoreBoard = document.querySelector('#oScore')

/* EVENT LISTENERS */
resetBtn.addEventListener('click', resetGame)
prevBtn.addEventListener('click', showPrev)
nextBtn.addEventListener('click', showNext)

/* GAME PARAMETERS */
let moveCount = 0;
let xScore = 0;
let oScore = 0;
let draw = false;
let firstPlayer = '';
let secondPlayer = '';
let currentTurn = '';
let winIndex = [];
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

// For now, game starts when user chooses a character (presses 'X' or 'O' button)
charBtns.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'none';
        setFirstPlayer(button);
        toggleBoxes('enable');
    })
})

function setFirstPlayer(button) {
    firstPlayer = button.innerHTML;
    secondPlayer = firstPlayer === 'X' ? 'O' : 'X';
    divAnnounce.innerHTML = `${firstPlayer}'s turn`;
}

function resetGame() {
    location.reload()
}

function userClickedBox() {
    if (!(this.innerHTML === 'X' || this.innerHTML === 'O')) {
        this.innerHTML = moveCount % 2 === 0 ? firstPlayer : secondPlayer;
        divAnnounce.innerHTML = moveCount % 2 === 0 ? `${secondPlayer}'s turn` : `${firstPlayer}'s turn`
        saveMove()
        checkWinner()
        moveCount++;
    } else {
        console.log("Cell already filled!")
    }
}

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

function checkWinner() {
    currentTurn = moveCount % 2 === 0 ? firstPlayer : secondPlayer;

    for (let index = 0; index < boxes.length; index++) {
        for (winCase = 0; winCase < winningMoves.length; winCase++) {
            let box1 = boxes[winningMoves[winCase][0]].innerText;
            let box2 = boxes[winningMoves[winCase][1]].innerText;
            let box3 = boxes[winningMoves[winCase][2]].innerText;

            if (box1 === currentTurn && box2 === currentTurn && box3 === currentTurn) {
                winIndex = [ winningMoves[winCase][0], winningMoves[winCase][1], winningMoves[winCase][2] ]
                return endGame()
            }
        }
    }

    // if it reaches this, that means there is no winner yet therefore, check for draw
    checkDraw()
}

function endGame() {
    divAnnounce.innerText = draw ? `Draw!` : `Player ${currentTurn} wins!`;
    toggleBoxes('disable')
    toggleWin('show')
    updateScore()
    showHistoryButtons();
}

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

function checkDraw() {
    let boxFilled = 0;
    boxes.forEach(box => {
        boxFilled = (box.innerText === 'X' || box.innerText === 'O') ? boxFilled + 1 : boxFilled;
    })

    if (boxFilled === 9) {
        draw = true;
        winIndex = [];
        return endGame(currentTurn, draw)
    }
}

function showPrev() {
    toggleWin('hide')
    moveCount -= 1;
    console.log("Move count: ", moveCount, boardState.length)
    if(moveCount > 0) {
        if (moveCount === 1) {
            prevBtn.disabled = true;
        }
        if (moveCount === boardState.length-1) {
            nextBtn.disabled = false;
            
        }
        console.log(`Move #${moveCount}: ${boardState[moveCount]}`)
        moveHistory = boardState[moveCount-1]
        displayMove()
    }
}

function showNext() {
    moveCount += 1;
    if (moveCount < boardState.length+1) {
        if (moveCount === boardState.length) {
            nextBtn.disabled = true;
            toggleWin('show');
        }
        prevBtn.disabled = false;
        moveHistory = boardState[moveCount-1]
        displayMove()
    }
}

function displayMove() {
    let moves = [];
    moveHistory.forEach(row => {
        row.forEach(move => {
            moves.push(move)
        })
    })

    console.log("Moves:", moves)

    boxes.forEach((box, index) => {
        box.innerText = '';
        box.innerText = moves[index];
    })
}

function toggleBoxes(action) {
    boxes.forEach(box => {
        action === 'enable' ? box.classList.add("pointer") : box.classList.remove("pointer")
        action === 'enable' ? box.addEventListener('click', userClickedBox) : box.removeEventListener('click', userClickedBox)
    })
}

function toggleWin(action) {
    boxes.forEach((box, index) => {
        winIndex.forEach(win => {
            if (index === win) {
                action === 'show' ? box.classList.add('winbox') : box.classList.remove('winbox')
            }
        })
    })
}

function showHistoryButtons() {
    prevBtn.classList.remove('hidden')
    nextBtn.classList.remove('hidden')
    prevBtn.disabled = false;
}