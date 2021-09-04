let boxes = document.querySelectorAll('.box');
let buttons = document.querySelectorAll('button');
let options = document.querySelector('#options');
let moves = 0;
let firstPlayer, secondPlayer = '';
let boardState = [ [], [], [] ];

buttons.forEach(button => {
    button.addEventListener('click', () => {
       firstPlayer = button.innerHTML;
       secondPlayer = firstPlayer === 'X' ? 'O' : 'X';
       options.classList.add("hidden");
       boxes.forEach(box => {
           box.style.cursor = "pointer";
       })
    })
})


boxes.forEach(box => {
    box.addEventListener('click', () => {
        // check if player has been selected
        if (firstPlayer.length > 0) {
            // check if box is already filled
            if (!(box.innerHTML === 'X' || box.innerHTML === 'O')) {
                box.innerHTML = moves % 2 === 0 ? firstPlayer : secondPlayer;
                moves++;
            }
        }
        
    })
})