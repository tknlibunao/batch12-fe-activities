let boxes = document.querySelectorAll('.box');
let charBtns = document.querySelectorAll('.char-btn');
let divOptions = document.querySelector('#options');
let divAnnounce = document.querySelector('#announce');

// Game parameters
let moveCount = 0;
let xScore = 0;
let oScore = 0;
let draw = false;
let firstPlayer, secondPlayer = '';
let boardState = [];
const winningMoves = [
    // row
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal
    [0, 4, 8],
    [2, 4, 6]
];

console.log(winningMoves)

// For now, game starts when user chooses a character (presses 'X' or 'O' button)
charBtns.forEach(button => {
    button.addEventListener('click', () => {
        setFirstPlayer(button);
        // listen for each box
        boxes.forEach(box => {
            box.classList.add("pointer")
            box.addEventListener('click', userClickedBox)
        })
    })
})

function setFirstPlayer(button) {
    firstPlayer = button.innerHTML;
    secondPlayer = firstPlayer === 'X' ? 'O' : 'X';
    divAnnounce.innerHTML = `${firstPlayer}'s turn`;
    divOptions.innerHTML = `<div id="history">
                                <div class="left">
                                    <button class='char-move' id='prevBtn' disabled>Prev</button>
                                </div>
                                <div class="right">
                                    <button class='char-move' id='nextBtn' disabled>Next</button>
                                </div>
                            </div>`
    let prevBtn = document.querySelector('#prevBtn');
    let nextBtn = document.querySelector('#nextBtn');
}

function userClickedBox(event) {
    // check if box is already filled
    if (!(this.innerHTML === 'X' || this.innerHTML === 'O')) {
        this.innerHTML = moveCount % 2 === 0 ? firstPlayer : secondPlayer;
        divAnnounce.innerHTML = moveCount % 2 === 0 ? `${secondPlayer}'s turn` : `${firstPlayer}'s turn`
        saveMove()
        checkWinner(moveCount)
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
    console.log("BoardState:", boardState)
}

function checkWinner(moveCount) {
    let currentTurn = moveCount % 2 === 0 ? firstPlayer : secondPlayer;
    console.log("Currently checking for win of:", currentTurn)

    for (let index = 0; index < boxes.length; index++) {
        for (winCase = 0; winCase < winningMoves.length; winCase++) {
            let box1 = boxes[winningMoves[winCase][0]].innerText;
            let box2 = boxes[winningMoves[winCase][1]].innerText;
            let box3 = boxes[winningMoves[winCase][2]].innerText;
            if (box1 === currentTurn && box2 === currentTurn && box3 === currentTurn) {
                return endGame(currentTurn, draw)
            }
        }
    }

    // if it reaches this, that means there is no winner yet
    // therefore, check if all boxes are already filled
    // in which case, there is a draw
    checkDraw(currentTurn)
}

function endGame(currentTurn, draw) {
    boxes.forEach(box => {
        box.removeEventListener('click', userClickedBox)
        box.classList.remove("pointer")
    })
    
    divAnnounce.innerText = draw ? `Draw!` : `Player ${currentTurn} wins!`;

    // updateScore()
    enableViewHistory()
}

function checkDraw(currentTurn) {
    let boxFilled = 0;
    boxes.forEach(box => {
        if (box.innerText === 'X' || box.innerText === 'O') {
            boxFilled++;
        }
    })

    if (boxFilled === 9) {
        draw = true;
        return endGame(currentTurn, draw)
    }
}

function enableViewHistory() {
    console.log(`View History, moveCount = ${moveCount}`)
    prevBtn.disabled = false;
    prevBtn.addEventListener('click', showPrev)
}

function showPrev() {
    moveCount -= 1;
    console.log("Move count: ", moveCount, boardState.length)
    if(moveCount > 0) {
        if (moveCount === 1) {
            prevBtn.disabled = true;
        }
        if (moveCount === boardState.length-1) {
            nextBtn.disabled = false;
            nextBtn.addEventListener('click', showNext)
        }
        console.log(`Move #${moveCount}: ${boardState[moveCount]}`)
        let moveHistory = boardState[moveCount-1]
        displayMove(moveHistory)
    }
}

function showNext() {
    moveCount += 1;
    if (moveCount < boardState.length+1) {
        if (moveCount === boardState.length) {
            nextBtn.disabled = true;
        }
        prevBtn.disabled = false;
        console.log("Move count: ", moveCount, boardState.length)
        let moveHistory = boardState[moveCount-1]
        displayMove(moveHistory)
    }
}

function displayMove(moveHistory) {
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