let boxes = document.querySelectorAll('.box');
let charBtns = document.querySelectorAll('.char-btn');
let divOptions = document.querySelector('#options');
let divAnnounce = document.querySelector('#announce');

// State variables
let moveCount = 0;
let firstPlayer, secondPlayer = '';
let boardState = [];

// For now, game starts when user chooses a character (presses 'X' or 'O' button)
charBtns.forEach(button => {
    button.addEventListener('click', () => {
        setFirstPlayer(button);
        
        boxes.forEach(box => {
            box.style.cursor = "pointer";
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
                                    <button class='char-move' disabled>Prev</button>
                                </div>
                                <div class="right">
                                    <button class='char-move' disabled>Next</button>
                                </div>
                            </div>`
}

function userClickedBox(event) {
    // check if box is already filled
    if (!(this.innerHTML === 'X' || this.innerHTML === 'O')) {
        this.innerHTML = moveCount % 2 === 0 ? firstPlayer : secondPlayer;
        divAnnounce.innerHTML = moveCount % 2 === 0 ? `${secondPlayer}'s turn` : `${firstPlayer}'s turn`
        saveMove()
        // checkWinner()
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