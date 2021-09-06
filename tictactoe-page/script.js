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

