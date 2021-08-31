// FUNCTIONS

//STORAGE LOGIC
// saveState: stores the state/settings/data of the page so that it will not be lost when you refresh the page
function saveState() {
    localStorage.setItem("data", JSON.stringify(state));
}

// loadState: loads the saved state/data from the storage map
function loadState () {
    let retrievedData = localStorage.getItem("data")
    if (!retrievedData) {
        saveState();
        location.reload();
    }
    state = JSON.parse(retrievedData);
}

// NAME LOGIC
// Put user's name on the homepage done on html via input
// Get user's inputted name

function getName() {
    // Get input (name) element
    let inputName = document.getElementById('inputName');

    // Listen when user presses the 'Enter' key
    // Meaning, user has already submitted a name
    inputName.addEventListener('keyup', (event) => {
        // Check if the key pressed is 'Enter'
        // Check also if the input field is not empty when Enter was pressed
        if (event.key === 'Enter' && inputName.value !== '') {
            // save state of name
            state.name = inputName.value;
            saveState();

            // simulate loading screen
            loadWorkspace();
        }
    });
}

// LOAD LOGIC (`LOGGING IN`)
// When the user presses enter (Input Name Template on load), simulate "logging in" 
// loadWorkspace: simulates loading screen / workspace
function loadWorkspace() {
    setTimeout(() => {
        document.getElementById('divInputName').textContent = "Setting up your workspace...";
    }, 4200);
    setTimeout(() => {
        document.getElementById('divInputName').textContent = "Setting up your workspace..";
    }, 3500);
    setTimeout(() => {
        document.getElementById('divInputName').textContent = "Setting up your workspace.";
    }, 2800);
    setTimeout(() => {
        document.getElementById('divInputName').textContent = "Loading...";
    }, 2100);
    setTimeout(() => {
        document.getElementById('divInputName').textContent = "Loading..";
    }, 1400);
    setTimeout(() => {
        document.getElementById('divInputName').textContent = "Loading.";
    }, 700);

    // setTimeout to compensate for the timing on loadWorkspace()
    // load all data whose STATES should be SAVED
    setTimeout(() => {
        loadSaved();        
    }, 5600);
}

// loadSaved: displays the following on their current/saved state {time, focus, greetings, quotes, todo}
function loadSaved() {    
    // load real-time clock
    getTime();

    // change background and switch
    loadBg();

    // load main focus
    loadFocus();

    // load greetings
    loadGreetings();

    // load quotes
    loadQuotes();

    // load todo
    loadToDo();
}

// TIME LOGIC
// See the current time on the homepage
// getTime: fetches the current time on page load and refreshes it every second
function getTime() {
    var today = new Date();
    document.getElementById('currentTime').innerHTML = today.toLocaleTimeString('en-GB', { hour12: false });

    // Save time state
    state.time = today.toLocaleTimeString('en-GB', { hour12: false });
    saveState();
    setTimeout(getTime, 1000);  //refresh time: 1s
}

// MAIN FOCUS LOGIC
// Load the main focus after "logging in"
// loadFocus: replaces the content of divInputName with the Main Focus Template
//          : listens if the user focuses/blurs on/from the contenteditable element
function loadFocus() {
    // clear divInputName content
    document.getElementById('divInputName').textContent = "";

    // replace with the Main Focus Template
    let newElement = document.createElement('div');
    newElement.setAttribute("id", "today");
    newElement.textContent = "MAIN FOCUS FOR TODAY";
    document.getElementById('divInputName').appendChild(newElement);
    newElement = document.createElement('br');
    document.getElementById('divInputName').appendChild(newElement);
    newElement = document.createElement('span');
    newElement.setAttribute("id", "inputFocus");
    newElement.setAttribute("contenteditable", "true");
    newElement.setAttribute("spellcheck", "false");
    if(state.focus) {
        newElement.textContent = state.focus;
    }
    else {
        newElement.textContent = "set your goal here!";
    }
    
    document.getElementById('divInputName').appendChild(newElement);

    // inputFocus Event Listener
    // Get span (main focus) element
    let inputFocus = document.getElementById('inputFocus');

    // Listen when user focuses on the contenteditable span #inputFocus
    // In which case, add it to the classlist 'is-focused'
    inputFocus.addEventListener('focus', function() {
        this.classList.add('is-focused');
    });

    // Listen when user clicks outside the contenteditable span #inputFocus
    // In which case, remove it from the classlist 'is-focused'
    inputFocus.addEventListener('blur', function() {
        this.classList.remove('is-focused');
        
        // Save focus state
        state.focus = inputFocus.innerHTML;
        saveState();
    });
}

// GREETINGS LOGIC
// Load the main focus after "logging in"
// loadFocus: replaces the content of divInputName with the Main Focus Template
//          : listens if the user focuses/blurs on/from the contenteditable element
function loadGreetings() {
    document.getElementById('greeting').textContent = "";
    let x = getRandomIntInclusive(1,5);
    switch(x) {
        case 1:
            greet = "Good to see you, ";
            break;
        case 2:
            greet = "I missed you, ";
            break;
        case 3:
            greet = "Looking good, ";
            break;
        case 4:
            greet = "Welcome back, ";
            break;
        case 5:
            greet = "Hi there, ";
            break;
    }
    document.getElementById('greeting').innerHTML = greet + `<span id=inputGreetings contenteditable=true spellcheck=false>${state.name}</span>!`;

    // GREETINGS LOGIC
    // Get span (greetings) element
    let inputGreetings = document.getElementById('inputGreetings');

    // Listen when user focuses on the contenteditable span #inputGreetings
    // In which case, add it to the classlist 'is-focused'
    inputGreetings.addEventListener('focus', function() {
        this.classList.add('is-focused');
    });

    // Listen when user clicks outside the contenteditable span #inputFocus
    // In which case, remove it from the classlist 'is-focused'
    inputGreetings.addEventListener('blur', function() {
        this.classList.remove('is-focused');
        let newInput = inputGreetings.innerHTML;
        if(newInput) {
            state.name = inputGreetings.innerHTML;
            saveState();
        }
        else {
            alert("Warning! It seems like you left your name field empty. Please input your name :)")
        }
    });
}

// QUOTES LOGIC
// getQuote: fetches object quotes from an API and returns the fetched data
const getQuote = async() => {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json()
    return data
}

// Generating random quotes
// getRandomIntInclusive: generates a random integer between min and max parameters (inclusive)
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// chooseQuote: generates a random index from 0-1642 and checks if the corresponding length of the quote is < 50
//            : if it satisfies, then get text and author values, store it in the object state, then save state
function chooseQuote(nextQuote) {
    let idx = getRandomIntInclusive(0, 1642);
    let quote = nextQuote[idx].text;
    if (quote.length < 50) {
        state.quote = nextQuote[idx].text;
        saveState();
        if (nextQuote[idx].author === null) {
            state.author = 'Anonymous';
            saveState();
        }
        else {
            state.author = nextQuote[idx].author;
            saveState();
        }
    }
    else {
        chooseQuote(nextQuote);
    }
}

// Load the quotes after "logging in"
// loadQuotes: displays the Quote Template
//           : listens if user clicks Generate or Add buttons
//           : if Generate, will generate a new random quote from the given API
//           : if Add, will make the quote element contenteditable so the user can edit the text field
function loadQuotes() {
    // Create main quote container
    let quotesContainer = document.getElementById("divQuote");

    // Create inner quote
    let quotes = document.createElement('div');
    quotes.setAttribute("id", "quote");

    if (state.quote.length > 0) {
            if (state.author.length > 0) {
                quotes.textContent = `"${state.quote}" -${state.author}`;
            }
            else {
                quotes.textContent = `"${state.quote}"`;
            }
    }
    else {
        quotes.textContent = `"We're no strangers to love... You know the rules and so do I..." -Rick Rolled`;
    }

    // Create quote options container
    let quotesOptions = document.createElement('div');
    quotesOptions.setAttribute("id", "quoteOptions");

    // Create add button
    let addQuote = document.createElement('div');
    addQuote.setAttribute("id", "add");
    addQuote.textContent = "Add your own quote";

    // Create generate button
    let generateQuote = document.createElement('div');
    generateQuote.setAttribute("id", "generate");
    generateQuote.textContent = "Next random quote";

    // Append new elements to main quote container
    quotesContainer.appendChild(quotes);
    quotesOptions.appendChild(addQuote);
    quotesOptions.appendChild(generateQuote);
    quotesContainer.appendChild(quotesOptions);

    // Quote Options Event Listener
    // Float quoteOptions up on mouseover/hover
    quotesContainer.addEventListener("mouseover", () => {
        quotesOptions.style.visibility = "visible";
        quotesOptions.style.animationName = "floatUp";
        quotesOptions.style.animationDuration = "0.4s";
        quotesOptions.style.animationTimingFunction = "ease-out";
    })

    // Fade quoteOptions to invisibility on mouseout
    quotesContainer.addEventListener("mouseout", () => {
        quotesOptions.style.animationName = "slowFade";
        quotesOptions.style.animationDuration = "0.2s";
        quotesOptions.style.animationTimingFunction = "ease-in";
        quotesOptions.style.visibility = "hidden";
    })

    // Generate Button Event Listener
    generateQuote.addEventListener('click', async() => {
        let nextQuote = await getQuote();
        chooseQuote(nextQuote);
        quote.innerHTML = `"${state.quote}" -${state.author}`; 
    })

    // Add Button Event Listener
    addQuote.addEventListener('click', () => {
        quote.setAttribute("contenteditable", "true");
        quote.classList.add('is-focused');
        quote.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (quote.innerHTML.length > 1) {
                    state.quote = quote.innerHTML;
                    saveState();
                    state.author = "";
                    saveState();
                    quote.innerHTML = `${state.quote}`;
                    quote.setAttribute("contenteditable", "false");
                    quote.classList.remove('is-focused');
                }
            }
        })

        generateQuote.addEventListener('click', async() => {
            quote.setAttribute("contenteditable", "false");
            quote.classList.remove('is-focused');
            quote.innerHTML = `"${state.quote}" -${state.author}`; 
        })
    })
}

// RESET LOGIC
//Total reset button
let resetSwitch = document.getElementById('resetPage');
resetSwitch.addEventListener('click', () => {
    // Initialize object state and save
    state = {
        name: "",
        focus: "",
        quote: "",
        author: "",
        todo: []
    }
    saveState();

    // Reload page
    location.reload();
});

// TODO LOGIC
// loadTodo: loads the TodoTemplate and displays the items in the state.todo
//         : listens for the user to submit the form (i.e. submit todo entry)
function loadToDo() {
    // Load Todo Template
    let todoContainer = document.querySelector('#todo');
    todoContainer.innerHTML = `<div class="container">
                                    <h1 class="app-title">DAILY TASKS</h1>
                                    <ul class="todo-list js-todo-list"></ul>
                                    <form class="js-form" autocomplete="off">
                                        <input autofocus id="inputTodo" type="text" aria-label="Enter a new todo item" placeholder="Let's be productive together! You got this!" class="js-todo-input">
                                    </form>
                                </div>
                                `;

    // Render existing todoList, if exisiting
    displayTodoList();

    // Get form and input elements
    const todoForm = document.querySelector(".js-form");
    const todoInput = document.querySelector(".js-todo-input");

    // Form Submit Event Listener
    todoForm.addEventListener('submit', (event) => {
        // prevent page from reloading on submit
        event.preventDefault();
        
        // if user input is not empty, check if the current state.todo has exceeded the max number of todoItems (i.e. 10)
            // if it is <= 10, create item
            // otherwise, alert user to finish some tasks first :)
        if (todoInput.value) {
            if (state.todo.length < 10) {
                let todoData = {todo: todoInput.value, completed: false}
                state.todo.push(todoData);
                saveState();
                createTodoList(todoData);
            }
            else {
                alert("Oh no! It seems like you still have a lot on your plate.\nTry to tick some off of your list first. Or if not, maybe a little rest won't hurt, right? :)")
            }
        }
        // reload form input field
        todoForm.reset();
    })
}

// createTodoList(data): creates an `li` element for the user todoInput.value given by the input argument data
function createTodoList(data) {
    // get `ul` element
    const todoList = document.querySelector(".js-todo-list");
    
    // create `li` element, set class="todo-item", and input corresponding inner elements (i.e. tickbox, todoInput text, delete button)
    let todoItem = document.createElement("li");
    todoItem.setAttribute("class", "todo-item")
    todoItem.innerHTML = `<input type="checkbox"/>
                          <label class="tick js-tick"></label>
                          <span>${data["todo"]}</span>
                          <button class="delete-todo js-delete-todo">
                          ✕
                          </button>`
    // append `li` element (child) to `ul` element (parent)
    todoList.append(todoItem);

    // Tick Functionality
    // get tickbox element
    const tickTodo = todoItem.querySelector(".js-tick");

    // check if todoInput is completed, in which case toggle the class `done` (render linethrough and checkmark)
    if (data["completed"]) {
        todoItem.classList.toggle("done")
    }

    // Tick Event Listener
    tickTodo.addEventListener('click', () => {
        // toggle the class `done`
        todoItem.classList.toggle("done")

        // toggle status of todoItem
        if (!data["completed"]) {
            data["completed"] = true;
            sendCongrats();
        }
        else {
            data["completed"] = false;
        }

        saveState();
    })

    // Delete Functionality
    // get delete button element
    const deleteTodo = todoItem.querySelector(".js-delete-todo");

    // Delete Event Listener
    deleteTodo.addEventListener('click', () => {
        // get corresponding todoInput.value
        let itemDelete = todoItem.getElementsByTagName("span")[0].textContent;

        // use filter to remove matches from array
        // note: *slight* issue here is that, when you input duplicate entries,
        // all entries will be deleted when you delete any of them
        let arrFilter = state.todo.filter((data) => {
            return data["todo"] !== itemDelete
        })

        // set returned array to state.todo
        state.todo = arrFilter;

        // remove element from DOM
        todoItem.remove()

        // delete all children under todoList (`ul` element)
        todoList.innerHTML = "";

        // update list displayed
        displayTodoList();

        saveState();

    })
}

// displayTodoList: iterates within state.todo array and (re)creates an entry for each of its element
//                : helpful for rerendering of stored state.todo on refreshed page
function displayTodoList() {
    state.todo.forEach((item) => createTodoList(item));
}

// BACKGROUND (EXTRA FCN #1)
// loadBg: changes the body background and the switch bgcolor
function loadBg() {
    // randomize background change
    let x = getRandomIntInclusive(1,2);
    switch(x) {
        case 1:
            document.body.style.backgroundImage = `url("./assets/backgroundfinal.png")`;
            break;
        case 2:
            document.body.style.backgroundImage = `url("./assets/backgroundfinal2.png")`;
            break;
    }

    // change switch background color
    document.querySelector("#resetPage").style.backgroundColor = "white";
}

// CONGRATS (EXTRA FCN #2)
// sendCongrats: sends an encouraging prompt whenever user ticks off something off the todo list
function sendCongrats() {
    // returns a random integer from 1 to 5:
    let x = getRandomIntInclusive(1, 5);
    switch (x) {
        case 1:
            document.getElementById('greeting').innerHTML = `Great job, <span id=inputGreetings contenteditable=true spellcheck=false>${state.name}</span>!`;
            break;
        case 2:
            document.getElementById('greeting').innerHTML = `Keep it up, <span id=inputGreetings contenteditable=true spellcheck=false>${state.name}</span>!`;
            break;
        case 3:
            document.getElementById('greeting').innerHTML = `You're amazing, <span id=inputGreetings contenteditable=true spellcheck=false>${state.name}</span>!`;
            break;
        case 4:
            document.getElementById('greeting').innerHTML = `Way to go, <span id=inputGreetings contenteditable=true spellcheck=false>${state.name}</span>!`;
            break;
        case 5:
            document.getElementById('greeting').innerHTML = `You rock, <span id=inputGreetings contenteditable=true spellcheck=false>${state.name}</span>!`;
            break;
    }
    
    setTimeout(() => {
        // reload the Greeting Template
        loadGreetings();
    }, 2500);
}

/* MAIN LOGIC */

// Declare and set an object state
// This will contain 6 parameters {name, greetings, focus, quote, todo}
let state = {
    name: "",
    focus: "",
    quote: "",
    author: "",
    todo: []
}

// Load initial page template (i.e. input name + zZzZ... only)
loadState();

// if the state is yet to be initialized (i.e. `logged out`),  listen until user inputs name
// otherwise (i.e. `logged in`), load the Saved Template
if (!state.name) {

    getName();
}
else {
    loadSaved();
}
