/* <---------- DECLARATIONS ----------> */
let divInputName = document.getElementById('divInputName');
let greeting = document.getElementById('greeting');
let resetSwitch = document.getElementById('resetPage');
let arrPhrases = ["Good to see you, ", "I missed you, ", "Looking good, ", "Welcome back, ", "Hi there, ",
                  "Great job,", "Keep it up,", "You're amazing,", "Way to go,", "You rock,"];

/* <---------- MAIN FUNCTIONS ----------> */

/* <---------- STORAGE LOGIC ----------> */
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

/* <---------- RESET LOGIC ----------> */
//listen when user clicks the total reset button
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
    location.reload();
});

/* <---------- NAME LOGIC ----------> */
// getName: gets the name of the user and loads the workspace
function getName() {
    let inputName = document.getElementById('inputName');

    // Listen when user presses the 'Enter' key
    // meaning, user has already submitted a name
    inputName.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' && inputName.value !== '') {
            // save state of name
            state.name = inputName.value;
            saveState();
            loadWorkspace();
            setTimeout(() => {
                loadSaved();        
            }, 5600);
        }
    });
}

/* <---------- LOAD WORKSPACE LOGIC ----------> */
// loadWorkspace: simulates loading screen / workspace when user presses enter from Initial Template
function loadWorkspace() {
    displayText("Setting up your workspace...", 4200);
    displayText("Setting up your workspace..", 3500);
    displayText("Setting up your workspace.", 2800);
    displayText("Loading...", 2100);
    displayText("Loading..", 1400);
    displayText("Loading.", 700);
}

// loadSaved: displays the following on their current/saved state {time, focus, greetings, quotes, todo}
function loadSaved() {    
    getTime();
    loadBg();
    loadFocus();
    loadGreetings();
    loadQuotes();
    loadToDo();
}

/* <---------- TIME LOGIC ----------> */
// See the current time on the homepage
// getTime: fetches the current time on page load and refreshes it every second
function getTime() {
    var today = new Date();
    document.getElementById('currentTime').innerHTML = today.toLocaleTimeString('en-GB', { hour12: false });
    state.time = today.toLocaleTimeString('en-GB', { hour12: false });
    saveState();

    // update time every 1000 ms
    setTimeout(getTime, 1000);
}

/* <---------- FOCUS LOGIC ----------> */
// Load the main focus after "logging in"
// loadFocus: replaces the content of divInputName with the Main Focus Template
//          : listens if the user focuses/blurs on/from the contenteditable element
function loadFocus() {
    // load Main Focus Template
    divInputName.textContent = "";
    let focusToday = createNewElement("div", "id", "today");
    focusToday.textContent = "MAIN FOCUS FOR TODAY";
    divInputName.appendChild(focusToday);
    divInputName.appendChild(document.createElement('br'));
    let inputFocus = createNewElement("span", ["id", "contenteditable", "spellcheck"], ["inputFocus", "true", "false"]);
    if(state.focus) {
        inputFocus.textContent = state.focus;
    }   else {
        inputFocus.textContent = "set your goal here!";
    }
    divInputName.appendChild(inputFocus);

    // listen when user focuses on the contenteditable span #inputFocus
    // in which case, add it to the classlist 'is-focused'
    inputFocus.addEventListener('focus', function() {
        this.classList.add('is-focused');
    });

    // listen when user clicks outside the contenteditable span #inputFocus
    // in which case, remove it from the classlist 'is-focused'
    inputFocus.addEventListener('blur', function() {
        this.classList.remove('is-focused');
        state.focus = inputFocus.innerHTML;
        saveState();
    });
}

/* <---------- GREETINGS LOGIC ----------> */
// Load the main focus after "logging in"
// loadFocus: replaces the content of divInputName with the Main Focus Template
//          : listens if the user focuses/blurs on/from the contenteditable element
function loadGreetings() {
    // load random greeting
    greeting.textContent = "";
    let idx = getRandomIntInclusive(0,4);
    greeting.innerHTML = `${arrPhrases[idx]}<span id=inputGreetings contenteditable=true spellcheck=false>${state.name}</span>!`;

    let inputGreetings = document.getElementById('inputGreetings');

    // listen when user focuses on the contenteditable span #inputGreetings
    // in which case, add it to the classlist 'is-focused'
    inputGreetings.addEventListener('focus', function() {
        this.classList.add('is-focused');
    });

    // listen when user clicks outside the contenteditable span #inputFocus
    // in which case, remove it from the classlist 'is-focused'
    inputGreetings.addEventListener('blur', function() {
        this.classList.remove('is-focused');
        let newInput = inputGreetings.innerHTML;
        if(newInput) {
            state.name = inputGreetings.innerHTML;
            saveState();
        }   else {
            alert("Warning! It seems like you left your name field empty. Please input your name :)")
        }
    });
}

/* <---------- QUOTES LOGIC ----------> */
// getQuote: fetches object quotes from an API and returns the fetched data
const getQuote = async() => {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json()
    return data
}

// chooseQuote: generates a random index from 0-1642 and checks if the corresponding length of the quote is < 50
//            : if it satisfies, then get text and author values, store it in the object state, then save state
function chooseQuote(nextQuote) {
    let idx = getRandomIntInclusive(0, 1642);
    let quote = nextQuote[idx].text;
    if (quote.length < 50) {
        state.quote = nextQuote[idx].text;
        state.author = nextQuote[idx].author === null ? 'Anonymous' : nextQuote[idx].author;
        saveState();
    }   else {
        chooseQuote(nextQuote);
    }
}

// loadQuotes: displays the Quote Template after logging in
//           : listens if user clicks Generate or Add buttons
function loadQuotes() {
    // load Quotes Template
    let quotesContainer = document.getElementById("divQuote");
    let quotes = createNewElement("div", "id", "quote");
    
    if (state.quote.length > 0) {
        quotes.textContent = state.author.length > 0 ? `"${state.quote}" -${state.author}` : `"${state.quote}"`;
    }   else {
        quotes.textContent = `"We're no strangers to love... You know the rules and so do I..." -Rick Rolled`;
    }

    // Create quote options container
    let quotesOptions = createNewElement("div", "id", "quoteOptions");

    // Create add button
    let addQuote = createNewElement("div", "id", "add");
    addQuote.textContent = "Add your own quote";

    // Create generate button
    let generateQuote = createNewElement("div", "id", "generate");
    generateQuote.textContent = "Next random quote";

    // Append new elements to main quote container
    quotesContainer.appendChild(quotes);
    quotesOptions.appendChild(addQuote);
    quotesOptions.appendChild(generateQuote);
    quotesContainer.appendChild(quotesOptions);

    // Quote Options Event Listener
    // Float quoteOptions up on mouseover/hover
    quotesContainer.addEventListener("mouseover", () => {
        console.log(quotesOptions)
        quotesOptions = setElementStyle(quotesOptions, "style", `visibility: visible; animation-name: floatUp;
                                                        animation-duration: 0.4s; animation-timing-function: ease-out;`);
    })

    // Fade quoteOptions to invisibility on mouseout
    quotesContainer.addEventListener("mouseout", () => {
        console.log(quotesOptions)
        quotesOptions = setElementStyle(quotesOptions, `style", "visibility: hidden; animation-name: slowFade;
                                                        animation-duration: 0.2s; animation-timing-function: ease-in;`);
    })

    // Generate Button Event Listener
    // listen if user clicks generate button,
    // in which case, it will generate a new random quote from the given API
    generateQuote.addEventListener('click', async() => {
        let nextQuote = await getQuote();
        chooseQuote(nextQuote);
        quote.innerHTML = `"${state.quote}" -${state.author}`; 
    })

    // Add Button Event Listener
    // listen if user clicks add button,
    // in which case, it will make the quote element contenteditable so the user can edit the text field
    addQuote.addEventListener('click', () => {
        quote.setAttribute("contenteditable", "true");
        quote.classList.add('is-focused');
        quote.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (quote.innerHTML.length > 1) {
                    state.quote = quote.innerHTML;
                    state.author = "";
                    saveState();
                    quote.innerHTML = `${state.quote}`;
                    quote.setAttribute("contenteditable", "false");
                    quote.classList.remove('is-focused');
                }
            }
        })
    })
}

/* <---------- TODO LOGIC ----------> */
// loadTodo: loads the TodoTemplate and displays the items in the state.todo
//         : listens for the user to submit the form (i.e. submit todo entry)
function loadToDo() {
    // Load Todo Template
    let todoContainer = document.querySelector('#todo');
    todoContainer.innerHTML = `<div class="container">
                                    <h1 class="app-title">DAILY TASKS</h1>
                                    <ul class="todo-list js-todo-list"></ul>
                                    <form class="js-form" autocomplete="off">
                                        <input autofocus id="inputTodo" type="text"
                                        placeholder="Let's be productive together! You got this!"
                                        class="js-todo-input">
                                    </form>
                                </div>`;

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
            }   else {
                alert(`Oh no! It seems like you still have a lot on your plate.
                \nTry to tick some off of your list first. Or if not, maybe a little rest won't hurt, right? :)`)
            }
        }
        todoForm.reset();
    })
}

// createTodoList(data): creates an `li` element for the user todoInput.value given by the input argument data
function createTodoList(data) {
    // get `ul` element
    const todoList = document.querySelector(".js-todo-list");
    
    // create `li` element, set class="todo-item", and input corresponding inner elements (i.e. tickbox, todoInput text, delete button)
    let todoItem = createNewElement("li", "class", "todo-item");
    todoItem.innerHTML = `<input type="checkbox"/>
                          <label class="tick js-tick"></label>
                          <span>${data["todo"]}</span>
                          <button class="delete-todo js-delete-todo">✕</button>`

    // append `li` element (child) to `ul` element (parent)
    todoList.append(todoItem);

    const tickTodo = todoItem.querySelector(".js-tick");
    // on reload, check if todo is completed,in which case toggle its class `done`
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
        }   else {
            data["completed"] = false;
        }
        saveState();
    })

    // Delete Event Listener
    const deleteTodo = todoItem.querySelector(".js-delete-todo");
    deleteTodo.addEventListener('click', () => {
        // get corresponding todoInput.value
        let itemDelete = todoItem.getElementsByTagName("span")[0].textContent;

        // use filter to remove matches from array
        // note: *slight* issue here is that, when you input duplicate entries,
        // all entries will be deleted when you delete any of them
        let arrFilter = state.todo.filter((data) => {
            return data["todo"] !== itemDelete
        })

        state.todo = arrFilter;
        todoItem.remove()
        todoList.innerHTML = "";
        displayTodoList();
        saveState();

    })
}

// displayTodoList: iterates within state.todo array and (re)creates an entry for each of its element
//                : helpful for rerendering of stored state.todo on refreshed page
function displayTodoList() {
    state.todo.forEach((item) => createTodoList(item));
}

/* <---------- EXTRA FUNCTIONS ----------> */
// createNewElement: creates new element and sets corresponding style attributes
function createNewElement(element, arrAttribute, arrValue) {
    let newElement = document.createElement(element);
    newElement = setElementStyle(newElement, arrAttribute, arrValue);
    return newElement;
}

// setElementStyle: sets the corresponding style attributes
function setElementStyle(element, arrAttribute, arrValue) {
        if (arrAttribute.length > 0) {
            if (!Array.isArray(arrAttribute)) {
                element.setAttribute(arrAttribute, arrValue);
            }   else {
                for (i = 0; i < arrAttribute.length; i++) {
                    element.setAttribute(arrAttribute[i], arrValue[i]);
                }
            }
        }  
    return element;
}

// getRandomIntInclusive: generates a random integer between min and max parameters (inclusive)
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// loadBg: changes the body background and the switch bgcolor
function loadBg() {
    document.body.style.backgroundImage = `url("./assets/backgroundfinal.png")`;
    resetSwitch.style.backgroundColor = "white";
}

// displayText: displays the given text on the divInputName after the set delay time
function displayText(text, delayTime) {
    setTimeout(() => {
        divInputName.textContent = text
    }, delayTime)
}

// sendCongrats: sends an encouraging prompt whenever user ticks off something off the todo list
function sendCongrats() {
    // returns a random integer from 1 to 5:
    let idx = getRandomIntInclusive(5, 9);
    greeting.innerHTML = `${arrPhrases[idx]} <span id=inputGreetings contenteditable=true spellcheck=false>${state.name}</span>!`;

    setTimeout(() => {
        loadGreetings();
    }, 2500);
}

/* <---------- MAIN LOGIC ----------> */
// Declare and set an object state
// This will contain 5 parameters {name, greetings, focus, quote, todo}
let state = {
    name: "",
    focus: "",
    quote: "",
    author: "",
    todo: []
}

// Load initial page template (i.e. input name + zZzZ... only)
loadState();

// If the state is yet to be initialized (i.e. `logged out`),  listen until user inputs name
// otherwise (i.e. `logged in`), load the Saved Template
if (!state.name) {
    getName();
}   else {
    loadSaved();
}
