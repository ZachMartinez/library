let myLibrary = {}

// Helper functions
function generateId(length=8) {
   return Math.floor(Math.random() * (10 ** length)) 
}

// Model
function Book({title, author, pages, read, id}) {
    this.title = title
    this.author = author
    this.pages = pages || 0
    this.read = read || false
    this.id = id || generateId()
}

function addBook(obj) {
    let book = new Book(obj)
    myLibrary[book.id] = book
    saveData()
}

function removeBook(id) {
    if (myLibrary[id]) {
        delete myLibrary[id]
        console.log(`Book #${id} deleted`)
    } else {
        console.log(`Book #${id} not found`)
    }
}

function updateBook({id, title, author, pages, read}) {
    let targetBook = myLibrary[id]
    targetBook.title = title
    targetBook.author = author
    targetBook.pages = pages
    targetBook.read = read
}

function saveData() {
    try {
        let libraryString = JSON.stringify(myLibrary)
        localStorage["myLibrary"] = libraryString
    } catch(e) {
        console.log(`Unable to write to localStorage`)
        console.log(e)
    }
}

function loadData() {
    try {
        let libraryString = localStorage["myLibrary"]
        let localData = JSON.parse(libraryString)
        let keys = Object.keys(localData)
        keys.forEach(key => {
            addBook(localData[key])
        })
        console.log(`${keys.length} books loaded from localStorage`)
    } catch(e) {
        console.log(`Unable to read from localStorage`)
        console.log(e)
    }
}

function createTestData() {
    addBook({
        title: "The Count of Monte Christo", 
        author: "Alexandre Dumas", 
        pages: 1276 
    })
    addBook({
        title: "20,000 Leagues Under The Sea", 
        author: "Jules Verne", 
        pages: 528
    })
    addBook({
        title: "War and Peace", 
        author: "Tolstoy", 
        pages: 1440
    })
}

function clearData() {
    myLibrary = {}
    localStorage["myLibrary"] = "{}"
}

// View
function setupUI() {
    loadData()
    loadLibraryTable()
}

function loadLibraryTable() {
    let table = document.querySelector('tbody#books')
    let keys = Object.keys(myLibrary)
    table.innerHTML = ''
    keys.forEach(key => {
        let book = myLibrary[key]
        let row = table.insertRow()
        row.setAttribute('id', book.id)
        row.insertCell(-1).textContent = book.title
        row.insertCell(-1).textContent = book.author
        row.insertCell(-1).textContent = book.pages
        row.insertCell(-1).textContent = book.read
    })
}

// Controller code
function handleSubmitEvent(event) {
    event.preventDefault()
    let form = document.forms['book']
    let newBookData = {
        title: form.title.value,
        author: form.author.value,
        pages: parseInt(form.pages.value)
    }
    form.reset()
    addBook(newBookData)
    loadLibraryTable()
}

function handleClearDataButtonClick(event) {
    if (confirm("Do you want to delete all your books?")) {
        clearData()
        loadLibraryTable()
    }
}

document.addEventListener('click', (event) => {
    switch (event.target.id) {
        case 'clearData':
            handleClearDataButtonClick(event)
            break
        default:
    }
})

document.addEventListener('submit', handleSubmitEvent) 

setupUI()

