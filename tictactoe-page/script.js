let boxes = document.querySelectorAll('.box');
let boardState = [
    [],
    [],
    []
]

boxes.forEach(box => {
    box.addEventListener('click', () => {
        console.log("User clicked on", box.id)
        console.log("That is row", box.id[6], "and col", box.id[7])
    })
})