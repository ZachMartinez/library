const myLibrary = {}

// Helper functions
function generateId(length=8) {
   return Math.floor(Math.random() * (10 ** length)) 
}

// Model functions
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
    localStorage["myLibrary"] = "{}"
}

// View functions
function setupUI() {
    let table = document.querySelector('table#books')
    let keys = Object.keys(myLibrary)
    keys.forEach(key => {
        let book = myLibrary[key]
        let row = table.insertRow()
        row.insertCell(-1).textContent = book.title
        row.insertCell(-1).textContent = book.author
        row.insertCell(-1).textContent = book.pages
        row.insertCell(-1).textContent = book.read
    })
}