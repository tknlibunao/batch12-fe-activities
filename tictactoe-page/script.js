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
    })
})