let boxes = document.querySelectorAll('.box');
let charBtns = document.querySelectorAll('.char-btn');
let divOptions = document.querySelector('#options');
let divHistory = document.querySelector('#history');

// State variables
let moves = 0;
let charChosen = false;
let firstPlayer, secondPlayer = '';
let boardState = [ [], [], [] ];

charBtns.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Clicked button!!!", button)
        firstPlayer = button.innerHTML;
        console.log("Player is", button.innerHTML)
        secondPlayer = firstPlayer === 'X' ? 'O' : 'X';
        charChosen = true;
        boxes.forEach(box => {
            box.style.cursor = "pointer";
        })
        divOptions.innerHTML = `${firstPlayer}'s turn`;
    })
})


boxes.forEach(box => {
    box.addEventListener('click', () => {
        // check if player has been selected
        if (charChosen) {
            // check if box is already filled
            if (!(box.innerHTML === 'X' || box.innerHTML === 'O')) {
                box.innerHTML = moves % 2 === 0 ? firstPlayer : secondPlayer;
                divOptions.innerHTML = moves % 2 === 0 ? `${secondPlayer}'s turn` : `${firstPlayer}'s turn`
                moves++;
            }
        }
        
    })
})