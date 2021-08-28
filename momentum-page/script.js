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
            // console.log("Name: ", state.name)

            // load workspace
            // simulate loading screen
            loadWorkspace();
        }
    });
}

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
        // load real-time clock
        getTime();

        // load main focus
        loadFocus();

        // load greetings
        loadGreetings();

        // load quotes
        // loadQuotes();

        // load todo
        // loadToDo()
    }, 5600);
}

function loadSaved() {
    // load real-time clock
    getTime();

    // load main focus
    loadFocus();

    // load greetings
    loadGreetings();

    // load quotes
    // loadQuotes();
}

// TIME LOGIC
// See the current time on the homepage
// getTime: fetches the current time on page load and refreshes it every second
function getTime() {
    var today = new Date();
    document.getElementById('currentTime').innerHTML = today.toLocaleTimeString('en-GB', { hour12: false });
    state.time = today.toLocaleTimeString('en-GB', { hour12: false });
    saveState();
    // console.log("Time: ", state.time)
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
        // console.log("Focus:", state.focus)
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
        state.focus = inputFocus.innerHTML;
        saveState();
        console.log("Focus: ", state.focus)
    });
}

// GREETINGS LOGIC
// Load the main focus after "logging in"
// loadFocus: replaces the content of divInputName with the Main Focus Template
//          : listens if the user focuses/blurs on/from the contenteditable element
function loadGreetings() {
    
    document.getElementById('greeting').textContent = "";
    document.getElementById('greeting').innerHTML = `Good to see you, <span id=inputGreetings contenteditable=true spellcheck=false>${state.name}</span>!`;
    // document.getElementById('inputGreetings').textContent = state.name;

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
        // else {
        //     alert("Warning! It seems like you left your name field empty. Please input your name :)")
        // }
        console.log("State Name: ", state.name)
    });
}

// QUOTES LOGIC


// RESET LOGIC
//Reset button for testing and presentation
let resetSwitch = document.getElementById('resetPage');
resetSwitch.addEventListener('click', () => {
    // Initialize object state and save
    state = {
        name: "",
        focus: "",
        quote: [],
        todo: []
    }
    saveState();

    // Reload page
    location.reload();
});





// MAIN???

// Declare and set an object state
// This will contain 6 parameters {name, greetings, focus, quote, todo}
let state = {
    name: "",
    focus: "",
    quote: [],
    todo: []
}

// Load initial page template (i.e. input name + zZzZ... only)
loadState();

if (!state.name) {
    getName();
}
else {
    loadSaved();
}