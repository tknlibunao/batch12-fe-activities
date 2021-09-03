let boxes = document.querySelectorAll('.box');
// console.log(boxes)
// for (let box of boxes) {
//     console.log("its id is", box.id)
// }

boxes.forEach(box => {
    box.addEventListener('click', () => {
        console.log("User clicked on", box.id)
    })
})