let boxes = document.querySelectorAll('.box');
let buttons = document.querySelectorAll('button');
let options = document.querySelector('#options');

// State variables
let moves = 0;
let charChosen = false;
let firstPlayer, secondPlayer = '';
let boardState = [ [], [], [] ];

buttons.forEach(button => {
    button.addEventListener('click', () => {
       firstPlayer = button.innerHTML;
       secondPlayer = firstPlayer === 'X' ? 'O' : 'X';
       charChosen = true;
       boxes.forEach(box => {
           box.style.cursor = "pointer";
       })
       options.classList.add("hidden");
    })
})


boxes.forEach(box => {
    box.addEventListener('click', () => {
        // check if player has been selected
        if (charChosen) {
            // check if box is already filled
            if (!(box.innerHTML === 'X' || box.innerHTML === 'O')) {
                box.innerHTML = moves % 2 === 0 ? firstPlayer : secondPlayer;
                moves++;
            }
        }
        
    })
})