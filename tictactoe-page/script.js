let boxes = document.querySelectorAll('.box');
let charBtns = document.querySelectorAll('.char-btn');
let divOptions = document.querySelector('#options');
let divAnnounce = document.querySelector('#announce');

// State variables
let moves = 0;
let charChosen, finish = false;
let firstPlayer, secondPlayer = '';
let boardState = [ [], [], [] ];
let moveHistory = [];
let dummy = [];
charBtns.forEach(button => {
    button.addEventListener('click', () => {
        charChosen = true;
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
        boxes.forEach(box => {
            box.style.cursor = "pointer";
        })  
    })
})


boxes.forEach(box => {
    box.addEventListener('click', () => {
        let row = box.id[6];
        let col = box.id[7];

        // check if player has been selected
        if (charChosen) {
            // check if box is already filled
            if (!(box.innerHTML === 'X' || box.innerHTML === 'O')) {
                box.innerHTML = moves % 2 === 0 ? firstPlayer : secondPlayer;
                divAnnounce.innerHTML = moves % 2 === 0 ? `${secondPlayer}'s turn` : `${firstPlayer}'s turn`
                boardState[row][col] = box.innerHTML;
                console.log(`Board state ${moves + 1}`, boardState)

            } else {
                console.log("Cell already filled!")
            }
            let dummy = boardState.map(arr => {
                return arr.slice()
            })
            moveHistory.push(dummy);
            console.log(`Move ${moves}`, moveHistory)
            moves++;
        } else {
            console.log("Choose character first!")
        }
    })
})

function checkFinish(moves, moveHistory) {
    if (moves === 8) {
        console.log(moveHistory)
    }
}