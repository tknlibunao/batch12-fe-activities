let boxes = document.querySelectorAll('.box');
let boardState = [
    [],
    [],
    []
]

let moves = 0;
// assume X first for now
let player = 'X';

console.log(boardState)

boxes.forEach(box => {
    box.addEventListener('click', () => {
        console.log("User clicked on", box.id)
        console.log("That is row", box.id[6], "and col", box.id[7])

        // check if box is already filled
 
        if (!(box.innerHTML === 'X' || box.innerHTML === 'O')) {
            if (moves % 2 === 0) {
                // impending first move
                // set player symbol on box
                box.innerHTML = 'X';
                // register move
                moves++;
            } else {
                // other player's turn
                // set player symbol on box
                box.innerHTML = 'O';
                // register move
                moves++;
            }
        }
    })
})