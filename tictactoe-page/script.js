let boxes = document.querySelectorAll('.box');
let buttons = document.querySelectorAll('button');
let moves = 0;
let firstPlayer, secondPlayer = '';
let boardState = [ [], [], [] ];

buttons.forEach(button => {
    button.addEventListener('click', () => {
       firstPlayer = button.innerHTML;
       if (firstPlayer === 'X') {
           secondPlayer = 'O';
       } else {
           secondPlayer = 'X';
       }
    })
})


boxes.forEach(box => {
    box.addEventListener('click', () => {
        console.log("User clicked on", box.id)
        console.log("That is row", box.id[6], "and col", box.id[7])

        // check if box is already filled
 
        if (!(box.innerHTML === 'X' || box.innerHTML === 'O')) {
            if (moves % 2 === 0) {
                // impending first move
                // set firstplayer symbol on box
                box.innerHTML = firstPlayer;
                // register move
                moves++;
            } else {
                // other player's turn
                // set player symbol on box
                box.innerHTML = secondPlayer;
                // register move
                moves++;
            }
        }
    })
})